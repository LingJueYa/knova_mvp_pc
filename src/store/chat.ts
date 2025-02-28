import { proxy } from 'valtio'
import { saveConversation, fetchConversation } from '@/lib/api'
import type { Message } from '@/lib/api'

// 类型定义
export interface DifyResponse {
  recommendations: string[]
}

interface ChatState {
  inputValue: string
  searchMode: boolean
  isComposing: boolean
  lastValidInput: string
  isInteraction: boolean
  messages: Message[]
  conversationId: string | null
  isLoading: boolean
  isSendingDisabled: boolean
  difyResponse: DifyResponse | null
  selectedQuestion: string | null
}

// 常量定义
const STORAGE_KEY = 'chat_state'

// 状态初始化
export const chatState = proxy<ChatState>({
  inputValue: '',
  searchMode: true,
  isComposing: false,
  lastValidInput: '',
  isInteraction: false,
  messages: [],
  conversationId: null,
  isLoading: false,
  isSendingDisabled: false,
  difyResponse: null,
  selectedQuestion: null,
})

// 聊天操作集合
export const chatActions = {
  // 基础状态操作
  setInputValue(value: string) {
    chatState.inputValue = value
    chatState.lastValidInput = value
  },
  
  setCompositionState(isComposing: boolean) {
    chatState.isComposing = isComposing
  },

  updateLastValidInput(value: string) {
    chatState.lastValidInput = value
  },

  setSearchMode(enabled: boolean) {
    chatState.searchMode = enabled
  },

  setIsInteraction(enabled: boolean) {
    chatState.isInteraction = enabled
  },

  // 会话管理
  initializeConversation() {
    const newId = crypto.randomUUID()
    chatState.conversationId = newId
    window.history.replaceState(null, '', `/${newId}`)
  },

  // 本地存储操作
  saveToLocalStorage() {
    const state = {
      messages: chatState.messages,
      conversationId: chatState.conversationId,
      isInteraction: chatState.isInteraction
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  },

  loadFromLocalStorage() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const state = JSON.parse(stored)
      if (window.location.pathname !== '/') {
        chatState.conversationId = state.conversationId
      } else {
        chatState.conversationId = null
      }
      chatState.messages = state.messages
      chatState.isInteraction = state.isInteraction
    }
  },

  // 消息处理
  async submitMessage(content: string) {
    if (!chatState.conversationId) {
      this.initializeConversation()
    }
    
    chatState.isSendingDisabled = true
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: 'user',
      content,
      timestamp: Date.now()
    }
    
    chatState.messages.push(userMessage)
    chatState.isInteraction = true
    chatState.inputValue = ''
    chatState.lastValidInput = ''

    try {
      if (chatState.searchMode) {
        chatState.isLoading = true
        const response = await fetch('/api/recommended-question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: content })
        })
        
        if (!response.ok) {
          throw new Error('Failed to get recommendations')
        }
        
        const data = await response.json()
        console.log('Received recommendations:', data)
        chatState.difyResponse = data
      }
    } catch (error) {
      console.error('Error getting recommendations:', error)
      
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: '抱歉，获取推荐问题时出现错误',
        timestamp: Date.now()
      }
      chatState.messages.push(errorMessage)
    } finally {
      chatState.isLoading = false
      chatState.isSendingDisabled = false
    }

    if (chatState.conversationId) {
      try {
        await saveConversation(chatState.conversationId, chatState.messages)
      } catch (error) {
        console.error('Failed to save conversation:', error)
      }
    }
  },

  // 推荐问题处理
  selectRecommendation(content: string) {
    if (content && !chatState.isSendingDisabled) {
      chatState.selectedQuestion = content
    }
  },

  async refineQuestion() {
    if (chatState.selectedQuestion) {
      chatState.isLoading = true
      chatState.isSendingDisabled = true
      
      try {
        await this.submitMessage(chatState.selectedQuestion)
        
        const response = await fetch('/api/recommended-question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            question: chatState.selectedQuestion,
            isRefinement: true 
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to get recommendations')
        }
        
        const data = await response.json()
        chatState.difyResponse = data
      } catch (error) {
        console.error('Error getting refined recommendations:', error)
      } finally {
        chatState.isLoading = false
        chatState.isSendingDisabled = false
      }
    }
  },

  startNewQuestion() {
    if (chatState.selectedQuestion) {
      chatState.isLoading = true
      this.submitMessage(chatState.selectedQuestion)
    }
  },

  // 消息管理
  addAssistantMessage(content: string) {
    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      type: 'assistant', 
      content,
      timestamp: Date.now()
    }
    chatState.messages.push(assistantMessage)
  },

  // 状态重置
  reset() {
    chatState.inputValue = ''
    chatState.searchMode = true
    chatState.isComposing = false
    chatState.lastValidInput = ''
    chatState.isInteraction = false
    chatState.messages = []
  },

  // 会话加载
  async loadConversation(id: string) {
    chatState.conversationId = id
    chatState.isInteraction = true

    try {
      this.loadFromLocalStorage()
      
      if (chatState.conversationId !== id) {
        const data = await fetchConversation(id)
        chatState.messages = data.messages
        chatState.isInteraction = true
        chatState.conversationId = id
        this.saveToLocalStorage()
      }
    } catch (error) {
      console.error('Failed to load conversation:', error)
    }
  },
} 