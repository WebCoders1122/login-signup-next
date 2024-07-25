import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center py-10 p-5 md:p-24'>
      <h1 className='scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight text-center lg:text-5xl'>
        Welcome to Next Auth Blog
      </h1>
      <p className='text-md md:text-xl text-center text-gray-800 dark:text-gray-400 mt-10'>
        Please Signup or Login to Continue.
      </p>
      <div className='flex items-center gap-5 mt-5'>
        <Link
          href='/signup'
          className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
          Signup
        </Link>
        <Link
          href='/login'
          className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
          Login
        </Link>
      </div>
    </main>
  );
}
