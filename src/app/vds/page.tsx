'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import VeraBubble from '@/components/vds/VeraBubble'

export default function VDSHomePage() {
  const revealRefs = useRef<HTMLDivElement[]>([])

  // Scroll Reveal
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

    const reveals = document.querySelectorAll('.vds-reveal')
    reveals.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Horizontal scroll for gallery
  useEffect(() => {
    const gallery = document.querySelector('.vds-gallery-scroll')
    if (!gallery) return

    const handleWheel = (e: Event) => {
      const wheelEvent = e as WheelEvent
      if (Math.abs(wheelEvent.deltaY) > Math.abs(wheelEvent.deltaX)) {
        e.preventDefault()
        gallery.scrollLeft += wheelEvent.deltaY
      }
    }

    gallery.addEventListener('wheel', handleWheel, { passive: false })
    return () => gallery.removeEventListener('wheel', handleWheel)
  }, [])

  const cards = [
    {
      href: '/vds/residential',
      gradient: 'linear-gradient(135deg, rgba(201,169,98,0.4) 0%, rgba(212,165,165,0.2) 50%, rgba(26,24,21,1) 100%)',
      number: '01',
      category: 'Interior • Living',
      name: 'Residential',
      desc: 'Bespoke living spaces where luxury meets comfort. From modern sanctuaries to timeless elegance, each home tells a unique story.',
      tags: ['Living Rooms', 'Kitchens', 'Bathrooms'],
    },
    {
      href: '/vds/commercial',
      gradient: 'linear-gradient(135deg, rgba(156,172,156,0.4) 0%, rgba(232,213,163,0.2) 50%, rgba(21,26,21,1) 100%)',
      number: '02',
      category: 'Interior • Business',
      name: 'Commercial',
      desc: 'Spaces that inspire success. Corporate lobbies, executive offices, and hospitality venues designed to leave lasting impressions.',
      tags: ['Lobbies', 'Offices', 'Hospitality'],
    },
    {
      href: '/vds/outdoor',
      gradient: 'linear-gradient(135deg, rgba(123,163,179,0.4) 0%, rgba(184,169,201,0.2) 50%, rgba(21,24,26,1) 100%)',
      number: '03',
      category: 'Landscape • Exterior',
      name: 'Outdoor Living',
      desc: 'Where architecture meets nature. Stunning outdoor retreats, poolside paradises, and garden sanctuaries that extend your living space.',
      tags: ['Pool Areas', 'Gardens', 'Patios'],
    },
    {
      href: '/vds/vera',
      gradient: 'linear-gradient(135deg, rgba(184,169,201,0.4) 0%, rgba(201,169,98,0.2) 50%, rgba(26,21,26,1) 100%)',
      number: '04',
      category: 'Experience • Innovation',
      name: 'Meet VERA',
      desc: 'Your AI design companion. Experience the future of interior design with intelligent guidance and personalized recommendations.',
      tags: ['AI Assistant', 'Design Help', 'Interactive'],
    },
  ]

  return (
    <div className="vds-home">
      <style jsx global>{`
        /* ========================================
           PORTFOLIO GALLERY - BULLETPROOF STYLES
           ======================================== */
        .vds-gallery-scroll {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          gap: 40px !important;
          padding: 0 50px 40px !important;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          scroll-snap-type: x mandatory !important;
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
          -webkit-overflow-scrolling: touch !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }

        .vds-gallery-scroll::-webkit-scrollbar {
          display: none !important;
        }

        .vds-space-card {
          flex: 0 0 500px !important;
          width: 500px !important;
          min-width: 500px !important;
          max-width: 500px !important;
          height: auto !important;
          scroll-snap-align: center !important;
          position: relative !important;
          text-decoration: none !important;
          color: inherit !important;
          display: block !important;
        }

        .vds-space-inner {
          position: relative !important;
          width: 100% !important;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
          transform-style: preserve-3d !important;
        }

        .vds-space-card:hover .vds-space-inner {
          transform: rotateY(5deg) rotateX(2deg) scale(1.02) !important;
        }

        .vds-space-visual {
          width: 100% !important;
          height: 600px !important;
          min-height: 600px !important;
          border-radius: 20px !important;
          overflow: hidden !important;
          position: relative !important;
        }

        .vds-space-gradient {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          transition: transform 0.6s ease !important;
        }

        .vds-space-card:hover .vds-space-gradient {
          transform: scale(1.1) !important;
        }

        .vds-space-number {
          position: absolute !important;
          top: 30px !important;
          left: 30px !important;
          font-family: 'Cormorant Garamond', serif !important;
          font-size: 4rem !important;
          font-weight: 300 !important;
          color: var(--vds-gold, #C9A962) !important;
          opacity: 0.5 !important;
          z-index: 2 !important;
        }

        .vds-space-arrow {
          position: absolute !important;
          top: 30px !important;
          right: 30px !important;
          width: 50px !important;
          height: 50px !important;
          border: 1px solid rgba(201, 169, 98, 0.3) !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: var(--vds-gold, #C9A962) !important;
          font-size: 1.2rem !important;
          opacity: 0 !important;
          transform: translateX(-10px) !important;
          transition: all 0.4s ease !important;
          z-index: 2 !important;
        }

        .vds-space-card:hover .vds-space-arrow {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        .vds-space-content {
          position: absolute !important;
          bottom: 0 !important;
          left: 0 !important;
          right: 0 !important;
          padding: 40px !important;
          background: linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, transparent 100%) !important;
          z-index: 2 !important;
        }

        .vds-space-category {
          font-size: 0.65rem !important;
          letter-spacing: 0.4em !important;
          text-transform: uppercase !important;
          color: var(--vds-gold, #C9A962) !important;
          margin-bottom: 15px !important;
        }

        .vds-space-name {
          font-family: 'Cormorant Garamond', serif !important;
          font-size: 2rem !important;
          font-weight: 300 !important;
          margin-bottom: 15px !important;
          color: var(--vds-pearl, #F8F6F1) !important;
        }

        .vds-space-desc {
          font-size: 0.9rem !important;
          font-weight: 200 !important;
          line-height: 1.7 !important;
          color: rgba(248, 246, 241, 0.7) !important;
          margin-bottom: 25px !important;
        }

        .vds-space-tags {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 10px !important;
        }

        .vds-space-tag {
          padding: 8px 16px !important;
          border: 1px solid rgba(201, 169, 98, 0.3) !important;
          border-radius: 100px !important;
          font-size: 0.65rem !important;
          letter-spacing: 0.15em !important;
          text-transform: uppercase !important;
          color: rgba(201, 169, 98, 0.9) !important;
          transition: all 0.3s ease !important;
          background: transparent !important;
        }

        .vds-space-card:hover .vds-space-tag {
          background: rgba(201, 169, 98, 0.1) !important;
          border-color: rgba(201, 169, 98, 0.5) !important;
        }

        @media (max-width: 600px) {
          .vds-space-card {
            flex: 0 0 85vw !important;
            width: 85vw !important;
            min-width: 85vw !important;
            max-width: 85vw !important;
          }

          .vds-space-visual {
            height: 500px !important;
            min-height: 500px !important;
          }

          .vds-gallery-scroll {
            padding: 0 24px 40px !important;
            gap: 20px !important;
          }
        }

        /* Mobile: Stack cards vertically */
        @media (max-width: 768px) {
          .vds-gallery-scroll {
            flex-direction: column !important;
            overflow-x: hidden !important;
            overflow-y: visible !important;
            align-items: center !important;
            padding: 0 20px 40px !important;
            gap: 30px !important;
          }

          .vds-space-card {
            flex: 0 0 auto !important;
            width: 100% !important;
            min-width: 100% !important;
            max-width: 400px !important;
            scroll-snap-align: none !important;
          }

          .vds-space-visual {
            height: 450px !important;
            min-height: 450px !important;
          }

          .vds-space-number {
            font-size: 3rem !important;
            top: 20px !important;
            left: 20px !important;
          }

          .vds-space-arrow {
            top: 20px !important;
            right: 20px !important;
            width: 40px !important;
            height: 40px !important;
            opacity: 1 !important;
            transform: translateX(0) !important;
          }

          .vds-space-content {
            padding: 30px !important;
          }

          .vds-space-name {
            font-size: 1.6rem !important;
          }

          .vds-space-desc {
            font-size: 0.85rem !important;
            line-height: 1.6 !important;
          }

          .vds-space-tags {
            gap: 8px !important;
          }

          .vds-space-tag {
            padding: 6px 12px !important;
            font-size: 0.6rem !important;
          }
        }
      `}</style>

      <style jsx>{`
        /* ========================================
           HERO SECTION
           ======================================== */
        .vds-hero {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 0 24px;
        }

        .vds-hero-content {
          text-align: center;
          z-index: 10;
          max-width: 800px;
        }

        .vds-hero-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 30px;
          opacity: 0;
          animation: vdsFadeSlideUp 1s ease forwards 0.5s;
        }

        .vds-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 12vw, 9rem);
          font-weight: 300;
          line-height: 0.9;
          margin-bottom: 20px;
          opacity: 0;
          animation: vdsFadeSlideUp 1.2s ease forwards 0.7s;
        }

        .vds-hero-title span {
          display: block;
          font-style: italic;
          color: var(--vds-gold);
        }

        .vds-hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.3rem);
          font-weight: 200;
          letter-spacing: 0.1em;
          max-width: 500px;
          margin: 0 auto 50px;
          opacity: 0;
          animation: vdsFadeSlideUp 1s ease forwards 1s;
          color: rgba(248, 246, 241, 0.7);
          line-height: 1.8;
        }

        .vds-scroll-indicator {
          position: absolute;
          bottom: 50px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0;
          animation: vdsFadeSlideUp 1s ease forwards 1.5s;
        }

        .vds-scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, var(--vds-gold), transparent);
          animation: vdsScrollPulse 2s ease infinite;
        }

        .vds-scroll-text {
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--vds-gold);
        }

        /* ========================================
           MANIFESTO SECTION
           ======================================== */
        .vds-manifesto {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 24px;
          position: relative;
        }

        .vds-manifesto-content {
          max-width: 900px;
          text-align: center;
        }

        .vds-manifesto-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.5rem, 4vw, 3rem);
          font-weight: 300;
          line-height: 1.6;
          font-style: italic;
          color: var(--vds-pearl);
          position: relative;
          padding: 0 40px;
        }

        .vds-manifesto-quote::before,
        .vds-manifesto-quote::after {
          content: '"';
          font-size: 5rem;
          color: var(--vds-gold);
          opacity: 0.3;
          position: absolute;
          font-family: 'Cormorant Garamond', serif;
        }

        .vds-manifesto-quote::before {
          top: -30px;
          left: 0;
        }

        .vds-manifesto-quote::after {
          bottom: -60px;
          right: 0;
        }

        .vds-manifesto-author {
          margin-top: 50px;
          font-size: 0.8rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--vds-gold);
        }

        /* ========================================
           PORTFOLIO SECTION
           ======================================== */
        .vds-portfolio {
          min-height: 100vh;
          min-height: 100dvh;
          padding: 100px 0;
          position: relative;
        }

        .vds-portfolio-header {
          text-align: center;
          margin-bottom: 80px;
          padding: 0 24px;
        }

        .vds-portfolio-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 20px;
        }

        .vds-portfolio-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 300;
        }

        /* ========================================
           PHILOSOPHY SECTION
           ======================================== */
        .vds-philosophy {
          min-height: 100vh;
          min-height: 100dvh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
        }

        .vds-philosophy-visual {
          position: relative;
          overflow: hidden;
        }

        .vds-philosophy-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(ellipse at 30% 30%, rgba(201, 169, 98, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(156, 172, 156, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #141414 100%);
        }

        .vds-philosophy-blueprints {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
        }

        .vds-blueprint {
          position: absolute;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(201, 169, 98, 0.2);
          transition: all 0.5s ease;
        }

        .vds-blueprint img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.85;
          transition: all 0.5s ease;
        }

        .vds-blueprint:hover {
          border-color: rgba(201, 169, 98, 0.5);
          z-index: 10;
        }

        .vds-blueprint:hover img {
          opacity: 1;
          transform: scale(1.05);
        }

        .vds-blueprint-1 {
          width: 420px;
          height: 320px;
          top: 5%;
          left: 5%;
          animation: blueprintFloat1 8s ease-in-out infinite;
        }

        .vds-blueprint-2 {
          width: 400px;
          height: 400px;
          top: 25%;
          left: 42%;
          animation: blueprintFloat2 10s ease-in-out infinite;
          animation-delay: -2s;
        }

        .vds-blueprint-3 {
          width: 440px;
          height: 300px;
          top: 55%;
          left: 10%;
          animation: blueprintFloat3 9s ease-in-out infinite;
          animation-delay: -4s;
        }

        @keyframes blueprintFloat1 {
          0%, 100% {
            transform: translate(0, 0) rotate(-3deg);
          }
          50% {
            transform: translate(15px, -20px) rotate(2deg);
          }
        }

        @keyframes blueprintFloat2 {
          0%, 100% {
            transform: translate(0, 0) rotate(2deg);
          }
          50% {
            transform: translate(-10px, 15px) rotate(-2deg);
          }
        }

        @keyframes blueprintFloat3 {
          0%, 100% {
            transform: translate(0, 0) rotate(1deg);
          }
          50% {
            transform: translate(20px, -10px) rotate(-3deg);
          }
        }

        .vds-blueprint-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(201, 169, 98, 0.1) 0%, transparent 100%);
          pointer-events: none;
        }

        .vds-philosophy-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px;
        }

        .vds-philosophy-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 30px;
        }

        .vds-philosophy-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 40px;
        }

        .vds-philosophy-text {
          font-size: 1rem;
          font-weight: 200;
          line-height: 2;
          color: rgba(248, 246, 241, 0.7);
          margin-bottom: 50px;
        }

        .vds-philosophy-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .vds-stat {
          text-align: center;
        }

        .vds-stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          color: var(--vds-gold);
          line-height: 1;
        }

        .vds-stat-label {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(248, 246, 241, 0.5);
          margin-top: 10px;
        }

        @media (max-width: 900px) {
          .vds-philosophy {
            grid-template-columns: 1fr;
          }

          .vds-philosophy-visual {
            min-height: 300px;
          }

          .vds-philosophy-content {
            padding: 50px 24px;
          }

          .vds-philosophy-stats {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        /* ========================================
           TESTIMONIALS SECTION
           ======================================== */
        .vds-testimonials {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 100px 24px;
          position: relative;
        }

        .vds-testimonials-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .vds-testimonials-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
        }

        .vds-testimonials-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 60px;
          max-width: 900px;
          width: 100%;
        }

        .vds-testimonial {
          text-align: center;
          padding: 20px;
        }

        .vds-testimonial-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 400;
          margin-bottom: 15px;
          color: var(--vds-gold);
        }

        .vds-testimonial-text {
          font-size: 1rem;
          font-weight: 200;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.8);
          font-style: italic;
        }

        @media (max-width: 768px) {
          .vds-testimonials-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* ========================================
           CTA SECTION
           ======================================== */
        .vds-cta {
          min-height: 50vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 100px 24px;
          position: relative;
          background: linear-gradient(to top, rgba(201, 169, 98, 0.05) 0%, transparent 100%);
        }

        .vds-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 300;
          margin-bottom: 15px;
        }

        .vds-cta-title span {
          color: var(--vds-gold);
          font-style: italic;
        }

        .vds-cta-subtitle {
          font-size: 0.8rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(248, 246, 241, 0.5);
          margin-bottom: 50px;
        }

        .vds-cta-button {
          padding: 20px 50px;
          border: 1px solid var(--vds-gold);
          background: transparent;
          color: var(--vds-gold);
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: inline-block;
          min-height: 44px;
        }

        .vds-cta-button::before {
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

        .vds-cta-button:hover {
          color: var(--vds-noir);
        }

        .vds-cta-button:hover::before {
          left: 0;
        }
      `}</style>

      {/* Hero Section */}
      <section className="vds-hero">
        <div className="vds-hero-content">
          <p className="vds-hero-eyebrow">Luxury Design Excellence</p>
          <h1 className="vds-hero-title">
            Vision
            <span>Design Studio</span>
          </h1>
          <p className="vds-hero-subtitle">
            Architecture, interior design, and landscape unified into spaces that elevate life and inspire the soul.
          </p>
        </div>
        <div className="vds-scroll-indicator">
          <div className="vds-scroll-line"></div>
          <span className="vds-scroll-text">Explore</span>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="vds-manifesto">
        <div className="vds-manifesto-content vds-reveal">
          <blockquote className="vds-manifesto-quote">
            Design is not just what it looks like and feels like. Design is how it works — and how it makes you feel alive.
          </blockquote>
          <p className="vds-manifesto-author">— Vision Design Studio</p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="vds-portfolio" id="portfolio">
        <div className="vds-portfolio-header vds-reveal">
          <p className="vds-portfolio-eyebrow">The Collection</p>
          <h2 className="vds-portfolio-title">Visionary Spaces</h2>
        </div>

        <div className="vds-gallery-scroll">
          {cards.map((card, index) => (
            <Link key={index} href={card.href} className="vds-space-card">
              <div className="vds-space-inner">
                <div className="vds-space-visual">
                  <div 
                    className="vds-space-gradient" 
                    style={{ background: card.gradient }}
                  />
                  <span className="vds-space-number">{card.number}</span>
                  <span className="vds-space-arrow">→</span>
                  <div className="vds-space-content">
                    <p className="vds-space-category">{card.category}</p>
                    <h3 className="vds-space-name">{card.name}</h3>
                    <p className="vds-space-desc">{card.desc}</p>
                    <div className="vds-space-tags">
                      {card.tags.map((tag, i) => (
                        <span key={i} className="vds-space-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="vds-philosophy" id="philosophy">
        <div className="vds-philosophy-visual">
          <div className="vds-philosophy-bg"></div>
          <div className="vds-philosophy-blueprints">
            <div className="vds-blueprint vds-blueprint-1">
              <img src="/blueprints/blueprint-1.webp" alt="Architectural Blueprint" />
              <div className="vds-blueprint-overlay"></div>
            </div>
            <div className="vds-blueprint vds-blueprint-2">
              <img src="/blueprints/blueprint-2.webp" alt="Floor Plan Design" />
              <div className="vds-blueprint-overlay"></div>
            </div>
            <div className="vds-blueprint vds-blueprint-3">
              <img src="/blueprints/blueprint-3.webp" alt="Space Planning" />
              <div className="vds-blueprint-overlay"></div>
            </div>
          </div>
        </div>
        <div className="vds-philosophy-content">
          <p className="vds-philosophy-eyebrow vds-reveal">Our Approach</p>
          <h2 className="vds-philosophy-title vds-reveal">Design that speaks to the soul</h2>
          <p className="vds-philosophy-text vds-reveal">
            Every space tells a story. We believe in creating environments that don't just house life—they elevate it. 
            Through careful curation of light, texture, and form, we craft spaces that resonate with their inhabitants 
            on a profound, emotional level.
          </p>
          <div className="vds-philosophy-stats vds-reveal">
            <div className="vds-stat">
              <div className="vds-stat-number">20+</div>
              <div className="vds-stat-label">Years Experience</div>
            </div>
            <div className="vds-stat">
              <div className="vds-stat-number">150+</div>
              <div className="vds-stat-label">Projects Completed</div>
            </div>
            <div className="vds-stat">
              <div className="vds-stat-number">1</div>
              <div className="vds-stat-label">Vision</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="vds-testimonials" id="testimonials">
        <div className="vds-testimonials-header vds-reveal">
          <h2 className="vds-testimonials-title">Client Stories</h2>
        </div>
        <div className="vds-testimonials-grid vds-reveal">
          <div className="vds-testimonial">
            <h3 className="vds-testimonial-name">Aya Nakamura</h3>
            <p className="vds-testimonial-text">
              "Vision Design Studio transformed our space into a timeless sanctuary. 
              Every detail reflects thoughtfulness and artistry."
            </p>
          </div>
          <div className="vds-testimonial">
            <h3 className="vds-testimonial-name">Mateo García</h3>
            <p className="vds-testimonial-text">
              "The team combined luxury with thoughtful detail, exceeding our expectations 
              at every turn. Truly visionary work."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="vds-cta">
        <h2 className="vds-cta-title">
          Crafted with devotion by <span>Vision Design Studio</span> and our team of experts
        </h2>
        <p className="vds-cta-subtitle">Beautiful spaces for beautiful minds</p>
        <Link href="/vds/visionary" className="vds-cta-button">
          Begin Your Journey
        </Link>
      </section>
      
      <VeraBubble 
        isPremium={false}
        context="home"
        onUpgradeClick={() => window.location.href = '/pricing'}
      />
    </div>
  )
}