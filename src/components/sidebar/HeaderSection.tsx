"use client"

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

interface HeaderSectionProps {
  isSignedIn: boolean;
  playSound: (url: string) => void;
}

// 动态导入AuthButtons组件，带有SSR禁用，避免初始渲染时的ClerkProvider错误
const AuthButtons = dynamic(() => import("./AuthButtons"), { 
  ssr: false,
  loading: () => <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
});

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
          className="cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 rounded-xl"
        >
          <div className="text-left">
            <span className="text-xl font-medium tracking-widest text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors font-playwrite">
              Knova
            </span>
          </div>
        </Link>
        
        {/* 右侧登录按钮 / 用户头像 */}
        <AuthButtons isSignedIn={isSignedIn} playSound={playSound} />
      </div>
    </motion.div>
  );
};

export default HeaderSection; 