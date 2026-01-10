'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import VeraBubble from '@/components/vds/VeraBubble'

export default function CommercialPage() {
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

    const reveals = document.querySelectorAll('.comm-reveal')
    reveals.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      title: 'Corporate Lobbies',
      description: 'First impressions that communicate brand values and welcome visitors with sophistication.',
    },
    {
      title: 'Executive Offices',
      description: 'Leadership spaces that balance prestige with productivity and personal comfort.',
    },
    {
      title: 'Hospitality',
      description: 'Hotels, restaurants, and venues designed to create memorable guest experiences.',
    },
    {
      title: 'Retail Environments',
      description: 'Shopping experiences that guide customers through thoughtfully curated journeys.',
    },
  ]

  const principles = [
    {
      number: '01',
      title: 'Brand Expression',
      text: 'Every commercial space should tell your story. We translate brand values into tangible design elements.',
    },
    {
      number: '02',
      title: 'Functional Excellence',
      text: 'Beauty must serve purpose. We design spaces that enhance workflow, productivity, and wellbeing.',
    },
    {
      number: '03',
      title: 'Lasting Impression',
      text: 'From the moment someone enters, every detail contributes to an experience they won\'t forget.',
    },
  ]

  return (
    <div className="comm-page">
      <style jsx>{`
        /* ========================================
           COMMERCIAL PAGE
           ======================================== */
        .comm-page {
          min-height: 100vh;
          padding-top: 100px;
        }

        /* ========================================
           HERO SECTION
           ======================================== */
        .comm-hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          position: relative;
        }

        .comm-hero-content {
          max-width: 900px;
          text-align: center;
        }

        .comm-hero-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 40px;
          opacity: 0;
          animation: commFadeUp 1s ease forwards 0.3s;
        }

        .comm-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 300;
          line-height: 1;
          margin-bottom: 20px;
          opacity: 0;
          animation: commFadeUp 1s ease forwards 0.5s;
        }

        .comm-hero-title span {
          display: block;
          font-style: italic;
          color: var(--vds-gold);
          font-size: 0.6em;
          margin-top: 10px;
        }

        .comm-hero-subtitle {
          font-size: 1.1rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(248, 246, 241, 0.7);
          max-width: 600px;
          margin: 0 auto 50px;
          opacity: 0;
          animation: commFadeUp 1s ease forwards 0.7s;
        }

        .comm-hero-line {
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, var(--vds-gold), transparent);
          margin: 0 auto;
          opacity: 0;
          animation: commFadeUp 1s ease forwards 0.9s;
        }

        @keyframes commFadeUp {
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
           PHILOSOPHY SECTION
           ======================================== */
        .comm-philosophy {
          padding: 120px 40px;
          position: relative;
        }

        .comm-philosophy-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }

        .comm-philosophy-visual {
          position: relative;
          height: 500px;
          order: -1;
        }

        .comm-philosophy-shape {
          position: absolute;
          border: 1px solid rgba(201, 169, 98, 0.2);
        }

        .comm-philosophy-shape-1 {
          width: 350px;
          height: 350px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: shapeRotate 20s linear infinite;
        }

        .comm-philosophy-shape-2 {
          width: 250px;
          height: 250px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          animation: shapeRotate 20s linear infinite reverse;
        }

        .comm-philosophy-shape-3 {
          width: 150px;
          height: 150px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: shapeRotate 15s linear infinite;
        }

        @keyframes shapeRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .comm-philosophy-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .comm-philosophy-label-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 300;
          color: var(--vds-gold);
          letter-spacing: 0.1em;
        }

        .comm-philosophy-label-sub {
          font-size: 0.6rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(248, 246, 241, 0.5);
          margin-top: 10px;
        }

        .comm-philosophy-content {
          padding-left: 40px;
        }

        .comm-philosophy-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 30px;
        }

        .comm-philosophy-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 30px;
        }

        .comm-philosophy-text {
          font-size: 1rem;
          font-weight: 300;
          line-height: 2;
          color: rgba(248, 246, 241, 0.7);
          margin-bottom: 20px;
        }

        @media (max-width: 900px) {
          .comm-philosophy-inner {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .comm-philosophy-visual {
            order: 0;
            height: 300px;
          }

          .comm-philosophy-content {
            padding-left: 0;
            text-align: center;
          }
        }

        /* ========================================
           SERVICES SECTION
           ======================================== */
        .comm-services {
          padding: 120px 40px;
          background: linear-gradient(to bottom, transparent, rgba(201, 169, 98, 0.03), transparent);
        }

        .comm-services-inner {
          max-width: 1000px;
          margin: 0 auto;
        }

        .comm-services-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .comm-services-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 20px;
        }

        .comm-services-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
        }

        .comm-services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .comm-service {
          padding: 50px;
          border: 1px solid rgba(201, 169, 98, 0.15);
          border-radius: 20px;
          transition: all 0.5s ease;
          position: relative;
          overflow: hidden;
        }

        .comm-service::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(156, 172, 156, 0.05) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .comm-service:hover::before {
          opacity: 1;
        }

        .comm-service:hover {
          border-color: rgba(201, 169, 98, 0.4);
          transform: translateY(-5px);
        }

        .comm-service-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 15px;
          position: relative;
          z-index: 1;
        }

        .comm-service-desc {
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.6);
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .comm-services-grid {
            grid-template-columns: 1fr;
          }

          .comm-service {
            padding: 35px;
          }
        }

        /* ========================================
           PRINCIPLES SECTION
           ======================================== */
        .comm-principles {
          padding: 120px 40px;
        }

        .comm-principles-inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .comm-principles-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .comm-principles-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 20px;
        }

        .comm-principles-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
        }

        .comm-principles-list {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .comm-principle {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 40px;
          align-items: start;
        }

        .comm-principle-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          color: var(--vds-gold);
          opacity: 0.5;
          line-height: 1;
        }

        .comm-principle-content {
          padding-top: 5px;
        }

        .comm-principle-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 15px;
        }

        .comm-principle-text {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(248, 246, 241, 0.6);
        }

        @media (max-width: 768px) {
          .comm-principle {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .comm-principle-number {
            font-size: 2rem;
          }
        }

        /* ========================================
           CTA SECTION
           ======================================== */
        .comm-cta {
          padding: 120px 40px;
          text-align: center;
          background: linear-gradient(to bottom, transparent, rgba(201, 169, 98, 0.03), transparent);
        }

        .comm-cta-inner {
          max-width: 600px;
          margin: 0 auto;
        }

        .comm-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          margin-bottom: 20px;
        }

        .comm-cta-title span {
          color: var(--vds-gold);
          font-style: italic;
        }

        .comm-cta-text {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.6);
          margin-bottom: 50px;
        }

        .comm-cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .comm-cta-button {
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

        .comm-cta-button::before {
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

        .comm-cta-button:hover {
          color: var(--vds-noir);
        }

        .comm-cta-button:hover::before {
          left: 0;
        }

        .comm-cta-button-secondary {
          border-color: rgba(248, 246, 241, 0.3);
          color: var(--vds-pearl);
        }

        .comm-cta-button-secondary::before {
          background: var(--vds-pearl);
        }

        .comm-cta-button-secondary:hover {
          color: var(--vds-noir);
        }

        /* ========================================
           REVEAL ANIMATIONS
           ======================================== */
        .comm-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .comm-reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        /* ========================================
           RESPONSIVE
           ======================================== */
        @media (max-width: 768px) {
          .comm-hero,
          .comm-philosophy,
          .comm-services,
          .comm-principles,
          .comm-cta {
            padding-left: 24px;
            padding-right: 24px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="comm-hero">
        <div className="comm-hero-content">
          <p className="comm-hero-eyebrow">Interior Design</p>
          <h1 className="comm-hero-title">
            Commercial
            <span>Spaces That Inspire Success</span>
          </h1>
          <p className="comm-hero-subtitle">
            In the commercial world, design is strategy. Every lobby, office, and venue 
            is an opportunity to communicate values, inspire teams, and create 
            experiences that drive business forward.
          </p>
          <div className="comm-hero-line" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="comm-philosophy">
        <div className="comm-philosophy-inner comm-reveal">
          <div className="comm-philosophy-visual">
            <div className="comm-philosophy-shape comm-philosophy-shape-1" />
            <div className="comm-philosophy-shape comm-philosophy-shape-2" />
            <div className="comm-philosophy-shape comm-philosophy-shape-3" />
            <div className="comm-philosophy-label">
              <div className="comm-philosophy-label-text">29 Projects</div>
              <div className="comm-philosophy-label-sub">In Our Collection</div>
            </div>
          </div>
          <div className="comm-philosophy-content">
            <p className="comm-philosophy-eyebrow">Our Approach</p>
            <h2 className="comm-philosophy-title">
              Where Business Meets Beauty
            </h2>
            <p className="comm-philosophy-text">
              Commercial design requires a unique balance. Spaces must be efficient 
              yet inspiring, branded yet welcoming, impressive yet comfortable.
            </p>
            <p className="comm-philosophy-text">
              We understand that every square foot has a purpose. Our designs 
              optimize for both human experience and business objectives, 
              creating environments where people and organizations thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="comm-services">
        <div className="comm-services-inner">
          <div className="comm-services-header comm-reveal">
            <p className="comm-services-eyebrow">What We Create</p>
            <h2 className="comm-services-title">Environments for Enterprise</h2>
          </div>
          <div className="comm-services-grid comm-reveal">
            {services.map((service, index) => (
              <div key={index} className="comm-service">
                <h3 className="comm-service-title">{service.title}</h3>
                <p className="comm-service-desc">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="comm-principles">
        <div className="comm-principles-inner">
          <div className="comm-principles-header comm-reveal">
            <p className="comm-principles-eyebrow">Our Principles</p>
            <h2 className="comm-principles-title">Design with Purpose</h2>
          </div>
          <div className="comm-principles-list comm-reveal">
            {principles.map((principle, index) => (
              <div key={index} className="comm-principle">
                <div className="comm-principle-number">{principle.number}</div>
                <div className="comm-principle-content">
                  <h3 className="comm-principle-title">{principle.title}</h3>
                  <p className="comm-principle-text">{principle.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="comm-cta">
        <div className="comm-cta-inner comm-reveal">
          <h2 className="comm-cta-title">
            Explore Our <span>Commercial</span> Work
          </h2>
          <p className="comm-cta-text">
            Discover 29 commercial projects spanning corporate offices, hospitality venues, 
            and retail environments. Each space designed to elevate business.
          </p>
          <div className="comm-cta-buttons">
            <Link href="/vds/portfolio/commercial" className="comm-cta-button">
              View Portfolio
            </Link>
            <Link href="/vds/visionary" className="comm-cta-button comm-cta-button-secondary">
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      <VeraBubble 
        isPremium={false}
        context="portfolio"
        onUpgradeClick={() => window.location.href = '/pricing'}
      />
    </div>
  )
}