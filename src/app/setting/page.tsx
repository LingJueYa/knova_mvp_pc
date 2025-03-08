"use client"

import React from 'react'
import { DarkMode } from '@/components/icons/theme/dark.mode'
import { LightMode } from '@/components/icons/theme/light-mode'
import { SystemMode } from '@/components/icons/theme/system-mode'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

export default function SettingsPage() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="container py-10 animate-in">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">设置</h1>

      <div className="space-y-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">主题设置</h2>
          <p className="text-muted-foreground mb-6">
            自定义应用的外观和感觉，选择适合您的主题模式
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">
              <div
                className={cn(
                  'rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
                  theme === 'system' ? 'border-purple-800' : ''
                )}
                onClick={() => setTheme('system')}
              >
                <SystemMode />
              </div>
              <div
                className={cn(
                  'rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
                  theme === 'light' ? 'border-purple-800' : ''
                )}
                onClick={() => setTheme('light')}
              >
                <LightMode />
              </div>
              <div
                className={cn(
                  'rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
                  theme === 'dark' ? 'border-purple-800' : ''
                )}
                onClick={() => setTheme('dark')}
              >
                <DarkMode />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
