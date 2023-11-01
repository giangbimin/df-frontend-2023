'use client';

import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSessionContext } from 'app/_contexts/SessionContext';
import { ErrorMessage } from '../../_components/common/ErrorMessage';
import { SignUpSchemaType, SignUpSchema } from '../../_types';

export default function RegisterPage() {
  const routes = useRouter();
  const { signUp } = useSessionContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data, e) => {
    if (e) e.preventDefault();
    try {
      const response = await signUp({
        avatar: data.avatar,
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });
      if (response) {
        toast(response.message);
        routes.push('/login');
      } else {
        toast('signUp false');
      }
    } catch (error) {
      toast('signUp false');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center px-6 mx-auto md:h-screen">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          BookStore
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up to your account
            </h1>
            <form
              className="space-y-6"
              onSubmit={(e) => handleSubmit(onSubmit)(e)}
            >
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </p>
                <ErrorMessage error={errors.email} />
                <input
                  {...register('email')}
                  autoComplete="username"
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  readOnly={isSubmitting}
                  required
                />
              </label>
              <label
                htmlFor="avatar url"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your avatar url
                </p>
                <ErrorMessage error={errors.avatar} />
                <input
                  {...register('avatar')}
                  type="text"
                  name="avatar"
                  id="avatar"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  readOnly={isSubmitting}
                />
              </label>
              <label
                htmlFor="full name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your full name
                </p>
                <ErrorMessage error={errors.fullName} />
                <input
                  {...register('fullName')}
                  autoComplete="username"
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  readOnly={isSubmitting}
                  required
                />
              </label>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </p>
                <ErrorMessage error={errors.password} />
                <input
                  {...register('password')}
                  autoComplete="current-password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  readOnly={isSubmitting}
                  required
                />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 my-7 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isSubmitting ? 'Submitting' : 'Sign up'}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have account
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
