'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import VeraBubble from '@/components/vds/VeraBubble'

export default function ResidentialPage() {
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

    const reveals = document.querySelectorAll('.res-reveal')
    reveals.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      title: 'Living Spaces',
      description: 'Grand living rooms and intimate sitting areas designed for both entertaining and everyday comfort.',
    },
    {
      title: 'Kitchens',
      description: 'Culinary spaces that blend professional functionality with residential warmth and elegance.',
    },
    {
      title: 'Bedrooms & Suites',
      description: 'Private retreats crafted for rest, rejuvenation, and personal sanctuary.',
    },
    {
      title: 'Bathrooms & Spa',
      description: 'Wellness spaces that transform daily rituals into moments of luxury and tranquility.',
    },
  ]

  const principles = [
    {
      number: '01',
      title: 'Listen First',
      text: 'Every home begins with understanding how you live, what you love, and what you aspire to feel in your space.',
    },
    {
      number: '02',
      title: 'Timeless Over Trendy',
      text: 'We create spaces that transcend passing fashions, investing in quality and design that endures.',
    },
    {
      number: '03',
      title: 'Light as Material',
      text: 'Natural light is our most precious material. We design spaces that dance with the sun throughout the day.',
    },
  ]

  return (
    <div className="res-page">
      <style jsx>{`
        /* ========================================
           RESIDENTIAL PAGE
           ======================================== */
        .res-page {
          min-height: 100vh;
          padding-top: 100px;
        }

        /* ========================================
           HERO SECTION
           ======================================== */
        .res-hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          position: relative;
        }

        .res-hero-content {
          max-width: 900px;
          text-align: center;
        }

        .res-hero-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 40px;
          opacity: 0;
          animation: resFadeUp 1s ease forwards 0.3s;
        }

        .res-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 300;
          line-height: 1;
          margin-bottom: 20px;
          opacity: 0;
          animation: resFadeUp 1s ease forwards 0.5s;
        }

        .res-hero-title span {
          display: block;
          font-style: italic;
          color: var(--vds-gold);
          font-size: 0.6em;
          margin-top: 10px;
        }

        .res-hero-subtitle {
          font-size: 1.1rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(248, 246, 241, 0.7);
          max-width: 600px;
          margin: 0 auto 50px;
          opacity: 0;
          animation: resFadeUp 1s ease forwards 0.7s;
        }

        .res-hero-line {
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, var(--vds-gold), transparent);
          margin: 0 auto;
          opacity: 0;
          animation: resFadeUp 1s ease forwards 0.9s;
        }

        @keyframes resFadeUp {
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
        .res-philosophy {
          padding: 120px 40px;
          position: relative;
        }

        .res-philosophy-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }

        .res-philosophy-content {
          padding-right: 40px;
        }

        .res-philosophy-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 30px;
        }

        .res-philosophy-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 30px;
        }

        .res-philosophy-text {
          font-size: 1rem;
          font-weight: 300;
          line-height: 2;
          color: rgba(248, 246, 241, 0.7);
          margin-bottom: 20px;
        }

        .res-philosophy-visual {
          position: relative;
          height: 500px;
        }

        .res-philosophy-circle {
          position: absolute;
          border: 1px solid rgba(201, 169, 98, 0.2);
          border-radius: 50%;
        }

        .res-philosophy-circle-1 {
          width: 400px;
          height: 400px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: circleFloat 8s ease-in-out infinite;
        }

        .res-philosophy-circle-2 {
          width: 300px;
          height: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: circleFloat 8s ease-in-out infinite reverse;
        }

        .res-philosophy-circle-3 {
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

        .res-philosophy-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .res-philosophy-label-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 300;
          color: var(--vds-gold);
          letter-spacing: 0.1em;
        }

        .res-philosophy-label-sub {
          font-size: 0.6rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(248, 246, 241, 0.5);
          margin-top: 10px;
        }

        @media (max-width: 900px) {
          .res-philosophy-inner {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .res-philosophy-content {
            padding-right: 0;
            text-align: center;
          }

          .res-philosophy-visual {
            height: 300px;
          }
        }

        /* ========================================
           SERVICES SECTION
           ======================================== */
        .res-services {
          padding: 120px 40px;
          background: linear-gradient(to bottom, transparent, rgba(201, 169, 98, 0.03), transparent);
        }

        .res-services-inner {
          max-width: 1000px;
          margin: 0 auto;
        }

        .res-services-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .res-services-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 20px;
        }

        .res-services-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
        }

        .res-services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .res-service {
          padding: 50px;
          border: 1px solid rgba(201, 169, 98, 0.15);
          border-radius: 20px;
          transition: all 0.5s ease;
          position: relative;
          overflow: hidden;
        }

        .res-service::before {
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

        .res-service:hover::before {
          opacity: 1;
        }

        .res-service:hover {
          border-color: rgba(201, 169, 98, 0.4);
          transform: translateY(-5px);
        }

        .res-service-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 15px;
          position: relative;
          z-index: 1;
        }

        .res-service-desc {
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.6);
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .res-services-grid {
            grid-template-columns: 1fr;
          }

          .res-service {
            padding: 35px;
          }
        }

        /* ========================================
           PRINCIPLES SECTION
           ======================================== */
        .res-principles {
          padding: 120px 40px;
        }

        .res-principles-inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .res-principles-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .res-principles-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 20px;
        }

        .res-principles-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
        }

        .res-principles-list {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .res-principle {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 40px;
          align-items: start;
        }

        .res-principle-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          color: var(--vds-gold);
          opacity: 0.5;
          line-height: 1;
        }

        .res-principle-content {
          padding-top: 5px;
        }

        .res-principle-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 15px;
        }

        .res-principle-text {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(248, 246, 241, 0.6);
        }

        @media (max-width: 768px) {
          .res-principle {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .res-principle-number {
            font-size: 2rem;
          }
        }

        /* ========================================
           CTA SECTION
           ======================================== */
        .res-cta {
          padding: 120px 40px;
          text-align: center;
          background: linear-gradient(to bottom, transparent, rgba(201, 169, 98, 0.03), transparent);
        }

        .res-cta-inner {
          max-width: 600px;
          margin: 0 auto;
        }

        .res-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          margin-bottom: 20px;
        }

        .res-cta-title span {
          color: var(--vds-gold);
          font-style: italic;
        }

        .res-cta-text {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.6);
          margin-bottom: 50px;
        }

        .res-cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .res-cta-button {
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

        .res-cta-button::before {
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

        .res-cta-button:hover {
          color: var(--vds-noir);
        }

        .res-cta-button:hover::before {
          left: 0;
        }

        .res-cta-button-secondary {
          border-color: rgba(248, 246, 241, 0.3);
          color: var(--vds-pearl);
        }

        .res-cta-button-secondary::before {
          background: var(--vds-pearl);
        }

        .res-cta-button-secondary:hover {
          color: var(--vds-noir);
        }

        /* ========================================
           REVEAL ANIMATIONS
           ======================================== */
        .res-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .res-reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        /* ========================================
           RESPONSIVE
           ======================================== */
        @media (max-width: 768px) {
          .res-hero,
          .res-philosophy,
          .res-services,
          .res-principles,
          .res-cta {
            padding-left: 24px;
            padding-right: 24px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="res-hero">
        <div className="res-hero-content">
          <p className="res-hero-eyebrow">Interior Design</p>
          <h1 className="res-hero-title">
            Residential
            <span>Where Life Unfolds</span>
          </h1>
          <p className="res-hero-subtitle">
            Your home is more than walls and rooms. It's the backdrop to your life's most 
            meaningful moments. We design spaces that honor that responsibility with 
            beauty, comfort, and enduring quality.
          </p>
          <div className="res-hero-line" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="res-philosophy">
        <div className="res-philosophy-inner res-reveal">
          <div className="res-philosophy-content">
            <p className="res-philosophy-eyebrow">Our Approach</p>
            <h2 className="res-philosophy-title">
              Homes That Understand Their Inhabitants
            </h2>
            <p className="res-philosophy-text">
              Every family has its own rhythm. Children need space to explore, 
              couples need corners for quiet conversation, and everyone needs 
              a place that feels unmistakably theirs.
            </p>
            <p className="res-philosophy-text">
              We don't impose a style—we discover yours. Through careful listening 
              and thoughtful observation, we create homes that feel as though 
              they've always been waiting for you.
            </p>
          </div>
          <div className="res-philosophy-visual">
            <div className="res-philosophy-circle res-philosophy-circle-1" />
            <div className="res-philosophy-circle res-philosophy-circle-2" />
            <div className="res-philosophy-circle res-philosophy-circle-3" />
            <div className="res-philosophy-label">
              <div className="res-philosophy-label-text">24 Projects</div>
              <div className="res-philosophy-label-sub">In Our Collection</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="res-services">
        <div className="res-services-inner">
          <div className="res-services-header res-reveal">
            <p className="res-services-eyebrow">What We Create</p>
            <h2 className="res-services-title">Spaces for Every Moment</h2>
          </div>
          <div className="res-services-grid res-reveal">
            {services.map((service, index) => (
              <div key={index} className="res-service">
                <h3 className="res-service-title">{service.title}</h3>
                <p className="res-service-desc">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="res-principles">
        <div className="res-principles-inner">
          <div className="res-principles-header res-reveal">
            <p className="res-principles-eyebrow">Our Principles</p>
            <h2 className="res-principles-title">How We Work</h2>
          </div>
          <div className="res-principles-list res-reveal">
            {principles.map((principle, index) => (
              <div key={index} className="res-principle">
                <div className="res-principle-number">{principle.number}</div>
                <div className="res-principle-content">
                  <h3 className="res-principle-title">{principle.title}</h3>
                  <p className="res-principle-text">{principle.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="res-cta">
        <div className="res-cta-inner res-reveal">
          <h2 className="res-cta-title">
            Explore Our <span>Residential</span> Work
          </h2>
          <p className="res-cta-text">
            Discover 24 thoughtfully designed homes, from modern sanctuaries 
            to timeless traditional spaces. Each project tells a unique story.
          </p>
          <div className="res-cta-buttons">
            <Link href="/vds/portfolio/residential" className="res-cta-button">
              View Portfolio
            </Link>
            <Link href="/vds/visionary" className="res-cta-button res-cta-button-secondary">
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