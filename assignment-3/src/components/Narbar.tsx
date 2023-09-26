import { FC } from 'react';
import ThemeSwitch from './ThemeSwitch';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

const Navbar: FC<NavbarProps> = ({ theme, toggleTheme }) => {
  return (
    <nav>
      <div className="logo">
        <h1 className="header-text">Book Store</h1>
      </div>
      <div className="user">
        <a
          href="https://github.com/giangbimin"
          target="_blank"
          rel="noreferrer"
        >
          <picture>
            <img
              className="avatar"
              src="https://avatars.githubusercontent.com/u/18586131?v=4"
              alt="bimin199z"
            />
          </picture>
        </a>
        <div>
          <span className="name">bimin199z</span>
          <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
