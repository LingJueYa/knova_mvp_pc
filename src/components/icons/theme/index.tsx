/**
 * 主题图标组件索引
 * 用于主题切换按钮展示不同的主题模式图标
 */

'use client'

import React from 'react';
import { DarkMode } from './dark.mode';
import { LightMode } from './light-mode';
import { SystemMode } from './system-mode';

/**
 * 主题图标映射对象
 * 将主题类型映射到对应的图标组件
 */
export const ThemeIcons: Record<string, React.ReactNode> = {
  light: <LightMode />,
  dark: <DarkMode />,
  system: <SystemMode />
};
