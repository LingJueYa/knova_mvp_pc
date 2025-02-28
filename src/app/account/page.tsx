"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CustomSignInButton } from "@/components/SignInButton";
import { SignOutButton } from "@clerk/nextjs";
import { BotCard } from "@/components/bot/BotCard";
import { CreateBotButton } from "@/components/bot/CreateBotButton";
import { Bot } from "@/types/bot";
import { createBot, deleteBot, listBots } from "@/actions/bot";
import { getCurrentUserEmail } from "@/actions/user";
import { CreateBotDrawer } from "@/components/bot/CreateBotDrawer";
import { CreateBotFormData } from "@/schemas/bot";

export default function AccountPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [bots, setBots] = useState<Bot[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
  
    const fetchBots = async () => {
      try {
        setIsLoading(true);
        const newBots = await listBots();
        console.log('[Account] 获取到的机器人列表:', newBots);
        setBots(newBots);
      } catch (error) {
        console.error('[Account] 获取助手列表失败:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchBots();
  }, [isLoaded, isSignedIn]);
  
  // 创建助手的处理函数
  const handleCreateBot = async (data: CreateBotFormData) => {
    try {
      const email = await getCurrentUserEmail();
      const botData = {
        ...data,
        email
      };
  
      const newBot = await createBot(botData);
      console.log('[Account] 创建的新助手:', newBot);
      
      // 确保 newBot 有效再更新状态
      if (newBot && newBot.id) {
        setBots(prev => [...prev, newBot]);
        setIsModalOpen(false);
      } else {
        console.error('[Account] 创建助手返回的数据无效:', newBot);
        throw new Error('创建助手失败：返回数据无效');
      }
    } catch (error) {
      console.error('[Account] 创建助手失败:', error);
    }
  };
  
  // 删除助手的处理函数
  const handleDeleteBot = async (botId: string) => {
    try {
      await deleteBot(botId);
      setBots(prev => prev.filter(bot => bot.id !== botId));
    } catch (error) {
      console.error('删除助手失败:', error);
    }
  };

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-7rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CustomSignInButton />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 用户信息区域 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8">
          个人信息
        </h1>

        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-8">
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={user?.imageUrl}
              alt={user?.fullName || "用户头像"}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-[20px] object-cover 
                       border-2 border-primary/10"
            />
            <div>
              <h2 className="text-2xl sm:text-3xl font-medium mb-3">
                {user?.fullName || user?.username || "未设置昵称"}
              </h2>
              <p className="text-gray-600 text-lg">
                {user?.primaryEmailAddress?.emailAddress || "未设置邮箱"}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Bot 列表区域 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8">
          我的助手
        </h2>

        {isLoading ? (
          <div className="text-center py-8">加载中...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(bots) && bots.map((bot) => (
              bot && bot.id ? (
                <BotCard 
                  key={bot.id} 
                  bot={bot} 
                  onDelete={handleDeleteBot}
                  updateBotState={setBots}
                />
              ) : null
            ))}
            <CreateBotButton
              onClick={() => setIsModalOpen(true)}
              isFirst={!bots || bots.length === 0}
            />
          </div>
        )}
      </motion.section>

      {/* 退出登录按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex justify-center"
      >
        <SignOutButton>
          <button
            className="px-10 py-4 rounded-full text-gray-600 border-2 border-gray-200
                     hover:border-primary/30 hover:text-primary
                     transition-colors duration-300 text-lg font-medium"
          >
            退出登录
          </button>
        </SignOutButton>
      </motion.div>

      {/* 创建助手抽屉 */}
      <CreateBotDrawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBot}
      />
    </div>
  );
}
