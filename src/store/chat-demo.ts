import { proxy } from 'valtio'
import { conversationActions } from '@/actions/conversation'
import type { Message } from '@/actions/conversation'
import { investmentQuestions } from '@/data/investment-questions'
import { investmentConclusions } from '@/data/investment-conclusions'

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
  currentQuestion: typeof investmentQuestions[0] | null
  currentQuestionIndex: number
  isThinking: boolean
  isStreaming: boolean
  streamingComplete: boolean
  showConclusions: boolean
  currentConclusion: typeof investmentConclusions[0] | null
  conclusionIndex: number
  conclusionStreamingComplete: boolean;
  showArticleLoading: boolean;
  showArticleShowcase: boolean;
  showTransition: boolean;
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
  currentQuestion: null,
  currentQuestionIndex: 0,
  isThinking: false,
  isStreaming: false,
  streamingComplete: false,
  showConclusions: false,
  currentConclusion: null,
  conclusionIndex: 0,
  conclusionStreamingComplete: false,
  showArticleLoading: false,
  showArticleShowcase: false,
  showTransition: false,
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

    // 如果是首次对话，开始投资问题流程
    if (chatState.messages.length === 1) {
      chatState.isLoading = true
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      chatState.isLoading = false
      this.startInvestmentQuestions()
    }

    if (chatState.conversationId) {
      try {
        await conversationActions.saveConversation(chatState.conversationId, chatState.messages)
      } catch (error) {
        console.error('Failed to save conversation:', error)
      }
    }

    chatState.isSendingDisabled = false
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
  async addAssistantMessage(content: string) {
    chatState.isLoading = true
    
    // 模拟 AI 思考延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      type: 'assistant', 
      content,
      timestamp: Date.now()
    }
    
    chatState.messages.push(assistantMessage)
    chatState.isLoading = false
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

  async selectInvestmentOption(optionText: string) {
    // 添加用户选择到消息列表
    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: 'user',
      content: optionText,
      timestamp: Date.now()
    }
    chatState.messages.push(userMessage)
    
    const nextIndex = chatState.currentQuestionIndex + 1
    if (nextIndex < investmentQuestions.length) {
      // 1. 骨架屏动画
      chatState.isLoading = true
      await new Promise(resolve => setTimeout(resolve, 1000))
      chatState.isLoading = false
      
      // 2. 开始流式输出思考过程
      chatState.isStreaming = true
      chatState.currentQuestion = investmentQuestions[nextIndex]
      chatState.currentQuestionIndex = nextIndex
      
      // 等待流式输出完成后
      await new Promise(resolve => {
        const checkStreaming = setInterval(() => {
          if (!chatState.isStreaming) {
            clearInterval(checkStreaming)
            resolve(true)
          }
        }, 100)
      })

      // 3. 将思考过程添加到消息列表
      const thinkMessage: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: investmentQuestions[nextIndex].think,
        timestamp: Date.now()
      }
      chatState.messages.push(thinkMessage)

      // 4. 将问题添加到消息列表
      const questionMessage: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: investmentQuestions[nextIndex].question,
        timestamp: Date.now()
      }
      chatState.messages.push(questionMessage)
    } else {
      chatState.currentQuestion = null;
      chatState.currentQuestionIndex = 0;
      
      // 显示过渡内容
      chatState.showTransition = true;
      
      // 5秒后开始显示结论，但不隐藏过渡内容
      setTimeout(() => {
        chatState.showConclusions = true;
        this.startConclusionsDisplay();
      }, 5000);
    }
  },

  async startInvestmentQuestions() {
    // 1. 骨架屏动画
    chatState.isLoading = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    chatState.isLoading = false
    
    // 2. 开始流式输出思考过程
    chatState.isStreaming = true
    chatState.currentQuestion = investmentQuestions[0]
    chatState.currentQuestionIndex = 0
    
    // 等待流式输出完成后
    await new Promise(resolve => {
      const checkStreaming = setInterval(() => {
        if (!chatState.isStreaming) {
          clearInterval(checkStreaming)
          resolve(true)
        }
      }, 100)
    })

    // 3. 将思考过程添加到消息列表
    const thinkMessage: Message = {
      id: crypto.randomUUID(),
      type: 'assistant',
      content: investmentQuestions[0].think,
      timestamp: Date.now()
    }
    chatState.messages.push(thinkMessage)

    // 4. 将问题添加到消息列表
    const questionMessage: Message = {
      id: crypto.randomUUID(),
      type: 'assistant',
      content: investmentQuestions[0].question,
      timestamp: Date.now()
    }
    chatState.messages.push(questionMessage)
  },

  async startConclusionsDisplay() {
    chatState.conclusionIndex = 0;
    await this.playNextConclusion();
  },

  async playNextConclusion() {
    // 如果已经播放完所有结论
    if (chatState.conclusionIndex >= investmentConclusions.length) {
      chatState.showConclusions = false;
      chatState.currentConclusion = null;
      chatState.conclusionIndex = 0;
      
      // 显示加载动画
      chatState.showArticleLoading = true;
      
      // 5秒后显示文章展示组件
      setTimeout(() => {
        chatState.showArticleLoading = false;
        chatState.showArticleShowcase = true;
      }, 5000);
      return;
    }

    // 设置当前要播放的结论
    chatState.currentConclusion = investmentConclusions[chatState.conclusionIndex];
    chatState.streamingComplete = false;

    // 等待当前结论播放完成
    await new Promise<void>((resolve) => {
      const checkComplete = setInterval(() => {
        if (chatState.streamingComplete) {
          clearInterval(checkComplete);
          resolve();
        }
      }, 100);
    });

    // 等待一段时间后播放下一条
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 增加索引并继续播放下一条
    chatState.conclusionIndex++;
    await this.playNextConclusion();
  }
} 