import { useRouter } from 'next/navigation';

export const BtnBack = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        router.back();
      }}
      className="inline-block font-medium text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-primary mb-6"
    >
      &#60;&#32;Back to previous page
    </button>
  );
};
