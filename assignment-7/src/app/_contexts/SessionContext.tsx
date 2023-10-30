'use client';

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { Profile } from '../_types/api/user.d';
import { clearCookie } from '../_services/utils/cookieUtils';

type SessionContextProps = {
  currentUser: Profile | undefined;
  setCurrentUser: Dispatch<React.SetStateAction<Profile | undefined>>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextProps>({
  currentUser: undefined,
  setCurrentUser: () => {},
  signOut: async () => {},
});

export const SessionProvider = ({
  children,
  initialCurrentUser,
}: {
  children: ReactNode;
  initialCurrentUser?: Profile | undefined;
}) => {
  const routes = useRouter();
  const [currentUser, setCurrentUser] = useState<Profile | undefined>(
    initialCurrentUser,
  );

  const signOut = async () => {
    clearCookie('bearerToken');
    setCurrentUser(undefined);
    routes.push('/login');
  };

  const useSessionContext = useMemo<SessionContextProps>(
    () => ({
      currentUser,
      setCurrentUser,
      signOut,
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
