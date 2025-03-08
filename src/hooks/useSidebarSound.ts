/**
 * 音效处理钩子函数
 * 提供触觉反馈，增强用户操作体验
 */

import { useCallback, useRef } from "react";

/**
 * 音效处理钩子函数
 * 提供触觉反馈，增强用户操作体验
 * 支持动态加载和控制音量
 * 
 * @returns {object} 包含播放声音的方法
 */
export const useSidebarSound = () => {
  // 使用 ref 保持对音频元素的引用，避免重复创建
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  /**
   * 播放声音的方法
   * 支持设置音量与路径
   * 
   * @param path - 音频文件路径
   * @param volume - 音量大小 (0-1)
   */
  const playSound = useCallback((path: string, volume: number = 0.4) => {
    // 仅在客户端环境执行
    if (typeof window !== "undefined") {
      // 创建或复用音频元素
      if (!audioRef.current) {
        audioRef.current = new Audio(path);
      } else {
        audioRef.current.src = path;
      }
      
      // 重置音频播放位置
      audioRef.current.currentTime = 0;
      // 设置音量
      audioRef.current.volume = volume;
      
      // 播放音频并处理潜在错误
      audioRef.current.play().catch(error => {
        console.warn("音效播放失败:", error);
      });
    }
  }, []);
  
  return { playSound };
};
