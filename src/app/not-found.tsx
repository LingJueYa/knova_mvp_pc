// 404 页面

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 sm:px-8 md:px-12 lg:px-16 max-w-screen-2xl mx-auto">
      <div className="w-full max-w-3xl mx-auto text-center space-y-6 md:space-y-8 lg:space-y-10">
        <h1
          className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-normal tracking-tight text-gray-800 leading-tight"
          aria-label="别担心，这里暂时不能访问"
        >
          🌙 别担心，这里暂时不能访问
        </h1>

        <p
          className="text-base sm:text-lg md:text-xl text-gray-500 max-w-[540px] mx-auto leading-relaxed font-light"
          aria-label="塔罗师正在为您寻找新的道路，让我们一起返回首页继续探索"
        >
          ✨ 塔罗师正在为您寻找新的道路，让我们一起返回首页继续探索
        </p>

        <div className="pt-4 md:pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center min-w-[140px] px-7 py-3.5 text-base font-normal text-white bg-primary rounded-lg hover:bg-primary/95 active:scale-95 touch-manipulation select-none cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
            aria-label="继续探索"
            role="button"
          >
            🪄 继续探索
          </Link>
        </div>
      </div>
    </div>
  );
}
