"use client";

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { chatActions } from '@/store/chat'
import Home from '../page'

export default function ConversationPage() {
  const params = useParams()
  const conversationId = params.conversationId as string

  useEffect(() => {
    if (conversationId) {
      chatActions.loadConversation(conversationId)
    }
  }, [conversationId])

  // 页面卸载时保存状态
  useEffect(() => {
    return () => {
      chatActions.saveToLocalStorage()
    }
  }, [])

  return <Home />
} 