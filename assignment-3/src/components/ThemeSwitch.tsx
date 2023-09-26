import { FC } from 'react';

interface ThemeSwitchProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ theme, toggleTheme }) => {
  return (
    <div>
      <label htmlFor="theme-switch" className="switch">
        <input
          name="theme-switch"
          id="theme-switch"
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <span className="slider" />
      </label>
    </div>
  );
};

export default ThemeSwitch;
