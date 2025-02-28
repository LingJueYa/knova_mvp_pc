'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
    if (error.message.includes('props')) {
      return {
        title: '✨ 内容加载有点小问题',
        description: '🔮 塔罗师正在重新洗牌',
      };
    }
    if (error.message.includes('state')) {
      return {
        title: '🌟 状态有点不同步',
        description: '⚡️ 塔罗师正在重新校准能量',
      };
    }
    return {
      title: '🌈 这里遇到了一点波动',
      description: '✨ 塔罗师正在为您重新调整',
    };
  };

  const content = getErrorContent();

  return (
    <html>
      <body>
        <div className="w-full p-6 sm:p-8 rounded-xl bg-gray-50/50 border border-gray-100">
          <div className="max-w-lg mx-auto text-center space-y-4">
            <h2 
              className="text-lg sm:text-xl md:text-2xl font-normal text-gray-800"
              aria-label={content.title}
            >
              {content.title}
            </h2>
            <p 
              className="text-base text-gray-500 font-light"
              aria-label={content.description}
            >
              {content.description}
            </p>
            <button
              onClick={reset}
              className="mt-6 px-6 py-2.5 text-sm font-normal text-primary bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
              aria-label="重新加载"
            >
              重新加载
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}