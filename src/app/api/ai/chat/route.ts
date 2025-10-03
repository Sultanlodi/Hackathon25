import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// System prompt to set the AI coach's personality and capabilities
const SYSTEM_PROMPT = `You are an expert AI Financial Coach for "Stacks", a personal finance management platform. Your role is to help users make smarter financial decisions, optimize their budgets, and reach their financial goals faster.

Your personality:
- Friendly, supportive, and encouraging
- Expert in personal finance, budgeting, saving strategies, and goal setting
- Provide actionable, specific advice
- Use clear formatting with bullet points and sections when appropriate
- Be concise but thorough
- Ask clarifying questions when needed

Key areas you help with:
- Budget optimization and spending analysis
- Emergency fund planning and savings strategies
- Bill reduction and expense management
- Debt management and payoff strategies
- Financial goal setting and milestone planning
- Dining and entertainment spending optimization
- Subscription audits and cost cutting
- Investment basics and retirement planning

Always:
- Be encouraging and positive
- Provide specific numbers and timelines when possible
- Offer step-by-step action plans
- Connect advice to the user's stated goals
- Use markdown formatting for better readability

Important: Keep responses focused, helpful, and under 500 words when possible.`

export async function POST(req: Request) {
  try {
    const { message, conversationHistory } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Initialize the Gemini model
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

    // Build conversation context
    let conversationContext = ''
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationContext = conversationHistory
        .slice(-6) // Keep last 6 messages for context
        .map(
          (msg: any) =>
            `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
        )
        .join('\n\n')
    }

    // Build the full prompt
    const fullPrompt = conversationContext
      ? `${conversationContext}\n\nUser: ${message}\n\nAssistant:`
      : message

    // Call Gemini API
    const result = await model.generateContent(fullPrompt)
    const response = result.response
    const text = response.text()

    return NextResponse.json({
      response: text,
      success: true,
    })
  } catch (error: any) {
    console.error('AI Chat Error:', error)

    // Handle specific error types
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        {
          error:
            'API key configuration error. Please check your Gemini API key.',
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    )
  }
}
