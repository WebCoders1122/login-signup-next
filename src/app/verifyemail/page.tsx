"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  //next router
  const router = useRouter();
  // const searchParams = useSearchParams();
  useEffect(() => {
    //1st approach to get search params ==> this is better in next js
    // const token = searchParams.get("token") || "";
    //2nd approach to get searh param
    const token = window.location.search.split("=")[1];
    setToken(token);
  }, []);

  //handle verify
  const handleVerify = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", {
        token: token,
      });
      toast.success(response.data.message);
      setTimeout(() => {
        router.push(`/login`);
      }, 1000);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  console.log(new Date(Date.now() + 7200000));
  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full'>
      <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
        Welcome to <span className='text-blue-400'>Next Auth</span> Website!
      </h2>
      <div className='flex items-center justify-center text-sm text-center mt-5 max-w-sm w-full'>
        <button
          onClick={handleVerify}
          className='block text-white text-lg bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-[90%]'>
          Click To Verify Email Address
        </button>
      </div>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
    </div>
  );
};
export default VerifyEmail;
