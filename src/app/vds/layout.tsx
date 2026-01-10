'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function VDSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Check if we're on an immersive project page (has a slug after /portfolio/)
  const isImmersivePage = pathname.startsWith('/vds/portfolio/') && 
    !pathname.endsWith('/portfolio') &&
    !pathname.endsWith('/portfolio/') &&
    !pathname.endsWith('/residential') &&
    !pathname.endsWith('/commercial') &&
    !pathname.endsWith('/outdoor-living')

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Custom Cursor
  useEffect(() => {
    if (isMobile || isImmersivePage) return
    
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 10 + 'px'
      cursor.style.top = e.clientY - 10 + 'px'
      cursorDot.style.left = e.clientX - 2 + 'px'
      cursorDot.style.top = e.clientY - 2 + 'px'
    }

    const addHover = () => cursor.classList.add('hover')
    const removeHover = () => cursor.classList.remove('hover')

    document.addEventListener('mousemove', moveCursor)
    
    const interactiveElements = document.querySelectorAll('a, button, .vds-interactive')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [isMobile, pathname, isImmersivePage])

  // Particle System - disable on immersive pages
  useEffect(() => {
    if (isImmersivePage) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let canvasWidth = window.innerWidth
    let canvasHeight = window.innerHeight

    const resizeCanvas = () => {
      canvasWidth = window.innerWidth
      canvasHeight = window.innerHeight
      canvas.width = canvasWidth
      canvas.height = canvasHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const createParticle = () => {
      return {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        reset() {
          this.x = Math.random() * canvasWidth
          this.y = Math.random() * canvasHeight
        },
        update() {
          this.x += this.speedX
          this.y += this.speedY
          if (this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight) {
            this.reset()
          }
        },
        draw() {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(201, 169, 98, ${this.opacity})`
          ctx.fill()
        }
      }
    }

    const particles = Array.from({ length: 50 }, () => createParticle())

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [isImmersivePage])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // If on immersive page, render minimal layout (just children)
  if (isImmersivePage) {
    return (
      <div className="vds-root vds-immersive">
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Outfit:wght@200;300;400;500&display=swap');
          
          .vds-root.vds-immersive {
            --vds-gold: #c9a962;
            --vds-gold-light: #e8d5a3;
            --vds-noir: #0a0a0a;
            --vds-pearl: #f8f6f1;
            --vds-sage: #9cac9c;
            --vds-terracotta: #c4a484;
            --vds-rose: #d4a5a5;
            --vds-ocean: #7ba3b3;
            --vds-lavender: #b8a9c9;
            
            font-family: 'Outfit', sans-serif;
            background: var(--vds-noir);
            color: var(--vds-pearl);
            min-height: 100vh;
            min-height: 100dvh;
            overflow: hidden;
          }
          
          .vds-root.vds-immersive * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
        `}</style>
        {children}
      </div>
    )
  }

  return (
    <div className="vds-root">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Outfit:wght@200;300;400;500&display=swap');
        
        /* ========================================
           VDS ROOT & VARIABLES
           ======================================== */
        .vds-root {
          --vds-gold: #c9a962;
          --vds-gold-light: #e8d5a3;
          --vds-noir: #0a0a0a;
          --vds-pearl: #f8f6f1;
          --vds-sage: #9cac9c;
          --vds-terracotta: #c4a484;
          --vds-rose: #d4a5a5;
          --vds-ocean: #7ba3b3;
          --vds-lavender: #b8a9c9;
          
          font-family: 'Outfit', sans-serif;
          background: var(--vds-noir);
          color: var(--vds-pearl);
          min-height: 100vh;
          min-height: 100dvh;
          overflow-x: hidden;
          cursor: none;
        }
        
        .vds-root * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* ========================================
           CUSTOM CURSOR
           ======================================== */
        .vds-cursor {
          width: 20px;
          height: 20px;
          border: 1px solid var(--vds-gold);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 10000;
          transition: transform 0.15s ease, background 0.3s ease;
          mix-blend-mode: difference;
        }

        .vds-cursor.hover {
          transform: scale(3);
          background: rgba(201, 169, 98, 0.1);
        }

        .vds-cursor-dot {
          width: 4px;
          height: 4px;
          background: var(--vds-gold);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 10001;
        }

        @media (max-width: 768px) {
          .vds-root {
            cursor: auto;
          }
          .vds-cursor,
          .vds-cursor-dot {
            display: none;
          }
        }

        /* ========================================
           PARTICLE CANVAS
           ======================================== */
        .vds-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        /* ========================================
           NOISE OVERLAY
           ======================================== */
        .vds-noise {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        /* ========================================
           NAVIGATION
           ======================================== */
        .vds-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 20px 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(201, 169, 98, 0.1);
        }

        .vds-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          min-height: 44px;
        }

        .vds-logo-img {
          height: 70px;
          width: auto;
          transition: all 0.3s ease;
        }

        .vds-logo:hover .vds-logo-img {
          transform: scale(1.05);
          filter: brightness(1.2);
        }

        .vds-nav-links {
          display: flex;
          gap: 40px;
          align-items: center;
        }

        .vds-nav-link {
          color: var(--vds-pearl);
          text-decoration: none;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          position: relative;
          font-weight: 300;
          min-height: 44px;
          display: flex;
          align-items: center;
          padding: 10px 0;
        }

        .vds-nav-link::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--vds-gold);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .vds-nav-link:hover::after {
          width: 100%;
        }

        .vds-nav-cta {
          padding: 16px 32px;
          border: 1px solid var(--vds-gold);
          background: transparent;
          color: var(--vds-gold);
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: none;
          transition: all 0.4s ease;
          min-height: 44px;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .vds-nav-cta::before {
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

        .vds-nav-cta:hover {
          color: var(--vds-noir);
        }

        .vds-nav-cta:hover::before {
          left: 0;
        }

        /* ========================================
           MOBILE MENU
           ======================================== */
        .vds-mobile-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          padding: 10px;
          min-width: 44px;
          min-height: 44px;
          background: transparent;
          border: none;
        }

        .vds-mobile-toggle span {
          width: 24px;
          height: 1px;
          background: var(--vds-pearl);
          transition: all 0.3s ease;
          display: block;
        }

        .vds-mobile-toggle.open span:nth-child(1) {
          transform: rotate(45deg) translate(4px, 4px);
        }

        .vds-mobile-toggle.open span:nth-child(2) {
          opacity: 0;
        }

        .vds-mobile-toggle.open span:nth-child(3) {
          transform: rotate(-45deg) translate(4px, -4px);
        }

        .vds-mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          background: var(--vds-noir);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 30px;
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s ease;
        }

        .vds-mobile-menu.open {
          opacity: 1;
          visibility: visible;
        }

        .vds-mobile-menu a {
          color: var(--vds-pearl);
          text-decoration: none;
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          transition: color 0.3s ease;
          min-height: 44px;
          display: flex;
          align-items: center;
        }

        .vds-mobile-menu a:hover {
          color: var(--vds-gold);
        }

        .vds-mobile-menu .vds-mobile-cta {
          margin-top: 20px;
          padding: 18px 40px;
          border: 1px solid var(--vds-gold);
          color: var(--vds-gold);
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .vds-mobile-logo {
          margin-bottom: 40px;
        }

        .vds-mobile-logo img {
          height: 80px;
          width: auto;
        }

        @media (max-width: 768px) {
          .vds-nav {
            padding: 15px 24px;
          }

          .vds-logo-img {
            height: 55px;
          }

          .vds-nav-links {
            display: none;
          }

          .vds-mobile-toggle {
            display: flex;
          }
        }

        /* ========================================
           MAIN CONTENT
           ======================================== */
        .vds-main {
          position: relative;
          z-index: 10;
        }

        /* ========================================
           TYPOGRAPHY UTILITIES
           ======================================== */
        .vds-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          line-height: 1.1;
        }

        .vds-gold {
          color: var(--vds-gold);
        }

        .vds-italic {
          font-style: italic;
        }

        .vds-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
        }

        /* ========================================
           ANIMATIONS
           ======================================== */
        @keyframes vdsFadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes vdsPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes vdsScrollPulse {
          0%, 100% {
            opacity: 1;
            transform: scaleY(1);
          }
          50% {
            opacity: 0.5;
            transform: scaleY(0.8);
          }
        }

        .vds-fade-up {
          animation: vdsFadeSlideUp 1s ease forwards;
        }

        .vds-fade-up-delay-1 {
          opacity: 0;
          animation: vdsFadeSlideUp 1s ease forwards 0.2s;
        }

        .vds-fade-up-delay-2 {
          opacity: 0;
          animation: vdsFadeSlideUp 1s ease forwards 0.4s;
        }

        .vds-fade-up-delay-3 {
          opacity: 0;
          animation: vdsFadeSlideUp 1s ease forwards 0.6s;
        }

        .vds-fade-up-delay-4 {
          opacity: 0;
          animation: vdsFadeSlideUp 1s ease forwards 0.8s;
        }

        /* ========================================
           SCROLL REVEAL
           ======================================== */
        .vds-reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .vds-reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        /* ========================================
           FOOTER
           ======================================== */
        .vds-footer {
          padding: 60px 50px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          border-top: 1px solid rgba(201, 169, 98, 0.1);
          position: relative;
          z-index: 10;
          background: linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, transparent 100%);
        }

        .vds-footer-logo {
          margin-bottom: 10px;
        }

        .vds-footer-logo img {
          height: 90px;
          width: auto;
          opacity: 0.9;
          transition: all 0.3s ease;
        }

        .vds-footer-logo:hover img {
          opacity: 1;
          transform: scale(1.05);
        }

        .vds-footer-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-style: italic;
          color: rgba(248, 246, 241, 0.5);
          letter-spacing: 0.05em;
        }

        .vds-footer-links {
          display: flex;
          gap: 40px;
          margin: 20px 0;
        }

        .vds-footer-link {
          color: rgba(248, 246, 241, 0.5);
          text-decoration: none;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }

        .vds-footer-link:hover {
          color: var(--vds-gold);
        }

        .vds-footer-social {
          display: flex;
          gap: 15px;
          margin: 10px 0;
        }

        .vds-footer-social a {
          width: 44px;
          height: 44px;
          border: 1px solid rgba(201, 169, 98, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--vds-gold);
          text-decoration: none;
          font-size: 0.8rem;
          transition: all 0.3s ease;
        }

        .vds-footer-social a:hover {
          background: var(--vds-gold);
          color: var(--vds-noir);
          border-color: var(--vds-gold);
        }

        .vds-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          padding-top: 30px;
          border-top: 1px solid rgba(201, 169, 98, 0.05);
          margin-top: 10px;
        }

        .vds-footer-text {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: rgba(248, 246, 241, 0.3);
        }

        .vds-footer-vera {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: rgba(248, 246, 241, 0.3);
        }

        .vds-footer-vera span {
          color: var(--vds-gold);
          font-style: italic;
        }

        @media (max-width: 768px) {
          .vds-footer {
            padding: 40px 24px 30px;
          }

          .vds-footer-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }

          .vds-footer-bottom {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
        }
      `}</style>

      {/* Custom Cursor */}
      {!isMobile && (
        <>
          <div ref={cursorRef} className="vds-cursor" />
          <div ref={cursorDotRef} className="vds-cursor-dot" />
        </>
      )}

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="vds-particles" />

      {/* Noise Overlay */}
      <div className="vds-noise" />

      {/* Navigation */}
      <nav className="vds-nav">
        <Link href="/vds" className="vds-logo">
          <img src="/vds-logo.gif" alt="Vision Design Studio" className="vds-logo-img" />
        </Link>

        <div className="vds-nav-links">
          <Link href="/vds/portfolio" className="vds-nav-link">Portfolio</Link>
          <Link href="/vds#philosophy" className="vds-nav-link">Philosophy</Link>
          <Link href="/vds#testimonials" className="vds-nav-link">Testimonials</Link>
          <Link href="/vds/visionary" className="vds-nav-cta">Begin Your Journey</Link>
        </div>

        <button 
          className={`vds-mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`vds-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="vds-mobile-logo">
          <img src="/vds-logo.gif" alt="Vision Design Studio" />
        </div>
        <Link href="/vds/portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</Link>
        <Link href="/vds#philosophy" onClick={() => setMobileMenuOpen(false)}>Philosophy</Link>
        <Link href="/vds#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</Link>
        <Link href="/vds/visionary" className="vds-mobile-cta" onClick={() => setMobileMenuOpen(false)}>
          Begin Your Journey
        </Link>
      </div>

      {/* Main Content */}
      <main className="vds-main">
        {children}
      </main>

      {/* Footer */}
      <footer className="vds-footer">
        <Link href="/vds" className="vds-footer-logo">
          <img src="/vds-logo.gif" alt="Vision Design Studio" />
        </Link>
        
        <p className="vds-footer-tagline">Where Vision Becomes Reality</p>
        
        <div className="vds-footer-links">
          <Link href="/vds/portfolio" className="vds-footer-link">Portfolio</Link>
          <Link href="/vds/residential" className="vds-footer-link">Residential</Link>
          <Link href="/vds/commercial" className="vds-footer-link">Commercial</Link>
          <Link href="/vds/outdoor" className="vds-footer-link">Outdoor</Link>
          <Link href="/vds/vera" className="vds-footer-link">Meet VERA</Link>
        </div>

        <div className="vds-footer-social">
          <a href="#" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="18" cy="6" r="1.5" fill="currentColor" />
            </svg>
          </a>
          <a href="#" aria-label="Pinterest">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v12M9 15l3 3 3-3" />
            </svg>
          </a>
          <a href="#" aria-label="Houzz">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 12l9-9 9 9M5 10v10h14V10" />
              <rect x="9" y="14" width="6" height="6" />
            </svg>
          </a>
        </div>

        <div className="vds-footer-bottom">
          <p className="vds-footer-text">© 2025 Vision Design Studio. All rights reserved.</p>
          <p className="vds-footer-vera">Crafted with care by <span>Vision Design Studio</span> and our team of experts</p>
        </div>
      </footer>
    </div>
  )
}