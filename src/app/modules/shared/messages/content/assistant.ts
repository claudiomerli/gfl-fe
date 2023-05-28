export interface AssistantRequest {
  messages: AssistantMessage[]
}

export interface AssistantMessage {
  role: string
  content: string
}

export interface AssistantResponse {
  id: string
  object: string
  created: number
  model: string
  usage: AssistantResponseUsage
  choices: AssistantResponseChoice[]
}

export interface AssistantResponseUsage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface AssistantResponseChoice {
  message: AssistantMessage
  finish_reason: string
  index: number
}
