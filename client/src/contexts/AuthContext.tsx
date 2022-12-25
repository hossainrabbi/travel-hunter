import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  AuthContextType,
  AuthProviderType,
  AuthUserErrorType,
  AuthUserType,
  UserType,
} from '../types/AuthType';

const AuthContext = createContext({} as AuthContextType);

// useContext using by AuthContext
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }: AuthProviderType) {
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState<AuthUserType | null>(null);
  const [error, setError] = useState<AuthUserErrorType | null>(null);

  // set & get data form localStorage
  useEffect(() => {
    const localToken = localStorage.getItem(
      `${process.env.REACT_APP_APPLICATION_NAME}-auth`
    );

    // get User with user id & token
    async function getUser(id: string, token: string) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.status.code === 200) {
          setIsAuth({
            _id: data.data.user._id,
            username: data.data.user.username,
            mobile: data.data.user.mobile,
            avatar: data.data.user.avatar,
            role: data.data.user.role,
          });
        } else {
          logout();
        }
      } catch {
        logout();
      }
    }

    // if token found then parse token
    if (localToken) {
      const tokenData = JSON.parse(localToken);
      getUser(tokenData?.user?._id, tokenData?.token);
    }
  }, []);

  // register user using by user data
  async function registerUser(userData: UserType) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/register`,
        userData
      );

      //   set auth token in localStorage
      localStorage.setItem(
        `${process.env.REACT_APP_APPLICATION_NAME}-auth`,
        JSON.stringify({
          ...data.data,
        })
      );

      // set data in state
      setIsAuth({
        _id: data.data.user._id,
        username: data.data.user.username,
        mobile: data.data.user.mobile,
        avatar: data.data.user.avatar,
        role: data.data.user.role,
      });

      setError(null);
      setLoading(false);
    } catch (err: any) {
      setError({ ...err.response?.data?.errors } || { message: err.message });
      setLoading(false);
    }
  }

  // register user using by user data
  async function loginUser(userData: UserType) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`,
        userData
      );

      //   set auth token in localStorage
      localStorage.setItem(
        `${process.env.REACT_APP_APPLICATION_NAME}-auth`,
        JSON.stringify({
          ...data.data,
        })
      );

      // set data in state
      setIsAuth({
        _id: data.data.user._id,
        username: data.data.user.username,
        mobile: data.data.user.mobile,
        avatar: data.data.user.avatar,
        role: data.data.user.role,
      });

      setError(null);
      setLoading(false);
    } catch (err: any) {
      setError({ ...err.response?.data?.errors } || { message: err.message });
      setLoading(false);
    }
  }

  // logout user
  function logout() {
    // remove userData & token form localStorage
    localStorage.removeItem(`${process.env.REACT_APP_APPLICATION_NAME}-auth`);
    setIsAuth(null);
  }

  const value = { loading, error, isAuth, registerUser, loginUser, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
