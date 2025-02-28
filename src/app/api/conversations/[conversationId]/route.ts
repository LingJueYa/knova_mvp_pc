import { NextResponse, NextRequest } from 'next/server'
import type { Message } from '@/actions/conversation'

// 接口定义
interface ConversationResponse {
  id: string
  messages: Message[]
}

interface ErrorResponse {
  error: string
}

// 数据存储
/** 用于存储会话消息的内存映射 key: conversationId, value: messages[] */
const conversations = new Map<string, Message[]>()

// API 处理函数
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ conversationId: string }> }
): Promise<NextResponse<ConversationResponse | ErrorResponse>> {
  const { conversationId } = await props.params
  
  if (!conversationId) {
    return NextResponse.json(
      { error: "Missing conversationId" }, 
      { status: 400 }
    )
  }
  
  const messages = conversations.get(conversationId) || []
  
  return NextResponse.json({
    id: conversationId,
    messages
  })
}

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ conversationId: string }> }
): Promise<NextResponse<ConversationResponse | ErrorResponse>> {
  const { conversationId } = await props.params
  
  if (!conversationId) {
    return NextResponse.json(
      { error: "Missing conversationId" }, 
      { status: 400 }
    )
  }

  const { messages } = await request.json()
  conversations.set(conversationId, messages)
  
  return NextResponse.json({
    id: conversationId,
    messages
  })
}

export async function POST(
  request: NextRequest,
  props: { params: Promise<{ conversationId: string }> }
): Promise<NextResponse<ConversationResponse | ErrorResponse>> {
  const { conversationId } = await props.params
  
  if (!conversationId) {
    return NextResponse.json(
      { error: "Missing conversationId" }, 
      { status: 400 }
    )
  }

  const message = await request.json()
  const messages = conversations.get(conversationId) || []
  messages.push(message)
  conversations.set(conversationId, messages)
  
  return NextResponse.json({
    id: conversationId,
    messages
  })
} 