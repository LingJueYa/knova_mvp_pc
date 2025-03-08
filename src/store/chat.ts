import { proxy } from 'valtio'
import { conversationActions } from '@/actions/conversation'
import type { Message } from '@/actions/conversation'

// 接口定义
export interface DifyResponse {
  recommendations: string[]
}

interface ChatState {
  // 输入相关状态
  inputValue: string // 输入框内容
  lastValidInput: string // 上次有效输入
  isComposing: boolean // 是否正在输入
  
  // 模式控制
  guidedMode: boolean
  isInteraction: boolean
  
  // 会话相关状态
  messages: Message[]
  conversationId: string | null
  
  // UI 状态
  isLoading: boolean
  isSendingDisabled: boolean
  
  // Dify 相关状态
  difyResponse: DifyResponse | null
  selectedQuestion: string | null
}

// 存储键常量
const STORAGE_KEY = 'chat_state'

// 初始状态
export const chatState = proxy<ChatState>({
  // 输入相关
  inputValue: '', // 输入框内容
  lastValidInput: '', // 上次有效输入
  isComposing: false, // 是否正在输入
  
  // 模式控制
  guidedMode: true, // 引导模式
  isInteraction: false, // 是否交互
  
  // 会话相关
  messages: [], // 消息列表
  conversationId: null, // 会话ID
  
  // UI 状态
  isLoading: false, // 是否加载中
  isSendingDisabled: false, // 是否发送禁用
  
  // Dify 相关
  difyResponse: null, // Dify响应
  selectedQuestion: null, // 选中的问题
})

// 聊天操作集合
export const chatActions = {
  // 设置输入框内容
  setInputValue(value: string) {
    chatState.inputValue = value
    chatState.lastValidInput = value
  },
  
  // 设置是否正在输入
  setCompositionState(isComposing: boolean) {
    chatState.isComposing = isComposing
  },

  // 更新上次有效输入
  updateLastValidInput(value: string) {
    chatState.lastValidInput = value
  },

  // 设置引导模式
  setguidedMode(enabled: boolean) {
    chatState.guidedMode = enabled
  },

  // 设置是否交互
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

  // 从本地存储加载
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
      if (chatState.guidedMode) {
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
        await conversationActions.saveConversation(chatState.conversationId, chatState.messages)
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
    chatState.guidedMode = true
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
        const data = await conversationActions.fetchConversation(id)
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