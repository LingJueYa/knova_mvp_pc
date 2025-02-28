// 404 错误页面组件

import Link from "next/link";

export default function NotFound() {
  return (
    <div 
      className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-white"
      role="main"
      aria-label="页面未找到"
    >
      {/* 装饰背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-3xl" />
      </div>

      {/* 主要内容区域 */}
      <div className="relative w-full max-w-2xl mx-auto px-6 py-12 text-center space-y-8">
        {/* 错误代码 */}
        <p 
          className="text-sm font-medium text-blue-600 tracking-wider"
          aria-label="错误代码 404"
        >
          ERROR 404
        </p>

        {/* 标题 */}
        <h1 
          className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight"
          aria-label="抱歉，您请求的页面不存在"
        >
          抱歉，您请求的页面不存在
        </h1>

        {/* 描述文本 */}
        <p 
          className="text-base sm:text-lg text-gray-600 max-w-md mx-auto"
          aria-label="Knova AI 正在持续优化和更新中，让我们返回首页继续探索"
        >
          Knova AI 正在持续优化和更新中，让我们返回首页继续探索
        </p>

        {/* 操作按钮 */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="返回首页"
            role="button"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
