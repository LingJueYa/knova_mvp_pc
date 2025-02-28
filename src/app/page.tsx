"use client";

import { useUser } from "@clerk/nextjs";
import { AIInputWithSearch } from "@/components/AiChat";
import Social from "@/components/Social";
import HomeLink from "@/components/HomeLink";
import GuessAsking from "@/components/GuessAsking";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from 'valtio'
import { chatState, chatActions } from '@/store/chat'
import ChatMessages from "@/components/ChatMessages";
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const snap = useSnapshot(chatState)
  const pathname = usePathname()
  
  useEffect(() => {
    // 只在非首页路径下更新 URL
    if (pathname !== '/' && snap.conversationId) {
      window.history.replaceState(null, '', `/${snap.conversationId}`)
    }
  }, [pathname, snap.conversationId])

  useEffect(() => {
    // 只在非首页路径下加载本地存储的对话
    if (pathname !== '/' && !snap.isInteraction) {
      chatActions.loadFromLocalStorage()
    }
    
    // 组件卸载时保存状态
    return () => {
      chatActions.saveToLocalStorage()
    }
  }, [snap.isInteraction, pathname])

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return (
      <main className="flex min-h-[100svh] items-center justify-center p-4" role="main">
        <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-gray-600/90 animate-fade-in">
          请先登录
        </div>
      </main>
    );
  }

  return (
    <main 
      className="flex min-h-[100svh] overflow-hidden relative"
      role="main"
      aria-label="主页面内容区域"
    >
      {/* 背景动画 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fff2dd_0%,_transparent_70%)] opacity-60 animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffefef_0%,_transparent_60%)] opacity-50 animate-pulse-slower" />
      </motion.div>

      <div className="flex flex-col justify-center items-center w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 relative">
        <AnimatePresence>
          {!snap.isInteraction && (
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-gray-800 tracking-tight"
            >
              How can I help you?
            </motion.h1>
          )}
        </AnimatePresence>

        <motion.div 
          className="w-full max-w-2xl px-4"
          animate={{
            position: snap.isInteraction ? 'fixed' : 'relative',
            bottom: snap.isInteraction ? '0' : 'auto',
            left: snap.isInteraction ? '0' : 'auto',
            right: snap.isInteraction ? '0' : 'auto',
            maxWidth: snap.isInteraction ? '100%' : '2xl',
            zIndex: snap.isInteraction ? 50 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <AIInputWithSearch 
            onSubmit={(value, withSearch) => {
              console.log('Message:', value);
              console.log('Search enabled:', withSearch);
            }}
          />
        </motion.div>

        <AnimatePresence>
          {!snap.isInteraction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <GuessAsking />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {snap.isInteraction && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 w-full overflow-y-auto"
            >
              <ChatMessages />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!snap.isInteraction && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-4 left-0 right-0 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 md:px-8 z-10 gap-4 sm:gap-0"
          >
            <Social />
            <HomeLink />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
