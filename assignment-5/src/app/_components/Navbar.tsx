'use client';

import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';
import { CurrentUser } from './CurrentUser';

const Navbar = () => {
  return (
    <header className="antialiased">
      <nav className="bg-white border-gray-200 px-4 lg:px-12 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <Link href="/" className="flex mr-4">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                BookStore
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <CurrentUser />
            <ThemeSwitch />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
