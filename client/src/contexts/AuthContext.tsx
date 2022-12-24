import axios, { AxiosError } from 'axios';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { RegisterUserType } from '../types/AuthType';

// auth context provider types
type AuthProviderType = {
  children: ReactNode;
};

// auth context type
type AuthContextType = {
  loading: boolean;
  error: AxiosError | null;
  registerUser: (userData: RegisterUserType) => void;
};

const AuthContext = createContext({} as AuthContextType);

// useContext using by AuthContext
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }: AuthProviderType) {
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(null);
  const [error, setError] = useState<AxiosError | null>(null);

  async function getUser(id: string) {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/users/${id}`
      );

      console.log(data);

      // if(data.status.code === 200) {
      //   setIsAuth({
      //       _id: data.data.user._id,
      //       username: data.data.user.username
      //   })
      // }
    } catch {
      setIsAuth(null);
    }
  }

  useEffect(() => {
    const localToken = localStorage.getItem(
      `${process.env.REACT_APP_APPLICATION_NAME}-auth`
    );

    if (localToken) {
      const token = JSON.parse(localToken);

      // const decoded = verifyToken(token.token);

      // console.log(token);

      //   const user =

      //   if (decoded) {
      //     console.log('d');
      //   }
    }
  }, []);

  async function registerUser(userData: RegisterUserType) {
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
          token: data.data.token,
        })
      );

      setError(null);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.errors || err.message);
      setLoading(false);
    }
  }

  const value = { loading, error, registerUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
