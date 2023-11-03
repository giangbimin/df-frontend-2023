'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  Dispatch,
} from 'react';
import { ToasterType } from '../_types';

type ApplicationContextProps = {
  theme: string;
  toggleTheme: () => void;
  loading: boolean;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  toaster: ToasterType | undefined;
  toasterSuccess: (message: string) => void;
  toasterError: (message: string) => void;
  clearToaster: () => void;
};

const ApplicationContext = createContext<ApplicationContextProps>({
  theme: 'light',
  toggleTheme: () => {},
  loading: false,
  setLoading: () => {},
  toaster: undefined,
  toasterSuccess: () => {},
  toasterError: () => {},
  clearToaster: () => {},
});

export const ApplicationProvider = ({ children }) => {
  const [theme, setTheme] = useState<string>('light');
  const [loading, setLoading] = useState<boolean>(false);
  const [toaster, setToaster] = useState<ToasterType | undefined>(undefined);

  const getThemeFromStorage = async () => {
    if (typeof localStorage === 'undefined') return '';
    const theme = await localStorage.getItem('theme');
    return theme === 'light' ? 'light' : 'dark';
  };

  const saveThemeToStorage = async () => {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const getThemeFromQuery = async () => {
      const curTheme = await getThemeFromStorage();
      setTheme(curTheme);
    };

    getThemeFromQuery();
  }, []);

  useEffect(() => {
    const themeTrigger = async () => {
      renderTheme();
      await saveThemeToStorage();
    };

    themeTrigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    if (toaster !== undefined) {
      const timer = setTimeout(() => {
        clearToaster();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toaster]);

  const renderTheme = () => {
    const removeClass = theme === 'dark' ? 'light' : 'dark';
    document.body.classList.remove(removeClass);
    document.body.classList.add(theme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toasterSuccess = (message: string) => {
    const newToaster = { category: 'success', message };
    setToaster(newToaster);
  };

  const toasterError = (message: string) => {
    const newToaster = { category: 'error', message };
    setToaster(newToaster);
  };

  const clearToaster = () => {
    setToaster(undefined);
  };

  const useApplicationContext = useMemo<ApplicationContextProps>(
    () => ({
      theme,
      toggleTheme,
      clearToaster,
      loading,
      setLoading,
      toaster,
      toasterSuccess,
      toasterError,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, toaster, loading],
  );

  return (
    <ApplicationContext.Provider value={useApplicationContext}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => useContext(ApplicationContext);
