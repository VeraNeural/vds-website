'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import VeraBubble from '@/components/vds/VeraBubble'

export default function VeraPage() {
  const [activeCapability, setActiveCapability] = useState(0)

  // Auto-rotate capabilities
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCapability(prev => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 }
    )

    const reveals = document.querySelectorAll('.vera-reveal')
    reveals.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const capabilities = [
    {
      title: 'Design Consultation',
      description: 'VERA analyzes your space, lifestyle, and aesthetic preferences to provide tailored design recommendations that align with your vision.',
    },
    {
      title: 'Style Discovery',
      description: 'Unsure of your style? VERA guides you through a curated exploration of design languages, helping you articulate what speaks to your soul.',
    },
    {
      title: 'Material & Palette Guidance',
      description: 'From marble selections to color harmonies, VERA offers expert insight into materials, textures, and palettes that elevate your space.',
    },
    {
      title: 'Project Navigation',
      description: 'VERA helps you explore our portfolio, discover relevant projects, and understand the design principles behind each space.',
    },
  ]

  const conversations = [
    {
      user: "I want my living room to feel warm but still modern. Where do I start?",
      vera: "The key lies in balancing clean lines with organic textures. Consider a neutral foundation—warm whites and soft taupes—layered with natural materials like oak, linen, and brushed brass. Shall I show you some examples from our residential portfolio?",
    },
    {
      user: "What makes a space feel luxurious without being ostentatious?",
      vera: "True luxury whispers rather than shouts. It's found in the quality of materials, the precision of proportions, and the thoughtfulness of every detail. A single statement piece in a room of quiet elegance speaks volumes. Our philosophy centers on this principle—restraint as the ultimate sophistication.",
    },
    {
      user: "I'm renovating my home office. How do I balance productivity with comfort?",
      vera: "The most inspiring workspaces honor both focus and ease. Natural light is paramount, followed by ergonomic considerations that don't compromise aesthetics. I'd recommend exploring our Zen Atelier approach—minimal visual noise, warm woods, and strategic greenery to maintain mental clarity.",
    },
  ]

  return (
    <div className="vera-page">
      <style jsx>{`
        /* ========================================
           VERA PAGE - ELEGANT & REFINED
           ======================================== */
        .vera-page {
          min-height: 100vh;
          padding-top: 100px;
        }

        /* ========================================
           HERO SECTION
           ======================================== */
        .vera-hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          position: relative;
        }

        .vera-hero-content {
          max-width: 900px;
          text-align: center;
        }

        .vera-hero-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 40px;
          opacity: 0;
          animation: veraFadeUp 1s ease forwards 0.3s;
        }

        .vera-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 300;
          line-height: 1;
          margin-bottom: 20px;
          opacity: 0;
          animation: veraFadeUp 1s ease forwards 0.5s;
        }

        .vera-hero-title span {
          display: block;
          font-style: italic;
          color: var(--vds-gold);
          font-size: 0.6em;
          margin-top: 10px;
        }

        .vera-hero-subtitle {
          font-size: 1.1rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(248, 246, 241, 0.7);
          max-width: 600px;
          margin: 0 auto 50px;
          opacity: 0;
          animation: veraFadeUp 1s ease forwards 0.7s;
        }

        .vera-hero-line {
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, var(--vds-gold), transparent);
          margin: 0 auto;
          opacity: 0;
          animation: veraFadeUp 1s ease forwards 0.9s;
        }

        @keyframes veraFadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ========================================
           PARTNERSHIP SECTION
           ======================================== */
        .vera-partnership {
          padding: 120px 40px;
          position: relative;
        }

        .vera-partnership-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }

        .vera-partnership-visual {
          position: relative;
          height: 500px;
        }

        .vera-partnership-circle {
          position: absolute;
          border: 1px solid rgba(201, 169, 98, 0.2);
          border-radius: 50%;
        }

        .vera-partnership-circle-1 {
          width: 400px;
          height: 400px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: circleFloat 8s ease-in-out infinite;
        }

        .vera-partnership-circle-2 {
          width: 300px;
          height: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: circleFloat 8s ease-in-out infinite reverse;
        }

        .vera-partnership-circle-3 {
          width: 200px;
          height: 200px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: circleFloat 6s ease-in-out infinite;
        }

        @keyframes circleFloat {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-50%, -50%) rotate(10deg); }
        }

        .vera-partnership-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .vera-partnership-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 300;
          color: var(--vds-gold);
          letter-spacing: 0.2em;
        }

        .vera-partnership-logo-sub {
          font-size: 0.6rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(248, 246, 241, 0.5);
          margin-top: 10px;
        }

        .vera-partnership-content {
          padding-right: 40px;
        }

        .vera-partnership-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 30px;
        }

        .vera-partnership-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 30px;
        }

        .vera-partnership-text {
          font-size: 1rem;
          font-weight: 300;
          line-height: 2;
          color: rgba(248, 246, 241, 0.7);
          margin-bottom: 20px;
        }

        @media (max-width: 900px) {
          .vera-partnership-inner {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .vera-partnership-visual {
            height: 300px;
          }

          .vera-partnership-content {
            padding-right: 0;
            text-align: center;
          }
        }

        /* ========================================
           CAPABILITIES SECTION
           ======================================== */
        .vera-capabilities {
          padding: 120px 40px;
          background: linear-gradient(to bottom, transparent, rgba(201, 169, 98, 0.03), transparent);
        }

        .vera-capabilities-inner {
          max-width: 1000px;
          margin: 0 auto;
        }

        .vera-capabilities-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .vera-capabilities-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 20px;
        }

        .vera-capabilities-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
        }

        .vera-capabilities-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .vera-capability {
          padding: 50px;
          border: 1px solid rgba(201, 169, 98, 0.15);
          border-radius: 20px;
          transition: all 0.5s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .vera-capability::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(201, 169, 98, 0.05) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .vera-capability:hover::before,
        .vera-capability.active::before {
          opacity: 1;
        }

        .vera-capability:hover,
        .vera-capability.active {
          border-color: rgba(201, 169, 98, 0.4);
          transform: translateY(-5px);
        }

        .vera-capability-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          color: var(--vds-gold);
          opacity: 0.3;
          margin-bottom: 20px;
          line-height: 1;
        }

        .vera-capability-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 15px;
          position: relative;
          z-index: 1;
        }

        .vera-capability-desc {
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.6);
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .vera-capabilities-grid {
            grid-template-columns: 1fr;
          }

          .vera-capability {
            padding: 35px;
          }
        }

        /* ========================================
           CONVERSATION SECTION
           ======================================== */
        .vera-conversation {
          padding: 120px 40px;
        }

        .vera-conversation-inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .vera-conversation-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .vera-conversation-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 20px;
        }

        .vera-conversation-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          margin-bottom: 20px;
        }

        .vera-conversation-subtitle {
          font-size: 1rem;
          font-weight: 300;
          color: rgba(248, 246, 241, 0.6);
        }

        .vera-conversation-list {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .vera-conversation-item {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .vera-conversation-user {
          align-self: flex-end;
          max-width: 70%;
          text-align: right;
        }

        .vera-conversation-user-label {
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(248, 246, 241, 0.4);
          margin-bottom: 10px;
        }

        .vera-conversation-user-text {
          font-size: 1.1rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(248, 246, 241, 0.9);
          font-style: italic;
        }

        .vera-conversation-vera {
          align-self: flex-start;
          max-width: 80%;
        }

        .vera-conversation-vera-label {
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 10px;
        }

        .vera-conversation-vera-text {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(248, 246, 241, 0.7);
          padding-left: 20px;
          border-left: 1px solid rgba(201, 169, 98, 0.3);
        }

        .vera-conversation-divider {
          width: 60px;
          height: 1px;
          background: rgba(201, 169, 98, 0.2);
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .vera-conversation-user,
          .vera-conversation-vera {
            max-width: 100%;
          }
        }

        /* ========================================
           PHILOSOPHY SECTION
           ======================================== */
        .vera-philosophy {
          padding: 120px 40px;
          background: linear-gradient(to bottom, transparent, rgba(201, 169, 98, 0.03), transparent);
        }

        .vera-philosophy-inner {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .vera-philosophy-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 300;
          line-height: 1.6;
          font-style: italic;
          color: var(--vds-pearl);
          margin-bottom: 40px;
          position: relative;
          padding: 0 40px;
        }

        .vera-philosophy-quote::before {
          content: '';
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 1px;
          background: var(--vds-gold);
        }

        .vera-philosophy-author {
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--vds-gold);
        }

        /* ========================================
           CTA SECTION
           ======================================== */
        .vera-cta {
          padding: 120px 40px;
          text-align: center;
        }

        .vera-cta-inner {
          max-width: 600px;
          margin: 0 auto;
        }

        .vera-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          margin-bottom: 20px;
        }

        .vera-cta-title span {
          color: var(--vds-gold);
          font-style: italic;
        }

        .vera-cta-text {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.6);
          margin-bottom: 50px;
        }

        .vera-cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .vera-cta-button {
          padding: 18px 40px;
          border: 1px solid var(--vds-gold);
          background: transparent;
          color: var(--vds-gold);
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .vera-cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: var(--vds-gold);
          transition: left 0.4s ease;
          z-index: -1;
        }

        .vera-cta-button:hover {
          color: var(--vds-noir);
        }

        .vera-cta-button:hover::before {
          left: 0;
        }

        .vera-cta-button-secondary {
          border-color: rgba(248, 246, 241, 0.3);
          color: var(--vds-pearl);
        }

        .vera-cta-button-secondary::before {
          background: var(--vds-pearl);
        }

        .vera-cta-button-secondary:hover {
          color: var(--vds-noir);
        }

        /* ========================================
           REVEAL ANIMATIONS
           ======================================== */
        .vera-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .vera-reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        /* ========================================
           RESPONSIVE
           ======================================== */
        @media (max-width: 768px) {
          .vera-hero {
            padding: 40px 24px;
          }

          .vera-partnership,
          .vera-capabilities,
          .vera-conversation,
          .vera-philosophy,
          .vera-cta {
            padding: 80px 24px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="vera-hero">
        <div className="vera-hero-content">
          <p className="vera-hero-eyebrow">Introducing</p>
          <h1 className="vera-hero-title">
            VERA
            <span>Your Design Companion</span>
          </h1>
          <p className="vera-hero-subtitle">
            An intelligent presence that understands the language of design. 
            VERA bridges the gap between vision and reality, guiding you through 
            every step of your design journey with expertise and intuition.
          </p>
          <div className="vera-hero-line" />
        </div>
      </section>

      {/* Partnership Section */}
      <section className="vera-partnership">
        <div className="vera-partnership-inner vera-reveal">
          <div className="vera-partnership-visual">
            <div className="vera-partnership-circle vera-partnership-circle-1" />
            <div className="vera-partnership-circle vera-partnership-circle-2" />
            <div className="vera-partnership-circle vera-partnership-circle-3" />
            <div className="vera-partnership-logo">
              <div className="vera-partnership-logo-text">VDS + VERA</div>
              <div className="vera-partnership-logo-sub">A Unified Vision</div>
            </div>
          </div>
          <div className="vera-partnership-content">
            <p className="vera-partnership-eyebrow">The Partnership</p>
            <h2 className="vera-partnership-title">
              Where Human Artistry Meets Intelligent Design
            </h2>
            <p className="vera-partnership-text">
              Vision Design Studio has always believed that exceptional spaces are born 
              from deep understanding—of materials, of light, of the people who inhabit them. 
              VERA is VDS's AI design companion, shaped by our team's design principles.
            </p>
            <p className="vera-partnership-text">
              She is not a replacement for human creativity, but an extension of it. 
              Drawing from two decades of Vision Design Studio's design excellence and a team of experts, 
              VERA offers instant access to the principles and perspectives that define our work.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="vera-capabilities">
        <div className="vera-capabilities-inner">
          <div className="vera-capabilities-header vera-reveal">
            <p className="vera-capabilities-eyebrow">How VERA Helps</p>
            <h2 className="vera-capabilities-title">Expertise at Your Fingertips</h2>
          </div>
          <div className="vera-capabilities-grid vera-reveal">
            {capabilities.map((cap, index) => (
              <div 
                key={index}
                className={`vera-capability ${activeCapability === index ? 'active' : ''}`}
                onClick={() => setActiveCapability(index)}
              >
                <div className="vera-capability-number">0{index + 1}</div>
                <h3 className="vera-capability-title">{cap.title}</h3>
                <p className="vera-capability-desc">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversation Section */}
      <section className="vera-conversation">
        <div className="vera-conversation-inner">
          <div className="vera-conversation-header vera-reveal">
            <p className="vera-conversation-eyebrow">The Experience</p>
            <h2 className="vera-conversation-title">Conversations That Inspire</h2>
            <p className="vera-conversation-subtitle">
              VERA speaks the language of design with clarity and depth
            </p>
          </div>
          <div className="vera-conversation-list vera-reveal">
            {conversations.map((conv, index) => (
              <div key={index}>
                <div className="vera-conversation-item">
                  <div className="vera-conversation-user">
                    <p className="vera-conversation-user-label">You</p>
                    <p className="vera-conversation-user-text">{conv.user}</p>
                  </div>
                  <div className="vera-conversation-vera">
                    <p className="vera-conversation-vera-label">VERA</p>
                    <p className="vera-conversation-vera-text">{conv.vera}</p>
                  </div>
                </div>
                {index < conversations.length - 1 && (
                  <div className="vera-conversation-divider" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="vera-philosophy">
        <div className="vera-philosophy-inner vera-reveal">
          <blockquote className="vera-philosophy-quote">
            Technology should enhance human intuition, not replace it. 
            VERA exists to make design wisdom accessible, 
            allowing everyone to speak the language of beautiful spaces.
          </blockquote>
          <p className="vera-philosophy-author">Vision Design Studio</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="vera-cta">
        <div className="vera-cta-inner vera-reveal">
          <h2 className="vera-cta-title">
            Begin Your Conversation with <span>VERA</span>
          </h2>
          <p className="vera-cta-text">
            Whether you're starting a new project or seeking inspiration, 
            VERA is ready to guide you toward spaces that truly resonate.
          </p>
          <div className="vera-cta-buttons">
            <Link href="/vds/portfolio" className="vera-cta-button">
              Explore Portfolio
            </Link>
            <Link href="/vds/visionary" className="vera-cta-button vera-cta-button-secondary">
              Begin Your Journey
            </Link>
          </div>
        </div>
      </section>

      <VeraBubble 
        isPremium={false}
        context="home"
        onUpgradeClick={() => window.location.href = '/pricing'}
      />
    </div>
  )
}