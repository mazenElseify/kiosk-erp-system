import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  fullName: string;
  email: string;
  password: string;
  role: 'owner' | 'manager' | 'cashier';
  phone: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserInput {
  username: string;
  fullName: string;
  email: string;
  password: string;
  role?: 'owner' | 'manager' | 'cashier';
  phone: string;
}

export interface IUserResponse {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  phone: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: IUserResponse;
}
export interface IUserForgetPassword {
  email: string;
}
export interface IUserResetPassword {
  password: string;
  confirmPassword: string;
}