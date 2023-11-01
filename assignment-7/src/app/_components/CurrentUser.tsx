/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useSessionContext } from '../_contexts/SessionContext';

export const CurrentUser = () => {
  const { currentUser, signOut } = useSessionContext();
  if (!currentUser) {
    return (
      <Link
        href="/login"
        className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      >
        Login
      </Link>
    );
  }
  return (
    <>
      <img
        className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        width={20}
        height={20}
        src={currentUser.avatar}
        alt="Avatar"
      />
      <p className="self-center text-sm whitespace-nowrap dark:text-white">
        {currentUser.fullName}
      </p>

      <button
        type="button"
        onClick={signOut}
        className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
      >
        Sign out
      </button>
    </>
  );
};
