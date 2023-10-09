'use client';

import { create } from 'zustand';
import { useRouter } from 'next/navigation';
import { RegisterUserType, UserType } from '../_types';
import { useToasterService } from './UseToasterService';
import UserManagerService from '../_services/UserManagerService';

interface SessionStore {
  currentUser: UserType | undefined;
}
const initialState = {
  currentUser: undefined,
};

const sessionStorage = create<SessionStore>(() => initialState);

interface AuthenticationService extends SessionStore {
  requireAuth: () => Promise<boolean>;
  register: (user: RegisterUserType) => Promise<void>;
  login: (user: UserType) => Promise<void>;
  logout: () => Promise<void>;
  getCurrent: () => Promise<void>;
}

export function useAuthenticationService(): AuthenticationService {
  const toasterService = useToasterService();
  const { currentUser } = sessionStorage();
  const router = useRouter();

  const getCurrent = async () => {
    const currentUser = await UserManagerService.currentUser();
    sessionStorage.setState({ currentUser });
  };

  return {
    currentUser,
    requireAuth: async () => {
      await getCurrent();
      if (!currentUser) {
        router.push('/login');
        toasterService.error('Please Login', true);
        return true;
      }
      return false;
    },
    register: async (user) => {
      try {
        const response = await UserManagerService.register(user);
        if (response.status) {
          toasterService.success(response.message, true);
          router.push('/login');
        } else {
          toasterService.error(response.message);
        }
      } catch (error) {
        toasterService.error(error);
      }
    },
    login: async (user) => {
      toasterService.clear();
      try {
        const response = await UserManagerService.login(user);
        if (response.status) {
          const currentUser = response.data;
          sessionStorage.setState({ ...initialState, currentUser });
          router.push('/');
          toasterService.success(response.message, true);
        } else {
          toasterService.error(response.message);
        }
      } catch (error) {
        toasterService.error(error);
      }
    },
    logout: async () => {
      toasterService.clear();
      try {
        const response = await UserManagerService.logout();
        if (response.status) {
          sessionStorage.setState({ currentUser: undefined });
          router.push('/login');
          toasterService.success(response.message, true);
        } else {
          toasterService.error(response.message);
        }
      } catch (error) {
        toasterService.error(error);
      }
    },
    getCurrent,
  };
}
