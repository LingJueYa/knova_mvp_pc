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
        title: '系统正在思考中',
        description: 'Knova AI 正在重新加载数据',
      };
    }
    if (error.message.includes('state')) {
      return {
        title: '系统需要同步一下',
        description: 'Knova AI 正在重新校准状态',
      };
    }
    return {
      title: '遇到了一点小问题',
      description: 'Knova AI 正在快速修复中',
    };
  };

  const content = getErrorContent();

  return (
    <html>
      <body>
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-6">
          <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-lg border border-gray-100/50">
            <div className="space-y-6 text-center">
              <h2 
                className="text-2xl font-medium text-gray-900"
                aria-label={content.title}
              >
                {content.title}
              </h2>
              <p 
                className="text-base text-gray-600"
                aria-label={content.description}
              >
                {content.description}
              </p>
              <button
                onClick={reset}
                className="w-full mt-8 px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="重新加载"
              >
                重新加载
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}