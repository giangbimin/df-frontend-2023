'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  Dispatch,
  ReactNode,
} from 'react';

type ApplicationContextProps = {
  theme: string;
  toggleTheme: () => void;
  loading: boolean;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
};

const ApplicationContext = createContext<ApplicationContextProps>({
  theme: 'light',
  toggleTheme: () => {},
  loading: false,
  setLoading: () => {},
});

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>('light');
  const [loading, setLoading] = useState<boolean>(false);

  const getThemeFromStorage = async () => {
    if (typeof window === 'undefined') return '';
    const theme = localStorage.getItem('theme');
    return theme === 'light' ? 'light' : 'dark';
  };

  const saveThemeToStorage = async () => {
    if (typeof window === 'undefined') return;
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

  const renderTheme = () => {
    const removeClass = theme === 'dark' ? 'light' : 'dark';
    document.body.classList.remove(removeClass);
    document.body.classList.add(theme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const useApplicationContext = useMemo<ApplicationContextProps>(
    () => ({
      theme,
      toggleTheme,
      loading,
      setLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, loading],
  );

  return (
    <ApplicationContext.Provider value={useApplicationContext}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => useContext(ApplicationContext);
