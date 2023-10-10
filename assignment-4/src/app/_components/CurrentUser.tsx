import Image from 'next/image';

export const CurrentUser = () => {
  return (
    <>
      <Image
        className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        width={20}
        height={20}
        src="/avatar.jpeg"
        alt="Avatar"
      />
      <p className="self-center text-sm whitespace-nowrap dark:text-white">
        Giangbimin
      </p>
    </>
  );
};
