"use client"

import React, { useEffect, useState } from 'react'
import { DarkMode } from '@/components/theme/DarkModeIcon'
import { LightMode } from '@/components/theme/LightModeIcon'
import { SystemMode } from '@/components/theme/SystemModeIcon'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

/**
 * 主题切换器组件
 * 提供系统、亮色和暗色三种主题切换选项
 * 包含完整的标题和描述信息
 */
export default function ThemeSwitcher({ 
  title = "Appearance", 
  description = "Customize the appearance and feel of the application, choose the environment that suits you" 
}: { 
  title?: string, 
  description?: string 
}) {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // 确保组件挂载后才渲染主题相关内容
  useEffect(() => {
    setMounted(true)
  }, [])

  // 记录上一个主题状态，用于切换动画效果
  const [prevTheme, setPrevTheme] = useState('')
  
  /**
   * 切换主题并添加从一个选项到另一个选项的滑动动画效果
   * @param newTheme 要切换的新主题
   */
  const handleThemeChange = (newTheme: string) => {
    // 只有当主题发生变化时才执行
    if (theme !== newTheme) {
      // 确保主题是没有空格的有效字符串
      const safeTheme = theme?.replace(/\s+/g, '-') || ''
      setPrevTheme(safeTheme)
      setTheme(newTheme)
      
      // 500ms后重置prevTheme，以确保动画效果完成
      setTimeout(() => {
        setPrevTheme('')
      }, 500)
    }
  }

  return (
    <>
      {/* 区块标题和描述 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-3 flex items-center">
          <span className="text-gray-900 dark:text-white">
            {title}
          </span>
        </h2>
        <p className="text-gray-600 dark:text-primary mb-2">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* 系统主题选项卡片 */}
        <div
          className={cn(
            'group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2',
            'transform transition-transform active:scale-[0.99]'
          )}
          onClick={() => handleThemeChange('system')}
          tabIndex={0}
          role="radio"
          aria-checked={mounted && theme === 'system'}
          aria-label="系统主题"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleThemeChange('system')
            }
          }}
        >
          {/* 选中状态指示器 */}
          {mounted && theme === 'system' && (
            <div className="absolute top-3 right-3 z-20 text-purple-600 dark:text-purple-400">
              <CheckCircle className="h-6 w-6" />
            </div>
          )}
          
          {/* 卡片主体内容 */}
          <div className={cn(
            'm-1 p-2 border-2 rounded-xl transition-all duration-500 relative z-10',
            mounted && theme === 'system' 
              ? 'border-purple-600 dark:border-purple-500 shadow-lg shadow-purple-100 dark:shadow-purple-950/20'
              : 'border-gray-200 dark:border-gray-800 shadow-sm',
            /* 从其他主题切换到此主题时的边框动画效果 */
            prevTheme && prevTheme !== 'system' && theme === 'system' ? 'animate-border-slide' : ''
          )}>
            <div className="z-1 overflow-hidden rounded-xl">
              <SystemMode/>
            </div>
          </div>
          
          {/* 卡片标题和描述 */}
          <div className="px-4 py-3 text-center">
            <span className="font-medium text-gray-900 dark:text-gray-100 tracking-wide">
              System
            </span>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 opacity-70">Auto Switch</div>
          </div>
        </div>
        
        {/* 亮色主题选项卡片 */}
        <div
          className={cn(
            'group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2',
            'transform transition-transform active:scale-[0.99]'
          )}
          onClick={() => handleThemeChange('light')}
          tabIndex={0}
          role="radio"
          aria-checked={mounted && theme === 'light'}
          aria-label="亮色主题"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleThemeChange('light')
            }
          }}
        >
          {/* 选中状态指示器 */}
          {mounted && theme === 'light' && (
            <div className="absolute top-3 right-3 z-20 text-orange-500 dark:text-orange-400">
              <CheckCircle className="h-6 w-6" />
            </div>
          )}
          
          {/* 卡片主体内容 */}
          <div className={cn(
            'm-1 p-2 border-2 rounded-xl transition-all duration-500 relative z-10',
            mounted && theme === 'light' 
              ? 'border-orange-500 dark:border-orange-400 shadow-lg shadow-orange-100 dark:shadow-orange-950/20'
              : 'border-gray-200 dark:border-gray-800 shadow-sm',
            /* 从其他主题切换到此主题时的边框动画效果 */
            prevTheme && prevTheme !== 'light' && theme === 'light' ? 'animate-border-slide' : ''
          )}>
            <div className="z-1 overflow-hidden rounded-xl">
              <LightMode/>
            </div>
          </div>
          
          {/* 卡片标题和描述 */}
          <div className="px-4 py-3 text-center">
            <span className="font-medium text-gray-900 dark:text-gray-100 tracking-wide">
              Light Mode
            </span>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 opacity-70">Always Light</div>
          </div>
        </div>
        
        {/* 暗色主题选项卡片 */}
        <div
          className={cn(
            'group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
            'transform transition-transform active:scale-[0.99]'
          )}
          onClick={() => handleThemeChange('dark')}
          tabIndex={0}
          role="radio"
          aria-checked={mounted && theme === 'dark'}
          aria-label="暗色主题"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleThemeChange('dark')
            }
          }}
        >
          {/* 选中状态指示器 */}
          {mounted && theme === 'dark' && (
            <div className="absolute top-3 right-3 z-20 text-blue-500 dark:text-blue-400">
              <CheckCircle className="h-6 w-6" />
            </div>
          )}
          
          {/* 卡片主体内容 */}
          <div className={cn(
            'm-1 p-2 border-2 rounded-xl transition-all duration-500 relative z-10',
            mounted && theme === 'dark' 
              ? 'border-blue-600 dark:border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-950/20'
              : 'border-gray-200 dark:border-gray-800 shadow-sm',
            /* 从其他主题切换到此主题时的边框动画效果 */
            prevTheme && prevTheme !== 'dark' && theme === 'dark' ? 'animate-border-slide' : ''
          )}>
            <div className="z-1 overflow-hidden rounded-xl">
              <DarkMode />
            </div>
          </div>
          
          {/* 卡片标题和描述 */}
          <div className="px-4 py-3 text-center">
            <span className="font-medium text-gray-900 dark:text-gray-100 tracking-wide">
              Dark Mode
            </span>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 opacity-70">Always Dark</div>
          </div>
        </div>
      </div>
    </>
  )
} 