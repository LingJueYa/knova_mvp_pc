"use client"

/**
 * 设置页面
 * 提供主题切换功能和其他系统设置
 */

import React from 'react'
import ThemeSwitcher from '@/components/theme/ThemeSwitcher'

/**
 * 设置页面组件
 * 提供应用程序设置选项，包括主题切换和其他偏好设置
 */
export default function SettingsPage() {
  return (
    <div className="container max-w-6xl px-6 sm:px-8 py-12 md:py-16 animate-in dark:animate-in">
      {/* 页面标题区 */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-50 dark:to-gray-300">
          Settings
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Customize your Knova experience, adjust application theme and other setting options
        </p>
      </div>

      {/* 设置区块容器 */}
      <div className="space-y-16">
        {/* 主题设置区块 */}
        <section className="rounded-2xl bg-white dark:bg-gray-900/70 border border-gray-100 dark:border-gray-800 p-8 md:p-10 shadow-sm">
          {/* 顶部渐变装饰元素 */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/10 dark:via-purple-400/10 to-transparent opacity-70"></div>
          
          {/* 区块标题和描述 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-3 flex items-center">
              <span className="text-gray-900 dark:text-white">
                Appearance
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Customize the appearance and feel of the application, choose the environment that suits you
            </p>
          </div>

          {/* 引入主题切换器组件 */}
          <ThemeSwitcher />
        </section>
      </div>
    </div>
  )
}
