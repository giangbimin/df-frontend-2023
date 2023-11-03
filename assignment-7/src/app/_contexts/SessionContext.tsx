'use client';

import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';

import LocalStorageManager from 'api/mutator/LocalStorageManager';
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
  const localStorageManager = LocalStorageManager();
  const { checkLogin, saveToken, cleanSession, getUser, saveUser } =
    localStorageManager;
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
    const userRaw = getUser();
    if (userRaw) {
      const user = JSON.parse(userRaw) as Me;
      setCurrentUser(user);
      return;
    }
    try {
      const { data } = await getMe();
      if (data) {
        setCurrentUser(data);
        saveUser(JSON.stringify(data));
      }
    } catch {
      setIsLogin(false);
      setCurrentUser(undefined);
      cleanSession();
    }
  };

  useEffect(() => {
    setIsLogin(checkLogin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    if (isLogin) findUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
