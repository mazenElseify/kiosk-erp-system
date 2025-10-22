import { Request, Response } from 'express';
import { IUser } from './user.types';

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface AuthResponse extends Response {}

export interface JWTPayload {
  userId: string;
  iat?: number;
  exp?: number;
}