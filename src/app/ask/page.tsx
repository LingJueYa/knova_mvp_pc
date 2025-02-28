"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AskPage() {
  const [iframeHeight, setIframeHeight] = useState("100vh");

  useEffect(() => {
    const calculateHeight = () => {
      const viewportHeight = window.innerHeight;
      const navHeight = 56;
      const bottomNavHeight = 56;
      return `${viewportHeight - navHeight - bottomNavHeight}px`;
    };

    setIframeHeight(calculateHeight());

    const handleResize = () => {
      setIframeHeight(calculateHeight());
    };

    window.addEventListener("resize", handleResize);

    // 尝试隐藏iframe中的顶部栏和底部标识
    const hideElements = () => {
      const iframe = document.querySelector("iframe");
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage(
            {
              type: "custom-style",
              css: `
              /* 隐藏顶部栏 */
              div[class*="shrink-0 flex items-center justify-between h-14 px-4"] {
                display: none !important;
              }
              /* 隐藏底部 Powered by */
              div[class*="mt-4 flex flex-wrap justify-between items-center py-2"] {
                display: none !important;
              }
              /* 调整内容区域以填充空间 */
              div[class*="flex flex-col flex-1"] {
                padding-top: 0 !important;
              }
              /* 确保聊天内容区域填充到底部 */
              div[class*="flex-1 overflow-hidden"] {
                padding-bottom: 0 !important;
              }
            `,
            },
            "*"
          );
        } catch (e) {
          console.error("Failed to inject styles:", e);
        }
      }
    };

    // 监听iframe加载完成
    const iframe = document.querySelector("iframe");
    if (iframe) {
      iframe.onload = hideElements;
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full relative"
    >
      <iframe
        src="https://udify.app/chatbot/jts2xSPLLKjuvDUD"
        style={{
          width: "100%",
          height: iframeHeight,
          border: "none",
          display: "block",
          marginTop: "-56px", // 抵消顶部栏的高度
        }}
        allow="microphone"
        title="Chatbot Interface"
        className="bg-white"
      />
      <style jsx global>{`
        /* 额外的CSS来确保iframe内容正确显示 */
        iframe {
          overflow: hidden;
        }
        iframe::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.main>
  );
}
