import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CustomSignInButton, CustomUserButton } from "@/components/SignInButton";

interface HeaderSectionProps {
  isSignedIn: boolean;
  playSound: (url: string) => void;
}

const HeaderSection = ({ isSignedIn, playSound }: HeaderSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="px-5 pt-6 pb-2"
    >
      <div className="flex items-center justify-between w-full">
        {/* 左侧Logo */}
        <Link 
          href="/" 
          onClick={() => playSound("/music/nav-click.mp3")} 
          className="cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl"
        >
          <div className="text-left">
            <span className="text-xl font-medium tracking-widest text-gray-800 group-hover:text-gray-900 transition-colors font-playwrite">
              Knova
            </span>
          </div>
        </Link>
        
        {/* 右侧登录按钮 / 用户头像 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {isSignedIn ? <CustomUserButton /> : <CustomSignInButton />}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeaderSection; 