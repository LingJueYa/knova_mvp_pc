// 导出消息类型接口
export interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: number
}

// 导出对话类型接口
export interface Conversation {
  id: string
  messages: Message[]
}

// API接口实现
export async function fetchConversation(conversationId: string): Promise<Conversation> {
  const response = await fetch(`/api/conversations/${conversationId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch conversation')
  }
  return response.json()
}

export async function saveConversation(conversationId: string, messages: Message[]): Promise<Conversation> {
  const response = await fetch(`/api/conversations/${conversationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  })
  if (!response.ok) {
    throw new Error('Failed to save conversation')
  }
  return response.json()
}

export async function saveMessage(conversationId: string, message: Message): Promise<Conversation> {
  try {
    const response = await fetch(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    })
    if (!response.ok) throw new Error('Failed to save message')
    return await response.json()
  } catch (error) {
    console.error('Error saving message:', error)
    throw error
  }
} 