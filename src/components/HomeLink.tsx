import Link from "next/link";

export default function HomeLink() {
  return (
    <nav 
      className="flex items-center space-x-2 sm:space-x-3 text-[#7D7D7D] h-9"
      role="navigation"
      aria-label="页脚链接导航"
    >
      <Link 
        href="/privacy" 
        className="hover:text-gray-900 transition-all duration-300 ease-in-out text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md px-2 py-1"
        aria-label="隐私政策"
      >
        Privacy
      </Link>
      <span aria-hidden="true">/</span>
      <Link 
        href="/terms" 
        className="hover:text-gray-900 transition-all duration-300 ease-in-out text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md px-2 py-1"
        aria-label="使用条款"
      >
        Terms
      </Link>
      <span aria-hidden="true">/</span>
      <Link 
        href="/help" 
        className="hover:text-gray-900 transition-all duration-300 ease-in-out text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md px-2 py-1"
        aria-label="帮助中心"
      >
        Help center
      </Link>
    </nav>
  );
}
