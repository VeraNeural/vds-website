'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'

interface Message {
  id: string
  role: 'user' | 'vera'
  content: string
  timestamp: Date
}

interface VeraBubbleProps {
  isPremium?: boolean
  context?: 'design' | 'visionary' | 'home' | 'portfolio' | 'residential' | 'commercial' | 'outdoor' | 'immersive'
  projectName?: string  // NEW: For immersive view context
  onUpgradeClick?: () => void
}

// Contextual messages VERA says based on what's happening
const contextualMessages: Record<string, string[]> = {
  design: [
    "Looking lovely! Every detail matters.",
    "You have such a great eye for this!",
    "That's coming together beautifully.",
    "I love where this is going!",
    "The space is really taking shape!",
  ],
  visionary: [
    "Take your time choosing — this sets the tone for everything.",
    "Each style tells a different story. Which one speaks to you?",
    "Trust your instincts. You know what feels like home.",
  ],
  home: [
    "Welcome to Vision Design Studio! Ready to create something beautiful?",
    "Every great space starts with a vision. What's yours?",
  ],
  portfolio: [
    "Each project tells a beautiful story. Which one speaks to you?",
    "Inspiration is everywhere. Let's explore these creations together.",
    "Every space reflects a unique vision. What will yours look like?",
  ],
  residential: [
    "Home is where the heart finds peace.",
    "Every room tells a story. What will yours say?",
    "Let's create spaces where life unfolds beautifully.",
  ],
  commercial: [
    "Great spaces inspire great work.",
    "First impressions matter. Let's make yours unforgettable.",
    "Where business meets beauty.",
  ],
  outdoor: [
    "Nature is the ultimate designer. Let's collaborate with it.",
    "The best rooms have no ceilings.",
    "Outdoor living at its finest.",
  ],
  immersive: [
    "Inspiration is everywhere. Let's explore these creations together.",
    "Click the + markers to discover design details.",
    "What catches your eye in this space?",
    "Every element has a story. Ask me about anything you see.",
  ],
}

// Design advice responses
const designAdvice: Record<string, string[]> = {
  color: [
    "For a cohesive look, try the 60-30-10 rule: 60% dominant color, 30% secondary, 10% accent.",
    "Sage green pairs beautifully with warm woods and cream tones.",
    "Navy and gold create a timeless, sophisticated palette.",
  ],
  furniture: [
    "Leave at least 18 inches between the sofa and coffee table for comfortable flow.",
    "Anchor your seating area with a rug that extends under all furniture legs.",
    "Odd numbers create visual interest — try grouping decor in threes or fives.",
  ],
  lighting: [
    "Layer your lighting: ambient, task, and accent for a complete feel.",
    "A statement floor lamp can transform an empty corner into a cozy nook.",
    "Natural light is your best friend — arrange seating to embrace it.",
  ],
  general: [
    "Trust your instincts! Design is deeply personal.",
    "Start with what you love, then build around it.",
    "Every room needs a focal point — what draws your eye first?",
  ],
}

// Co-regulation responses
const coRegulationResponses = [
  "I hear you. Design can feel overwhelming sometimes. Take a breath with me.",
  "It's okay to step back. What you've created is already beautiful.",
  "You're doing wonderfully. There's no 'right' way — only your way.",
  "Let's pause for a moment. What feels good about what you've made so far?",
]

const FREE_MESSAGE_LIMIT = 5

export default function VeraBubble({ 
  isPremium = false, 
  context = 'design',
  projectName,
  onUpgradeClick 
}: VeraBubbleProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [bubbleMessage, setBubbleMessage] = useState('')
  const [dailyMessageCount, setDailyMessageCount] = useState(0)
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Initialize with contextual message
  useEffect(() => {
    const msgs = contextualMessages[context] || contextualMessages.home
    setBubbleMessage(msgs[Math.floor(Math.random() * msgs.length)])
  }, [context])

  // Rotate bubble messages with fade animation
  useEffect(() => {
    if (isExpanded) return
    
    const interval = setInterval(() => {
      // Fade out the message (animation handles this)
      const msgs = contextualMessages[context] || contextualMessages.home
      
      // Schedule message change after fade out (800ms)
      setTimeout(() => {
        setBubbleMessage(msgs[Math.floor(Math.random() * msgs.length)])
      }, 800)
    }, 8000) // Every 8 seconds

    return () => clearInterval(interval)
  }, [context, isExpanded])

  // Load daily message count from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('vera_vds_messages')
    if (stored) {
      const data = JSON.parse(stored)
      const today = new Date().toDateString()
      if (data.date === today) {
        setDailyMessageCount(data.count)
      } else {
        // Reset for new day
        localStorage.setItem('vera_vds_messages', JSON.stringify({ date: today, count: 0 }))
        setDailyMessageCount(0)
      }
    }
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isExpanded])

  // Check if user can send message
  const canSendMessage = isPremium || dailyMessageCount < FREE_MESSAGE_LIMIT
  const remainingMessages = FREE_MESSAGE_LIMIT - dailyMessageCount

  // Generate VERA's response (fallback if API fails)
  const generateResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase()
    
    // Check for emotional/support keywords
    const emotionalKeywords = ['frustrated', 'can\'t', 'hate', 'wrong', 'bad', 'ugly', 'give up', 'stressed', 'anxious', 'overwhelmed']
    if (emotionalKeywords.some(kw => lowerMsg.includes(kw))) {
      return coRegulationResponses[Math.floor(Math.random() * coRegulationResponses.length)]
    }

    // Check for design topics
    if (lowerMsg.includes('color') || lowerMsg.includes('colour') || lowerMsg.includes('palette')) {
      return designAdvice.color[Math.floor(Math.random() * designAdvice.color.length)]
    }
    if (lowerMsg.includes('furniture') || lowerMsg.includes('sofa') || lowerMsg.includes('chair') || lowerMsg.includes('table')) {
      return designAdvice.furniture[Math.floor(Math.random() * designAdvice.furniture.length)]
    }
    if (lowerMsg.includes('light') || lowerMsg.includes('lamp') || lowerMsg.includes('bright') || lowerMsg.includes('dark')) {
      return designAdvice.lighting[Math.floor(Math.random() * designAdvice.lighting.length)]
    }

    // General response
    return designAdvice.general[Math.floor(Math.random() * designAdvice.general.length)]
  }

  // Handle sending message
  const handleSend = async () => {
    if (!inputValue.trim()) return
    
    if (!canSendMessage) {
      setShowUpgradePrompt(true)
      return
    }

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Update message count
    const newCount = dailyMessageCount + 1
    setDailyMessageCount(newCount)
    localStorage.setItem('vera_vds_messages', JSON.stringify({
      date: new Date().toDateString(),
      count: newCount,
    }))

    try {
      // Call VERA API with context and projectName
      const response = await fetch('/api/chat-vds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })).concat({
            role: 'user',
            content: userMessage.content,
          }),
          context,
          projectName, // Pass project name for immersive context
        }),
      })

      if (!response.ok) {
        throw new Error('VERA API failed')
      }

      const data = await response.json()
      
      const veraMessage: Message = {
        id: `msg-${Date.now()}-vera`,
        role: 'vera',
        content: data.content,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, veraMessage])
      setIsTyping(false)

      // Show upgrade prompt after hitting limit
      if (!isPremium && newCount >= FREE_MESSAGE_LIMIT) {
        setTimeout(() => setShowUpgradePrompt(true), 1000)
      }
    } catch (error) {
      console.error('VERA API Error:', error)
      
      // Fallback to local responses if API fails
      const fallbackResponse = generateResponse(userMessage.content)
      const veraMessage: Message = {
        id: `msg-${Date.now()}-vera`,
        role: 'vera',
        content: fallbackResponse,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, veraMessage])
      setIsTyping(false)
    }
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const bubbleUi = (
    <>
      <style jsx>{`
        /* ========================================
           VERA BUBBLE CONTAINER
           ======================================== */
        .vera-bubble-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9000;
          font-family: 'Outfit', system-ui, sans-serif;
        }

        /* Keep the bubble clear of bottom UI on these views */
        .vera-bubble-container[data-context='portfolio'],
        .vera-bubble-container[data-context='immersive'] {
          bottom: 120px;
        }

        /* ========================================
           COLLAPSED BUBBLE
           ======================================== */
        .vera-bubble-collapsed {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          cursor: pointer;
          animation: bubbleEnter 0.5s ease forwards;
        }

        @keyframes bubbleEnter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .vera-bubble-message {
          background: rgba(10, 10, 10, 0.95);
          border: 1px solid rgba(201, 169, 98, 0.3);
          border-radius: 16px 16px 4px 16px;
          padding: 12px 16px;
          max-width: 220px;
          color: #f8f6f1;
          font-size: 0.85rem;
          line-height: 1.5;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          animation: messageFadeInOut 8s ease-in-out infinite;
        }

        @keyframes messageFadeInOut {
          0% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          92% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 0; transform: translateY(-10px); }
        }

        .vera-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 30px rgba(138, 100, 200, 0.4);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          flex-shrink: 0;
          overflow: hidden;
        }

        .vera-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .vera-avatar:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 40px rgba(138, 100, 200, 0.6);
        }

        .vera-avatar-pulse {
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* ========================================
           EXPANDED CHAT
           ======================================== */
        .vera-chat-expanded {
          width: 340px;
          height: 480px;
          background: rgba(10, 10, 10, 0.98);
          border: 1px solid rgba(138, 100, 200, 0.2);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: expandChat 0.3s ease forwards;
        }

        @keyframes expandChat {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Chat Header */
        .vera-chat-header {
          padding: 16px;
          background: linear-gradient(180deg, rgba(138, 100, 200, 0.1), transparent);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .vera-chat-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .vera-avatar-small {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vera-avatar-small img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .vera-chat-info h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          color: #b8a9c9;
          font-weight: 400;
          margin: 0;
        }

        .vera-chat-info p {
          font-size: 0.55rem;
          color: rgba(248, 246, 241, 0.5);
          letter-spacing: 0.1em;
          margin: 0;
        }

        .vera-chat-close {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          background: transparent;
          color: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vera-chat-close:hover {
          border-color: #b8a9c9;
          color: #b8a9c9;
        }

        /* Messages Area */
        .vera-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .vera-chat-messages::-webkit-scrollbar {
          width: 4px;
        }

        .vera-chat-messages::-webkit-scrollbar-thumb {
          background: rgba(138, 100, 200, 0.3);
          border-radius: 2px;
        }

        .vera-message {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 0.85rem;
          line-height: 1.6;
          animation: messageIn 0.3s ease;
        }

        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .vera-message-user {
          align-self: flex-end;
          background: #b8a9c9;
          color: #0a0a0a;
          border-radius: 16px 16px 4px 16px;
        }

        .vera-message-vera {
          align-self: flex-start;
          background: rgba(255, 255, 255, 0.06);
          color: #f8f6f1;
          border-radius: 16px 16px 16px 4px;
        }

        .vera-typing {
          align-self: flex-start;
          background: rgba(255, 255, 255, 0.06);
          color: rgba(248, 246, 241, 0.5);
          border-radius: 16px;
          padding: 12px 16px;
          font-size: 0.85rem;
        }

        .vera-typing-dots {
          display: inline-flex;
          gap: 4px;
        }

        .vera-typing-dots span {
          width: 6px;
          height: 6px;
          background: #b8a9c9;
          border-radius: 50%;
          animation: typingBounce 1.4s ease-in-out infinite;
        }

        .vera-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .vera-typing-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }

        /* Welcome Message */
        .vera-welcome {
          text-align: center;
          padding: 20px;
          color: rgba(248, 246, 241, 0.7);
        }

        .vera-welcome-avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 16px;
        }

        .vera-welcome-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .vera-welcome h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: #f8f6f1;
          margin: 0 0 8px;
          font-weight: 400;
        }

        .vera-welcome p {
          font-size: 0.8rem;
          line-height: 1.6;
          margin: 0;
        }

        .vera-project-context {
          font-size: 0.7rem;
          color: #b8a9c9;
          margin-top: 12px;
          padding: 8px 12px;
          background: rgba(138, 100, 200, 0.1);
          border-radius: 8px;
        }

        /* Input Area */
        .vera-chat-input-area {
          padding: 12px 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(0, 0, 0, 0.3);
        }

        .vera-message-counter {
          font-size: 0.6rem;
          color: rgba(248, 246, 241, 0.4);
          text-align: center;
          margin-bottom: 8px;
        }

        .vera-message-counter span {
          color: #b8a9c9;
        }

        .vera-chat-input-row {
          display: flex;
          gap: 10px;
        }

        .vera-chat-input {
          flex: 1;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          color: #f8f6f1;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .vera-chat-input::placeholder {
          color: rgba(248, 246, 241, 0.3);
        }

        .vera-chat-input:focus {
          border-color: rgba(138, 100, 200, 0.5);
        }

        .vera-chat-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .vera-chat-send {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #b8a9c9, #8a64c8);
          border: none;
          color: #0a0a0a;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vera-chat-send:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 20px rgba(138, 100, 200, 0.4);
        }

        .vera-chat-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* Upgrade Prompt */
        .vera-upgrade-prompt {
          padding: 16px;
          background: linear-gradient(135deg, rgba(138, 100, 200, 0.15), rgba(138, 100, 200, 0.05));
          border-top: 1px solid rgba(138, 100, 200, 0.2);
          text-align: center;
        }

        .vera-upgrade-prompt p {
          font-size: 0.8rem;
          color: #f8f6f1;
          margin: 0 0 12px;
          line-height: 1.5;
        }

        .vera-upgrade-btn {
          width: 100%;
          padding: 12px 20px;
          background: linear-gradient(135deg, #b8a9c9, #8a64c8);
          border: none;
          border-radius: 100px;
          color: #0a0a0a;
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 8px;
        }

        .vera-upgrade-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(138, 100, 200, 0.4);
        }

        .vera-upgrade-dismiss {
          background: transparent;
          border: none;
          color: rgba(248, 246, 241, 0.5);
          font-size: 0.7rem;
          cursor: pointer;
          padding: 4px 8px;
        }

        .vera-upgrade-dismiss:hover {
          color: #f8f6f1;
        }

        /* Full VERA Link */
        .vera-full-link {
          display: block;
          padding: 12px;
          text-align: center;
          background: rgba(255, 255, 255, 0.02);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: rgba(248, 246, 241, 0.6);
          text-decoration: none;
          font-size: 0.7rem;
          transition: all 0.3s ease;
        }

        .vera-full-link:hover {
          background: rgba(138, 100, 200, 0.1);
          color: #b8a9c9;
        }

        .vera-full-link span {
          margin-left: 6px;
        }

        /* ========================================
           MOBILE RESPONSIVE
           ======================================== */
        @media (max-width: 768px) {
          .vera-bubble-container {
            bottom: 80px;
            right: 16px;
          }

          .vera-bubble-container[data-context='portfolio'],
          .vera-bubble-container[data-context='immersive'] {
            bottom: 140px;
          }

          .vera-bubble-message {
            max-width: 180px;
            font-size: 0.8rem;
            padding: 10px 14px;
          }

          .vera-avatar {
            width: 50px;
            height: 50px;
          }

          .vera-chat-expanded {
            position: fixed;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 70vh;
            border-radius: 20px 20px 0 0;
          }
        }
      `}</style>

      <div className="vera-bubble-container" data-context={context}>
        {!isExpanded ? (
          /* Collapsed Bubble */
          <div className="vera-bubble-collapsed" onClick={() => setIsExpanded(true)}>
            <div className="vera-bubble-message">
              {bubbleMessage}
            </div>
            <div className={`vera-avatar ${!isExpanded ? 'vera-avatar-pulse' : ''}`}>
              <img src="/vera-icon.png" alt="VERA" />
            </div>
          </div>
        ) : (
          /* Expanded Chat */
          <div className="vera-chat-expanded">
            {/* Header */}
            <div className="vera-chat-header">
              <div className="vera-chat-header-left">
                <div className="vera-avatar-small">
                  <img src="/vera-icon.png" alt="VERA" />
                </div>
                <div className="vera-chat-info">
                  <h3>VERA</h3>
                  <p>Design Companion</p>
                </div>
              </div>
              <button className="vera-chat-close" onClick={() => setIsExpanded(false)}>
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="vera-chat-messages">
              {messages.length === 0 ? (
                <div className="vera-welcome">
                  <div className="vera-welcome-avatar">
                    <img src="/vera-icon.png" alt="VERA" />
                  </div>
                  <h4>Hi, I&apos;m VERA!</h4>
                  <p>
                    I&apos;m here to help with your design journey. 
                    Ask me about colors, layouts, furniture — or just chat.
                  </p>
                  {projectName && (
                    <div className="vera-project-context">
                      Currently viewing: <strong>{projectName}</strong>
                    </div>
                  )}
                </div>
              ) : (
                messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`vera-message ${msg.role === 'user' ? 'vera-message-user' : 'vera-message-vera'}`}
                  >
                    {msg.content}
                  </div>
                ))
              )}

              {isTyping && (
                <div className="vera-typing">
                  <div className="vera-typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Upgrade Prompt */}
            {showUpgradePrompt && !isPremium && (
              <div className="vera-upgrade-prompt">
                <p>
                  I&apos;m loving our conversation!<br />
                  Upgrade for unlimited design advice.
                </p>
                <button className="vera-upgrade-btn" onClick={onUpgradeClick}>
                  Upgrade for $5/month
                </button>
                <button 
                  className="vera-upgrade-dismiss"
                  onClick={() => setShowUpgradePrompt(false)}
                >
                  Continue tomorrow
                </button>
              </div>
            )}

            {/* Input Area */}
            {(!showUpgradePrompt || isPremium) && (
              <div className="vera-chat-input-area">
                {!isPremium && (
                  <div className="vera-message-counter">
                    <span>{remainingMessages}</span> messages remaining today
                  </div>
                )}
                <div className="vera-chat-input-row">
                  <input
                    ref={inputRef}
                    type="text"
                    className="vera-chat-input"
                    placeholder={projectName ? `Ask about ${projectName}...` : "Ask me anything..."}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={!canSendMessage && !isPremium}
                  />
                  <button 
                    className="vera-chat-send"
                    onClick={handleSend}
                    disabled={!inputValue.trim() || (!canSendMessage && !isPremium)}
                  >
                    →
                  </button>
                </div>
              </div>
            )}

            {/* Link to Full VERA */}
            <Link href="/chat-exact" className="vera-full-link">
              Want deeper support? Talk to full VERA <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </>
  )

  if (!isMounted) return null
  return createPortal(bubbleUi, document.body)
}