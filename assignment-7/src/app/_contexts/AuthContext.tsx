'use client';

import { ReactNode, createContext, useContext, useMemo } from 'react';
import { mutate } from 'swr';
import { fetchWrapper } from '../_services/common/fetchWrapper';
import { setCookie } from '../_services/utils/cookieUtils';
import {
  SignInPayload,
  SignInResponseData,
  SignUpPayload,
  FetchResponse,
  defaultFetchResponse,
} from '../_types';

type AuthContextProps = {
  signUp: (user: SignUpPayload) => Promise<FetchResponse>;
  signIn: (user: SignInPayload) => Promise<FetchResponse>;
};

const AuthContext = createContext<AuthContextProps>({
  signUp: async () => defaultFetchResponse,
  signIn: async () => defaultFetchResponse,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const signUp = async (
    signUpPayload: SignUpPayload,
  ): Promise<FetchResponse> => {
    const response = await fetchWrapper(
      'https://develop-api.bookstore.dwarvesf.com/api/v1/auth/signup',
      'POST',
      signUpPayload,
    );
    return response;
  };

  const signIn = async (
    signInPayload: SignInPayload,
  ): Promise<FetchResponse> => {
    const response = await fetchWrapper(
      'https://develop-api.bookstore.dwarvesf.com/api/v1/auth/login',
      'POST',
      signInPayload,
    );
    if (response.success) {
      const signInResponse = response.data as SignInResponseData;
      setCookie('bearerToken', signInResponse.accessToken || '', 7);
      mutate('https://develop-api.bookstore.dwarvesf.com/api/v1/me');
    }
    return response;
  };
  const useAuthContext = useMemo<AuthContextProps>(
    () => ({
      signUp,
      signIn,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <AuthContext.Provider value={useAuthContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
