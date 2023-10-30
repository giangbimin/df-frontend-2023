import Link from 'next/link';

export default function CustomNotFound() {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="text-center">
          <h1 className="font-bold text-[64px] text-gray-800 dark:text-white">
            404
          </h1>
          <p className="mb-6 text-gray-800 dark:text-white">Page Not Found</p>
          <Link
            href="/"
            className="inline-block font-medium text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-primary mb-6"
          >
            &#60;&#32;Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
