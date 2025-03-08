// 侧边栏整体淡入动画
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] // 优雅的缓动函数
    }
  }
};

// 侧边栏条目依次淡入动画
export const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: { 
      delay: custom * 0.05,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}; 