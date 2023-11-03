'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  Profile,
  FetchResponse,
  SignInPayload,
  SignInResponseData,
  SignUpPayload,
  defaultFetchResponse,
} from '../_types';
import { fetchWrapper } from '../_services/common/fetchWrapper';
import LocalStorageManager from '../_services/LocalStorageManager';

type SessionContextProps = {
  currentUser: Profile | undefined;
  isLogin: boolean;
  signIn: (signInPayload: SignInPayload) => Promise<FetchResponse>;
  signUp: (signUpPayload: SignUpPayload) => Promise<FetchResponse>;
  signOut: () => void;
};

const SessionContext = createContext<SessionContextProps>({
  currentUser: undefined,
  isLogin: false,
  signIn: async () => defaultFetchResponse,
  signUp: async () => defaultFetchResponse,
  signOut: () => {},
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const routes = useRouter();
  const localStorageManager = LocalStorageManager();
  const { checkLogin, saveToken, cleanSession, getUser, saveUser } =
    localStorageManager;
  const [isLogin, setIsLogin] = useState<boolean>(checkLogin());
  const [currentUser, setCurrentUser] = useState<Profile | undefined>(
    undefined,
  );

  const signUp = async (
    signUpPayload: SignUpPayload,
  ): Promise<FetchResponse> => {
    const response = await fetchWrapper('/auth/signup', 'POST', signUpPayload);
    return response;
  };

  const signIn = async (signInPayload: SignInPayload) => {
    const response = await fetchWrapper('/auth/login', 'POST', signInPayload);
    if (response.success) {
      const signInResponse = response.data as SignInResponseData;
      saveToken(signInResponse.accessToken);
      setIsLogin(true);
    } else {
      cleanSession();
      setIsLogin(false);
    }
    return response;
  };

  const signOut = () => {
    cleanSession();
    setIsLogin(false);
    setCurrentUser(undefined);
  };

  const findUser = async () => {
    const userRaw = getUser();
    if (userRaw) {
      const user = JSON.parse(userRaw) as Profile;
      setCurrentUser(user);
      return;
    }
    try {
      const response = await fetchWrapper('/me', 'GET');
      if (response.status) {
        const user = response.data as Profile;
        setCurrentUser(user);
        saveUser(JSON.stringify(user));
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
  }, [routes]);

  useEffect(() => {
    if (isLogin) findUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  const useSessionContext = useMemo<SessionContextProps>(
    () => ({
      currentUser,
      isLogin,
      signIn,
      signOut,
      signUp,
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
