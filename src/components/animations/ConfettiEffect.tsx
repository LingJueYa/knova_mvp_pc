/**
 * 彩带庆祝动画组件
 */
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiEffectProps {
  /**
   * 是否播放动画
   */
  play: boolean;
  
  /**
   * 动画持续时间（毫秒）
   * @default 1000
   */
  duration?: number;
  
  /**
   * 彩带颜色数组
   */
  colors?: string[];
  
  /**
   * 每侧粒子数量
   * @default 20
   */
  particleCount?: number;
  
  /**
   * 完成回调函数
   */
  onComplete?: () => void;
}

/**
 * 彩带庆祝动画效果组件
 */
export function ConfettiEffect({ 
  play, 
  duration = 1000, 
  colors = ["#007AFF", "#FF9500", "#FF2D55", "#5AC8FA", "#34C759"],
  particleCount = 20,
  onComplete
}: ConfettiEffectProps) {
  
  useEffect(() => {
    // 只在play为true时运行动画
    if (!play) return;
    
    // 设置动画结束时间
    const animationEnd = Date.now() + duration;
    
    // 递归函数创建连续的彩带效果
    const frame = () => {
      // 从左侧发射彩带
      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0.05, y: 0.5 },
        colors,
        disableForReducedMotion: true, // 无障碍支持
        gravity: 1.2, // 加速下落速度
        scalar: 0.8, // 缩小粒子尺寸
        drift: 0, // 减少水平漂移
        ticks: 150 // 减少动画持续时间
      });
      
      // 从右侧发射彩带
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 0.95, y: 0.5 },
        colors,
        disableForReducedMotion: true,
        gravity: 1.2,
        scalar: 0.8,
        drift: 0,
        ticks: 150
      });
      
      // 如果动画时间未到，继续运行
      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      } else if (onComplete) {
        // 动画完成时触发回调
        onComplete();
      }
    };
    
    // 开始动画
    frame();
    
  }, [play, duration, colors, particleCount, onComplete]);
  
  // 这个组件不渲染任何可见内容
  return null;
}