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
        title: "🌐 与星界的连接暂时中断",
        description: "别担心，休息一下，让能量重新汇聚。很多时候，命运的答案就在片刻等待之后。",
      };
    }
    if (error.message.includes("等待") || error.message.includes("稍后")) {
      return {
        title: "⏳ 星界信息正在传递",
        description: "塔罗牌的智慧需要时间沉淀，让我们耐心等待，好的答案值得等待。",
      };
    }
    if (error.message.includes("塔罗师")) {
      return {
        title: "✨ 塔罗师在调整能量",
        description: "每个答案都需要专注的解读，让我们给塔罗师一点时间，很快就能为您揭示答案。",
      };
    }
    return {
      title: "🎋 遇见了一点小意外",
      description: "命运之轮在转动，有时需要停下来调整方向。让我们深呼吸，重新开始这段奇妙的旅程。",
    };
  };

  const content = getErrorContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 sm:px-8 md:px-12 lg:px-16 max-w-screen-2xl mx-auto bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="w-full max-w-3xl mx-auto text-center space-y-6 md:space-y-8 lg:space-y-10">
        <h1
          className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-normal tracking-tight text-gray-800 leading-tight"
          aria-label={content.title}
        >
          {content.title}
        </h1>

        <p
          className="text-base sm:text-lg md:text-xl text-gray-500 max-w-[540px] mx-auto leading-relaxed font-light"
          aria-label={content.description}
        >
          {content.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 md:pt-6">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center min-w-[140px] px-7 py-3.5 text-base font-normal text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            aria-label="重新尝试"
          >
            重新尝试
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center min-w-[140px] px-7 py-3.5 text-base font-normal text-white bg-primary rounded-lg hover:bg-primary/95 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
            aria-label="返回首页"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
