import { proxy } from 'valtio'

// 定义聊天状态接口
interface ChatState {
  inputValue: string // 输入框内容
  searchMode: boolean // 搜索模式
  isComposing: boolean // 输入法组合状态
  lastValidInput: string // 最后有效输入
  isInteraction: boolean // 是否处于交互状态
}

// 聊天状态存储
export const chatState = proxy<ChatState>({
  inputValue: '',
  searchMode: true,
  isComposing: false,
  lastValidInput: '',
  isInteraction: false
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

  // 重置所有状态
  reset() {
    chatState.inputValue = ''
    chatState.searchMode = true
    chatState.isComposing = false
    chatState.lastValidInput = ''
    chatState.isInteraction = false
  }
} 