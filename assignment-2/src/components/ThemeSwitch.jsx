import React from "react";

const ThemeSwitch = ({ theme, toggleTheme }) => {


  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === "dark"} // Use 'checked' to determine the checkbox state
          onChange={toggleTheme} // Call handleToggleTheme on change
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ThemeSwitch;
