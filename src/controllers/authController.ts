import { Request, Response } from 'express';
import User from '../models/Users';
import jwt, { SignOptions } from 'jsonwebtoken';
import { IUserInput, IAuthResponse, ILoginRequest } from '../types/user.types';
import { Types } from 'mongoose';

const generateToken = (userId: string): string => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    
    return jwt.sign({ userId }, secret, {
        expiresIn: expiresIn || '7d'
    } as jwt.SignOptions);
};

export const register = async (req: Request<{}, IAuthResponse, IUserInput>, res: Response<IAuthResponse>): Promise<void> => {
    try {
        const { username, fullName, email, password, role, phone } = req.body;
    
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            res.status(400).json({ 
                success: false,
                message: 'Username or email already exists' 
            });
            return;
        }

        const newUser = await User.create({
            username,
            fullName,
            email,
            phone,
            password,
            role
        });
        
        const token = generateToken((newUser._id as Types.ObjectId).toString());

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            token,
            user: {
                id: (newUser._id as Types.ObjectId).toString(),
                username: newUser.username,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role,
                phone: newUser.phone
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'An error occurred'
        });
    }
};

export const login = async (req: Request<{}, IAuthResponse, ILoginRequest>, res: Response<IAuthResponse>): Promise<void> => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({
                success: false,
                message: 'Please enter both username and password'
            });
            return;
        }

        const user = await User.findOne(
            { $or: [{ username }, { email: username }] }
        ).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            res.status(401).json({
                success: false,
                message: 'User not found.'
            });
            return;
        }

        if (!user.isActive) {
            res.status(401).json({
                success: false,
                message: 'Account is deactivated. Please contact the owner.'
            });
            return;
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            res.status(401).json({
                success: false,
                message: 'Invalid Password'
            });
            return;
        }

        const token = generateToken((user._id as Types.ObjectId).toString());

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: (user._id as Types.ObjectId).toString(),
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        }); 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'An error occurred'
        });
    }
};