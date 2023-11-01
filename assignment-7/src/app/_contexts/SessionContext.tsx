'use client';

import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';

import {
  checkLogin,
  cleanSession,
  getUser,
  saveToken,
  saveUser,
} from 'app/_services/LocalStorageManager';
import { useParams } from 'next/navigation';
import {
  Auth,
  Me,
  Message,
  SignupRequest,
  getMe,
  login,
  signup,
} from '../../api';

interface SessionContextValues {
  isLogin: boolean;
  signIn: (email: string, password: string) => Promise<Auth | undefined>;
  signOut: () => void;
  currentUser: Me | undefined;
  signUp: (signUpPayload: SignupRequest) => Promise<Message | undefined>;
}

const SessionContext = createContext<SessionContextValues>({
  isLogin: false,
  signIn: async () => undefined,
  signOut: () => {},
  signUp: async () => undefined,
  currentUser: undefined,
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const [isLogin, setIsLogin] = useState<boolean>(checkLogin());
  const [currentUser, setCurrentUser] = useState<Me | undefined>(undefined);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await login({ email, password });
      if (data) {
        saveToken(data.accessToken);
        setIsLogin(true);
      }
      return data;
    } catch (error) {
      throw new Error('Incorrect email or password');
    }
  };

  const signUp = async (signUpPayload: SignupRequest) => {
    try {
      const { data } = await signup(signUpPayload);
      return data;
    } catch (error) {
      throw new Error('invalid data');
    }
  };

  const signOut = () => {
    cleanSession();
    setIsLogin(false);
    setCurrentUser(undefined);
  };

  const findUser = async () => {
    console.log('findUser');
    const userRaw = getUser();
    if (userRaw) {
      const user = JSON.parse(userRaw) as Me;
      console.log('User from local storage:', user);
      setCurrentUser(user);
      return;
    }
    try {
      const { data } = await getMe();
      console.log('User from API:', data);
      if (data) {
        setCurrentUser(data);
        saveUser(data);
      }
    } catch {
      setIsLogin(false);
      setCurrentUser(undefined);
      cleanSession();
    }
  };

  useEffect(() => {
    setIsLogin(checkLogin());
  }, [params]);

  useEffect(() => {
    if (isLogin) findUser();
  }, [isLogin]);

  const useSessionContext = useMemo<SessionContextValues>(
    () => ({
      isLogin,
      signIn,
      signOut,
      signUp,
      currentUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLogin, currentUser],
  );

  return (
    <SessionContext.Provider value={useSessionContext}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
