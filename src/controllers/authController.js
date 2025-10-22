const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const generateToken = (userId) => {

    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

};

const register = async (req, res) => {
    try {
        const { username, fullName, email, password, role, phone } = req.body;
    
    const existingUser = await User.findOne({$or: [{username},{email}] 
    });

    if (existingUser) {
        return res.status(400).json({ 
            success: false,
            message: 'Username or email already exists' 
        });
    }

    const newUser = await User.create({
        username,
        fullName,
        email,
        phone,
        password,
        role
    });
    const token = generateToken(newUser._id);

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        token,
        user: {
            id: newUser._id,
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
        message:  error.message
    });
    

    
    }
};

const login = async (req, res) => {
    try {
        const { username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter both username and password'
            });
        }

        const user = await User.findOne(
            { $or: [{ username}, {email: username}] }
            .select('+password')

        );

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'User not found.'
            });
        }

        if (!user.isActive ) {
            return res.status(401).json({
                success: false,
                message: 'Account is deactivated. Please contact the owner.'
            });
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Password'
            });
        }
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
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
            message: error.message
        });
    }
}
