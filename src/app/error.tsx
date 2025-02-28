// 错误边界

"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const getErrorContent = () => {
    if (error.message.includes("网络") || error.message.includes("信号")) {
      return {
        title: "🔌 AI 连接暂时中断",
        description: "看起来网络出现了一些波动。别担心，让我们稍作休息，很快就能重新建立连接。",
      };
    }
    if (error.message.includes("等待") || error.message.includes("稍后")) {
      return {
        title: "⚡ AI 正在处理中",
        description: "AI 正在进行复杂的运算，请稍候片刻。优质的答案需要一点时间来完善。",
      };
    }
    if (error.message.includes("AI") || error.message.includes("模型")) {
      return {
        title: "🤖 AI 模型正在调整",
        description: "AI 模型需要一点时间来优化响应。我们将尽快为您提供所需的帮助。",
      };
    }
    return {
      title: "💫 遇到了一些小问题",
      description: "系统需要一点时间来调整。让我们稍作等待，很快就能继续我们的对话。",
    };
  };

  const content = getErrorContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 sm:px-8 md:px-12 lg:px-16 max-w-screen-2xl mx-auto bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="w-full max-w-3xl mx-auto text-center space-y-8">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-800 leading-tight"
          aria-label={content.title}
        >
          {content.title}
        </h1>

        <p
          className="text-base sm:text-lg md:text-xl text-slate-600 max-w-[600px] mx-auto leading-relaxed"
          aria-label={content.description}
        >
          {content.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center min-w-[160px] px-8 py-4 text-base font-medium text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
            aria-label="重试"
          >
            重试
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center min-w-[160px] px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            aria-label="返回主页"
          >
            返回主页
          </Link>
        </div>
      </div>
    </div>
  );
}
