import React from 'react';
import ThemeSwitch from './ThemeSwitch';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav>
      <div className="logo">
        <h1 className="header-text">Book Store</h1>
      </div>
      <a
        href="https://github.com/giangbimin"
        target="_blank"
        className="user"
        rel="noreferrer"
      >
        <picture>
          <img
            className="avatar"
            src="https://avatars.githubusercontent.com/u/18586131?v=4"
            alt="bimin199z"
          />
        </picture>
        <div>
          <span className="name">bimin199z</span>
          <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
        </div>
      </a>
    </nav>
  );
};

export default Navbar;