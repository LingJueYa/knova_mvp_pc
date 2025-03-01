import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export function ConfettiAnimation() {
  useEffect(() => {
    // 彩带动画配置
    const duration = 4 * 1000
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    // 开始时间
    const animationEnd = Date.now() + duration

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    // 播放彩带动画
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        return
      }

      const particleCount = 50 * (timeLeft / duration)

      // 从左右两侧发射彩带
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return null
} 