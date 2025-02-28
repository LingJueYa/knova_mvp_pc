"use client";

/**
 * 导航栏组件
 *
 * 1. 网站 Logo
 * 2. 用户登录状态管理
 */

import React, { memo } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { CustomSignInButton } from "../SignInButton";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import { ScanSearch } from "lucide-react";

/**
 * Logo 组件
 */
const Logo = memo(() => (
  <Link href="/" className="flex items-center gap-2">
    <div className="flex items-center cursor-default text-black leading-none">
      <div className="flex items-center gap-2 font-playwrite text-base font-semibold">
      <ScanSearch />
        Knova
      </div>
    </div>
  </Link>
));
Logo.displayName = "Logo";

/**
 * 用户认证按钮组件
 */
const AuthButton = memo(({ isSignedIn }: { isSignedIn: boolean }) =>
  isSignedIn ? (
    <div className="flex justify-center items-center outline-none hover:ring-2 hover:ring-offset-2 hover:ring-[#FE7600] rounded-full transition-all ease-in-out duration-300 transform-gpu hover:ring-offset-white border-transparent">
      <UserButton
        userProfileMode="modal"
         appearance={{
           elements: {
             avatarBox: "w-8 h-8",
             badge: "hidden",
           },
         }}
      />
    </div>
  ) : (
    <CustomSignInButton />
  )
);
AuthButton.displayName = "AuthButton";

/**
 * 导航栏主组件
 */
const Navbar = () => {
  const { isSignedIn = false } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky inset-x-0 top-0 z-[100] h-fit bg-transparent backdrop-blur-xl"
    >
      <nav className="h-14 max-w-screen-2xl mx-auto px-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Logo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <AuthButton isSignedIn={isSignedIn ?? false} />
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default memo(Navbar);
