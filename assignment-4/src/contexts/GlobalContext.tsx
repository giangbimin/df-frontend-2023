import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';

export const AppContext = createContext({
  theme: 'light',
  toggleTheme: async (): Promise<void> => {
    return Promise.resolve();
  },
});

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = window.localStorage.getItem('theme');
      if (storedValue) setTheme(storedValue);
    }
  }, []);

  const toggleTheme = useCallback(async () => {
    console.log('toggleTheme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (typeof window !== 'undefined')
      window.localStorage.setItem('theme', newTheme);
  }, [theme]);

  const contextValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
