'use client';

import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LoginResponseType,
  LogoutResponseType,
  RegisterResponseType,
  RegisterUserType,
  UserType,
} from '../_types';
import UserManagerService from '../_services/UserManagerService';

type SessionContextProps = {
  currentUser: UserType | undefined;
  signUp: (user: RegisterUserType) => Promise<RegisterResponseType | undefined>;
  signIn: (user: UserType) => Promise<LoginResponseType | undefined>;
  signOut: () => Promise<LogoutResponseType | undefined>;
  authenticateUser: () => boolean;
};

const SessionContext = createContext<SessionContextProps>({
  currentUser: undefined,
  signUp: async () => undefined,
  signIn: async () => undefined,
  signOut: async () => undefined,
  authenticateUser: () => true,
});

export const SessionProvider = ({ children }) => {
  const routers = useRouter();

  const [currentUser, setCurrentUser] = useState<UserType | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const session = await UserManagerService.currentUser();
      setCurrentUser(session);
    };

    fetchCurrentUser();
  }, []);

  const signUp = async (user: RegisterUserType) => {
    const response = await UserManagerService.signUp(user);
    return response;
  };

  const signIn = async (user: UserType) => {
    const response = await UserManagerService.signIn(user);
    setCurrentUser(response.data);
    return response;
  };

  const signOut = async () => {
    const response = await UserManagerService.signOut();
    if (response.status) {
      setCurrentUser(undefined);
    }
    return response;
  };

  const authenticateUser = () => {
    const isLogin = currentUser !== undefined;
    if (!isLogin) routers.push('/login');
    return isLogin;
  };

  const useSessionContext = useMemo<SessionContextProps>(
    () => ({
      currentUser,
      signUp,
      signIn,
      signOut,
      authenticateUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser],
  );

  return (
    <SessionContext.Provider value={useSessionContext}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
