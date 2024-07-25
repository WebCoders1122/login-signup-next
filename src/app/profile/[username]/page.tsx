"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const initialState: Partial<UserType> & { _id: string } = {
  email: "",
  username: "",
  _id: "",
};
const ProfilePage = () => {
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  //show "signin success toast"
  useEffect(() => {
    toast.success("Login Success");
  }, []);
  //to show username
  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/users/profile");
      setUser(response.data.user);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  //handle logout
  const handleLogout = async () => {
    const response = await axios.post("/api/users/logout");
    router.push("/");
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full'>
      <h2 className='mt-10 scroll-m-20 border-b pb-2 text-2xl sm:text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
        Welcome <span className='text-blue-500 uppercase'>{user.username}</span>
        !
      </h2>
      <h4 className='scroll-m-20 text-center text-md text-gray-400 md:text-xl font-semibold tracking-tight mt-5'>
        Your email address is "<span className='text-white'>{user.email}</span>"
      </h4>
      <div className='flex items-center justify-center text-sm text-center mt-5 max-w-sm w-full'>
        <button
          onClick={handleLogout}
          className='block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-[90%]'>
          {" "}
          Logout
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
export default ProfilePage;
