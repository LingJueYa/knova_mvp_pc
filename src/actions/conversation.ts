export interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface Conversation {
  id: string
  messages: Message[]
}

// API 请求处理
export const conversationActions = {
  /**
   * 获取对话内容
   * @param conversationId 对话ID
   */
  fetchConversation: async (conversationId: string): Promise<Conversation> => {
    const response = await fetch(`/api/conversations/${conversationId}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch conversation')
    }
    
    return response.json()
  },

  /**
   * 保存整个对话
   * @param conversationId 对话ID
   * @param messages 消息数组
   */
  saveConversation: async (conversationId: string, messages: Message[]): Promise<Conversation> => {
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
  },

  /**
   * 保存单条消息
   * @param conversationId 对话ID
   * @param message 消息对象
   */
  saveMessage: async (conversationId: string, message: Message): Promise<Conversation> => {
    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(message)
      })
      
      if (!response.ok) {
        throw new Error('Failed to save message')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error saving message:', error)
      throw error
    }
  }
} 