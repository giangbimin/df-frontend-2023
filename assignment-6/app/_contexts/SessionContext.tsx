'use client';

import { Dispatch, createContext, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  SignInPayload,
  SignInResponse,
  SignUpPayload,
} from '../_types/api/auth.d';
import { fetchWrapper } from '../_services/common/fetchWrapper';
import { Profile } from '../_types/api/user.d';
import { clearCookie, setCookie } from '../_services/utils/cookieUtils';
import { FetchResponse } from '../_types/api/request.d';

type SessionContextProps = {
  currentUser: Profile | undefined;
  setCurrentUser: Dispatch<React.SetStateAction<Profile | undefined>>;
  signUp: (user: SignUpPayload) => Promise<FetchResponse | undefined>;
  signIn: (user: SignInPayload) => Promise<FetchResponse | undefined>;
  signOut: () => Promise<void>;
  authenticateUser: () => boolean;
};

const SessionContext = createContext<SessionContextProps>({
  currentUser: undefined,
  setCurrentUser: () => {},
  signUp: async () => undefined,
  signIn: async () => undefined,
  signOut: async () => {},
  authenticateUser: () => true,
});

export const SessionProvider = ({ children }) => {
  const routers = useRouter();

  const [currentUser, setCurrentUser] = useState<Profile | undefined>(
    undefined,
  );

  const signUp = async (
    signUpPayload: SignUpPayload,
  ): Promise<FetchResponse> => {
    try {
      const response = await fetchWrapper(
        'https://develop-api.bookstore.dwarvesf.com/api/v1/auth/signup',
        'POST',
        signUpPayload,
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  const signIn = async (
    signInPayload: SignInPayload,
  ): Promise<FetchResponse> => {
    try {
      const response = await fetchWrapper(
        'https://develop-api.bookstore.dwarvesf.com/api/v1/auth/login',
        'POST',
        signInPayload,
      );
      if (response.success) {
        const signInResponse = response as SignInResponse;
        setCookie('bearerToken', signInResponse.data.accessToken || '', 7);
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  const signOut = async () => {
    clearCookie('bearerToken');
    setCurrentUser(undefined);
  };

  const authenticateUser = () => {
    const isLogin = currentUser !== undefined;
    if (!isLogin) routers.push('/login');
    return isLogin;
  };

  const useSessionContext = useMemo<SessionContextProps>(
    () => ({
      currentUser,
      setCurrentUser,
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
