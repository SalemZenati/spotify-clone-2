"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import useAuthModal from "@/hooks/useAuthModal";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {FaUserAlt } from "react-icons/fa"
import { toast } from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  children, className 
}) => {
  const authModal = useAuthModal(); 
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //reset any playing songs
    router.refresh();

    if(error) {
      toast.error("Error logging out");
    } else {
      toast.success("Logged out successfully");
    }
  };

  return (
    <div
      className={twMerge(
        `
          h-fit
          bg-gradient-to-b
          from-blue-800
          p-6
        `,
        className
      )}
    >
      <div
        className="
          w-full
          mb-4
          flex
          items-center
        "
      >
        <div
          className="
            hidden
            md:flex
            gap-x-2
            items-center
          "
        >
          <button
            className="
              rounded-full
              bg-black
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            "
            onClick={() => router.back()}
          >
            <RxCaretLeft className="text-white" size={33} />
          </button>
          <button
            onClick={() => router.forward()}
            className="
              rounded-full
              bg-black
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <RxCaretRight className="text-white" size={33} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            className="
              rounded-full
              p-2
              bg-white
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            className="
              rounded-full
              p-2
              bg-white
              flex
              items-center
              justify-center
              hover:opacity-75
              transition
            "
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex-grow"></div>
        <div
          className="
            flex
            justify-between
            items-center
            gap-x-4
          "
        >
        {user ? (
          <div className ="flex gap-x-4 items-center">
            <Button
              onClick = {handleLogout}
              className = "bg-white px-6 py-2"
            >Logout
            </Button>
            <Button
              onClick={() => router.push('/account')}
              className="bg-white"
            >
                <FaUserAlt/>
            </Button>
          </div>
        ) : (
          <>
          <div>
            <Button
              onClick={authModal.onOpen}
              className="
                bg-transparent
                text-neutral-300
                font-medium
              "
            >
              Sign up
            </Button>
          </div>
          <div>
            <Button
              onClick={authModal.onOpen}
              className="
                bg-white
                px-6
                py-2
              "
            >
              Log in
            </Button>
          </div>
          </>
        )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
