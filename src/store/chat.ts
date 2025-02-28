import { proxy } from 'valtio'
import { saveConversation, fetchConversation } from '@/lib/api'
import type { Message } from '@/lib/api'

// 定义 Dify 响应类型
export interface DifyResponse {
  recommendations: string[]
}

// 定义聊天状态接口
interface ChatState {
  inputValue: string // 输入框内容
  searchMode: boolean // 搜索模式
  isComposing: boolean // 输入法组合状态
  lastValidInput: string // 最后有效输入
  isInteraction: boolean // 是否处于交互状态
  messages: Message[] // 存储对话消息
  conversationId: string | null // 对话ID
  isLoading: boolean
  isSendingDisabled: boolean
  difyResponse: DifyResponse | null
  selectedQuestion: string | null
}

// 用于本地存储的key
const STORAGE_KEY = 'chat_state'

// 聊天状态存储
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

// 聊天相关操作
export const chatActions = {
  // 设置输入值
  setInputValue(value: string) {
    chatState.inputValue = value
    chatState.lastValidInput = value
  },
  
  // 设置输入法组合状态
  setCompositionState(isComposing: boolean) {
    chatState.isComposing = isComposing
  },

  // 更新最后有效输入
  updateLastValidInput(value: string) {
    chatState.lastValidInput = value
  },

  // 设置搜索模式
  setSearchMode(enabled: boolean) {
    chatState.searchMode = enabled
  },

  // 设置交互状态
  setIsInteraction(enabled: boolean) {
    chatState.isInteraction = enabled
  },

  // 初始化新对话
  initializeConversation() {
    const newId = crypto.randomUUID()
    chatState.conversationId = newId
    // 使用 replaceState 来无感更新 URL
    window.history.replaceState(null, '', `/${newId}`)
  },

  // 保存状态到本地存储
  saveToLocalStorage() {
    const state = {
      messages: chatState.messages,
      conversationId: chatState.conversationId,
      isInteraction: chatState.isInteraction
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  },

  // 从本地存储恢复状态
  loadFromLocalStorage() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const state = JSON.parse(stored)
      chatState.messages = state.messages
      chatState.conversationId = state.conversationId
      chatState.isInteraction = state.isInteraction
    }
  },

  // 提交消息
  async submitMessage(content: string) {
    if (!chatState.conversationId) {
      this.initializeConversation()
    }
    
    chatState.isSendingDisabled = true
    
    // 创建并立即添加用户消息
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
        
        // 只保存推荐问题到状态，不创建系统消息
        chatState.difyResponse = data
      }
    } catch (error) {
      console.error('Error getting recommendations:', error)
      
      // 添加错误消息
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

    // 保存对话
    if (chatState.conversationId) {
      try {
        await saveConversation(chatState.conversationId, chatState.messages)
      } catch (error) {
        console.error('Failed to save conversation:', error)
      }
    }
  },

  // 选择推荐问题
  selectRecommendation(content: string) {
    if (content && !chatState.isSendingDisabled) {
      chatState.selectedQuestion = content // 只保存选中的问题，不立即提交
    }
  },

  // 细化当前选中的问题
  async refineQuestion() {
    if (chatState.selectedQuestion) {
      chatState.isLoading = true
      chatState.isSendingDisabled = true
      
      try {
        // 先提交当前选中的问题
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

  // 开始新的提问
  startNewQuestion() {
    if (chatState.selectedQuestion) {
      chatState.isLoading = true
      this.submitMessage(chatState.selectedQuestion)
    }
  },

  // 添加助手回复
  addAssistantMessage(content: string) {
    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      type: 'assistant', 
      content,
      timestamp: Date.now()
    }
    chatState.messages.push(assistantMessage)
  },

  // 重置所有状态
  reset() {
    chatState.inputValue = ''
    chatState.searchMode = true
    chatState.isComposing = false
    chatState.lastValidInput = ''
    chatState.isInteraction = false
    chatState.messages = [] // 清空消息
  },

  // 加载对话
  async loadConversation(id: string) {
    chatState.conversationId = id
    chatState.isInteraction = true

    try {
      // 先尝试从本地存储加载
      this.loadFromLocalStorage()
      
      // 如果本地存储的conversationId与当前不匹配，则从服务器获取
      if (chatState.conversationId !== id) {
        const data = await fetchConversation(id)
        chatState.messages = data.messages
        chatState.isInteraction = true
        chatState.conversationId = id
        // 更新本地存储
        this.saveToLocalStorage()
      }
    } catch (error) {
      console.error('Failed to load conversation:', error)
    }
  },
} 