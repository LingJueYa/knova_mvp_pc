"use client";

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { chatActions } from '@/store/chat'
import Home from '../page'

/**
 * 会话页面组件
 * @returns {JSX.Element} 渲染的会话页面
 */
export default function ConversationPage() {
  // 获取路由参数中的会话ID
  const params = useParams()
  const conversationId = params.conversationId as string

  // 当会话ID存在时，加载对应的会话数据
  useEffect(() => {
    if (conversationId) {
      chatActions.loadConversation(conversationId)
    }
  }, [conversationId])

  // 组件卸载时保存当前会话状态到本地存储
  useEffect(() => {
    return () => {
      chatActions.saveToLocalStorage()
    }
  }, [])

  // 渲染主页面组件
  return (
    <main role="main" aria-label="会话内容">
      <Home />
    </main>
  )
} 