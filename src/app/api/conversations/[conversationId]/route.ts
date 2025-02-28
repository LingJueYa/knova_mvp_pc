import { NextResponse, NextRequest } from 'next/server'
import type { Message } from '@/lib/api'

// 定义响应数据类型
interface ConversationResponse {
  id: string
  messages: Message[]
}

// 定义错误响应类型
interface ErrorResponse {
  error: string
}

// 模拟数据存储
const conversations = new Map<string, Message[]>()

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ conversationId: string }> }
): Promise<NextResponse<ConversationResponse | ErrorResponse>> {
  const { conversationId } = await props.params
  
  if (!conversationId) {
    return NextResponse.json({ error: "Missing conversationId" }, { status: 400 })
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
    return NextResponse.json({ error: "Missing conversationId" }, { status: 400 })
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
    return NextResponse.json({ error: "Missing conversationId" }, { status: 400 })
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