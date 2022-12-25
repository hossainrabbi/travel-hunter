import { ReactNode } from 'react';

// user types
export type UserType = {
  username: string;
  mobile?: string;
  password: string;
};

// auth context provider types
export type AuthProviderType = {
  children: ReactNode;
};

// auth user type
export type AuthUserType = {
  _id: string;
  username: string;
  mobile: string;
  avatar: string;
  role: string;
};

// auth user error type
export type AuthUserErrorType = {
  username?: { msg: string };
  mobile?: { msg: string };
  password?: { msg: string };
  message?: string;
};

// auth context type
export type AuthContextType = {
  loading: boolean;
  error: AuthUserErrorType | null;
  isAuth: AuthUserType | null;
  registerUser: (userData: UserType) => void;
  loginUser: (userData: UserType) => void;
  logout: () => void;
};
