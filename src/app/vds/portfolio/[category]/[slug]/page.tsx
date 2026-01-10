'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import VeraBubble from '@/components/vds/VeraBubble'
import { getProjectBySlug, Hotspot } from '../../data'

export default function ImmersiveProjectPage() {
  const params = useParams()
  const router = useRouter()
  const category = params.category as string
  const slug = params.slug as string
  const project = getProjectBySlug(slug)

  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [dustParticles, setDustParticles] = useState<Array<{left: number, duration: number, delay: number, size: number}>>([])
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, zoom: 1 })
  const [activeTag, setActiveTag] = useState<string | null>(null)
  
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  // Camera positions for different tags (customize per project type)
  const tagCameraPositions: Record<string, { x: number, y: number, zoom: number }> = {
    'double height': { x: 0, y: -30, zoom: 1.3 },      // Pan UP to show ceiling
    'statement chandelier': { x: 0, y: -25, zoom: 1.6 }, // Zoom to chandelier
    'modern grandeur': { x: 0, y: 0, zoom: 0.9 },      // Zoom OUT to show full room
    'rendering': { x: 0, y: 0, zoom: 1.1 },            // Slight zoom
    'fireplace': { x: 0, y: 10, zoom: 1.4 },           // Focus on fireplace area
    'natural light': { x: -15, y: 0, zoom: 1.2 },      // Pan to windows
    'floor to ceiling': { x: 0, y: -20, zoom: 1.3 },   // Pan up
    'marble': { x: 0, y: 15, zoom: 1.5 },              // Focus on floor/walls
    'open concept': { x: 0, y: 0, zoom: 0.85 },        // Wide view
    'kitchen': { x: 10, y: 0, zoom: 1.3 },             // Pan to kitchen area
    'living room': { x: -10, y: 5, zoom: 1.2 },        // Pan to living area
  }

  // Handle tag click - animate camera
  const handleTagClick = (tag: string) => {
    const tagLower = tag.toLowerCase()
    
    if (activeTag === tagLower) {
      // If same tag clicked, reset to default view
      setCameraPosition({ x: 0, y: 0, zoom: 1 })
      setActiveTag(null)
    } else {
      // Find matching camera position or use default slight zoom
      const position = tagCameraPositions[tagLower] || { x: 0, y: 0, zoom: 1.15 }
      setCameraPosition(position)
      setActiveTag(tagLower)
    }
  }

  // Generate dust particles on client only (fixes hydration error)
  useEffect(() => {
    const particles = Array.from({ length: 20 }).map(() => ({
      left: 50 + Math.random() * 40,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 10,
      size: 2 + Math.random() * 2,
    }))
    setDustParticles(particles)
  }, [])

  // Loading animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 12 + 'px'
      cursor.style.top = e.clientY - 12 + 'px'
      cursorDot.style.left = e.clientX - 2 + 'px'
      cursorDot.style.top = e.clientY - 2 + 'px'
    }

    document.addEventListener('mousemove', moveCursor)
    return () => document.removeEventListener('mousemove', moveCursor)
  }, [])

  // Cursor hover effect
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const addHover = () => cursor.classList.add('hover')
    const removeHover = () => cursor.classList.remove('hover')

    const interactives = document.querySelectorAll('.immersive-interactive')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [isLoading])

  // Escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveHotspot(null)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!project) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'var(--vds-pearl)'
      }}>
        <p>Project not found</p>
      </div>
    )
  }

  return (
    <div className="immersive-container">
      <style jsx>{`
        /* ========================================
           IMMERSIVE PROJECT VIEW - FINAL
           ======================================== */
        .immersive-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #0a0a0a;
          overflow: hidden;
          z-index: 9000;
        }

        /* Custom Cursor */
        .immersive-cursor {
          width: 24px;
          height: 24px;
          border: 1.5px solid white;
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 10000;
          transition: transform 0.2s ease, background 0.3s ease;
          mix-blend-mode: difference;
        }

        .immersive-cursor.hover {
          transform: scale(2);
          background: rgba(201, 169, 98, 0.3);
          border-color: var(--vds-gold);
        }

        .immersive-cursor-dot {
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 10001;
          mix-blend-mode: difference;
        }

        @media (max-width: 768px) {
          .immersive-cursor,
          .immersive-cursor-dot {
            display: none;
          }
        }

        /* Loading Screen */
        .immersive-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0a0a0a;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: opacity 0.8s ease, visibility 0.8s ease;
        }

        .immersive-loader.hidden {
          opacity: 0;
          visibility: hidden;
        }

        .immersive-loader-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: var(--vds-pearl);
          letter-spacing: 0.4em;
          margin-bottom: 30px;
          text-transform: uppercase;
        }

        .immersive-loader-bar {
          width: 200px;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .immersive-loader-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: var(--vds-gold);
          transition: width 0.3s ease;
        }

        /* Room View */
        .immersive-room {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s ease;
        }

        .immersive-room.visible {
          opacity: 1;
        }

        /* Background Image */
        .immersive-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        /* Placeholder gradient if no image */
        .immersive-bg-placeholder {
          background: 
            radial-gradient(ellipse at 30% 30%, rgba(201, 169, 98, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(196, 164, 132, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #1a1815, #2d2520);
        }

        /* Reset View Button */
        .immersive-reset-view {
          position: absolute;
          bottom: 120px;
          right: 40px;
          padding: 12px 24px;
          background: rgba(10, 10, 10, 0.8);
          border: 1px solid var(--vds-gold, #c9a962);
          border-radius: 100px;
          color: var(--vds-gold, #c9a962);
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          pointer-events: auto;
          z-index: 120;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          opacity: 0;
          visibility: hidden;
        }

        .immersive-reset-view.visible {
          opacity: 1;
          visibility: visible;
        }

        .immersive-reset-view:hover {
          background: var(--vds-gold, #c9a962);
          color: #0a0a0a;
        }

        /* ========================================
           GRADIENT OVERLAYS FOR READABILITY
           ======================================== */
        
        /* Top gradient - subtle for back button area */
        .immersive-gradient-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 150px;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.6) 0%,
            rgba(0, 0, 0, 0.3) 60%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 10;
        }

        /* Bottom gradient - for title and tags */
        .immersive-gradient-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 350px;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.7) 30%,
            rgba(0, 0, 0, 0.4) 60%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 10;
        }

        /* Light Overlay Effects */
        .immersive-light-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background: 
            radial-gradient(ellipse 80% 100% at 75% 20%, rgba(255, 248, 235, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 30%, rgba(255, 245, 225, 0.04) 0%, transparent 40%);
          animation: lightPulse 8s ease-in-out infinite;
        }

        @keyframes lightPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* Dust Particles */
        .immersive-dust {
          position: absolute;
          background: rgba(255, 250, 240, 0.6);
          border-radius: 50%;
          pointer-events: none;
          animation: dustFloat linear infinite;
        }

        @keyframes dustFloat {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-10vh) translateX(-30px);
            opacity: 0;
          }
        }

        /* UI Overlay */
        .immersive-ui {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 100;
        }

        /* ========================================
           BACK BUTTON ONLY
           ======================================== */
        .immersive-back {
          position: absolute;
          top: 30px;
          left: 30px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          text-decoration: none;
          pointer-events: auto;
          cursor: pointer;
          transition: transform 0.3s ease;
          z-index: 200;
        }

        .immersive-back:hover {
          transform: translateX(-5px);
        }

        .immersive-back-arrow {
          width: 48px;
          height: 48px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          color: white;
        }

        .immersive-back:hover .immersive-back-arrow {
          background: white;
          color: #0a0a0a;
          border-color: white;
        }

        .immersive-back-text {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
          font-weight: 500;
        }

        /* ========================================
           PROJECT TITLE
           ======================================== */
        .immersive-title {
          position: absolute;
          bottom: 50px;
          left: 40px;
          pointer-events: auto;
          z-index: 110;
        }

        .immersive-category {
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c9a962;
          margin-bottom: 12px;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 1), 0 1px 5px rgba(0, 0, 0, 1);
          font-weight: 500;
        }

        .immersive-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 300;
          color: white;
          line-height: 1.1;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 1), 0 2px 10px rgba(0, 0, 0, 0.9);
          margin-bottom: 8px;
        }

        .immersive-location {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
          margin-top: 12px;
          text-shadow: 0 2px 15px rgba(0, 0, 0, 1);
          font-weight: 400;
        }

        /* ========================================
           TAGS
           ======================================== */
        .immersive-tags {
          position: absolute;
          bottom: 50px;
          right: 40px;
          display: flex;
          gap: 10px;
          pointer-events: auto;
          z-index: 110;
          flex-wrap: wrap;
          justify-content: flex-end;
          max-width: 400px;
        }

        .immersive-tag {
          padding: 12px 22px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 100px;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: white;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          cursor: pointer;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
          white-space: nowrap;
          font-weight: 500;
        }

        .immersive-tag:hover {
          background: white;
          color: #0a0a0a;
          border-color: white;
          text-shadow: none;
        }

        .immersive-tag.active {
          background: var(--vds-gold, #c9a962);
          color: #0a0a0a;
          border-color: var(--vds-gold, #c9a962);
          text-shadow: none;
        }

        /* ========================================
           HOTSPOTS - DARKER & MORE VISIBLE
           ======================================== */
        .immersive-hotspot {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(10, 10, 10, 0.7);
          border: 2px solid rgba(201, 169, 98, 0.8);
          cursor: pointer;
          pointer-events: auto;
          animation: hotspotPulse 2s ease-in-out infinite;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        .immersive-hotspot::before {
          content: '+';
          color: var(--vds-gold, #c9a962);
          font-size: 1.5rem;
          font-weight: 300;
          text-shadow: 0 0 10px rgba(201, 169, 98, 0.5);
        }

        .immersive-hotspot:hover {
          background: var(--vds-gold, #c9a962);
          transform: scale(1.2);
          border-color: var(--vds-gold, #c9a962);
        }

        .immersive-hotspot:hover::before {
          color: #0a0a0a;
          text-shadow: none;
        }

        @keyframes hotspotPulse {
          0%, 100% { 
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 0 0 rgba(201, 169, 98, 0.4);
          }
          50% { 
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 0 15px rgba(201, 169, 98, 0);
          }
        }

        /* ========================================
           INFO PANEL
           ======================================== */
        .immersive-panel-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s ease;
          z-index: 150;
        }

        .immersive-panel-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .immersive-panel {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.9);
          background: #faf8f5;
          padding: 50px;
          border-radius: 20px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
          max-width: 480px;
          width: 90%;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 200;
          color: #2d2d2d;
        }

        .immersive-panel.active {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, -50%) scale(1);
        }

        .immersive-panel-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border: 1px solid #2d2d2d;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          color: #2d2d2d;
          transition: all 0.3s ease;
        }

        .immersive-panel-close:hover {
          background: #2d2d2d;
          color: #faf8f5;
        }

        .immersive-panel-category {
          font-size: 0.65rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--vds-terracotta, #c4a484);
          margin-bottom: 15px;
        }

        .immersive-panel-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 300;
          color: #2d2d2d;
          margin-bottom: 20px;
        }

        .immersive-panel-desc {
          font-size: 0.95rem;
          line-height: 1.9;
          color: rgba(45, 45, 45, 0.75);
          margin-bottom: 30px;
        }

        .immersive-panel-specs {
          display: flex;
          gap: 30px;
          padding-top: 25px;
          border-top: 1px solid rgba(45, 45, 45, 0.1);
        }

        .immersive-spec {
          text-align: center;
          flex: 1;
        }

        .immersive-spec-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          color: #2d2d2d;
          margin-bottom: 5px;
        }

        .immersive-spec-label {
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(45, 45, 45, 0.5);
        }

        /* ========================================
           RESPONSIVE
           ======================================== */
        @media (max-width: 768px) {
          .immersive-back {
            top: 20px;
            left: 20px;
          }

          .immersive-back-text {
            display: none;
          }

          .immersive-back-arrow {
            width: 44px;
            height: 44px;
          }

          .immersive-title {
            bottom: 130px;
            left: 20px;
            right: 20px;
          }

          .immersive-name {
            font-size: 2rem;
          }

          .immersive-tags {
            bottom: 30px;
            left: 20px;
            right: 20px;
            justify-content: flex-start;
            max-width: none;
          }

          .immersive-tag {
            padding: 10px 16px;
            font-size: 0.55rem;
          }

          .immersive-gradient-bottom {
            height: 400px;
          }

          .immersive-panel {
            padding: 30px;
            max-width: calc(100% - 40px);
          }

          .immersive-panel-specs {
            flex-direction: column;
            gap: 15px;
          }

          .immersive-hotspot {
            width: 44px;
            height: 44px;
          }
        }
      `}</style>

      {/* Custom Cursor */}
      <div ref={cursorRef} className="immersive-cursor" />
      <div ref={cursorDotRef} className="immersive-cursor-dot" />

      {/* Loading Screen */}
      <div className={`immersive-loader ${!isLoading ? 'hidden' : ''}`}>
        <p className="immersive-loader-text">Entering {project.name}</p>
        <div className="immersive-loader-bar">
          <div 
            className="immersive-loader-progress" 
            style={{ width: `${Math.min(loadProgress, 100)}%` }}
          />
        </div>
      </div>

      {/* Room View */}
      <div className={`immersive-room ${!isLoading ? 'visible' : ''}`}>
        {/* Background Image with Camera Movement */}
        <div 
          className={`immersive-bg ${!project.images?.[0] ? 'immersive-bg-placeholder' : ''}`}
          style={{
            ...(project.images?.[0] ? { backgroundImage: `url(${project.images[0]})` } : {}),
            transform: `translate(${cameraPosition.x}%, ${cameraPosition.y}%) scale(${cameraPosition.zoom})`,
          }}
        />

        {/* Gradient Overlays for Readability */}
        <div className="immersive-gradient-top" />
        <div className="immersive-gradient-bottom" />

        {/* Light Overlay */}
        <div className="immersive-light-overlay" />

        {/* Dust Particles - only render after client hydration */}
        {dustParticles.map((particle, i) => (
          <div
            key={i}
            className="immersive-dust"
            style={{
              left: `${particle.left}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}

        {/* Hotspots */}
        {project.hotspots.map((hotspot: Hotspot) => (
          <div
            key={hotspot.id}
            className="immersive-hotspot immersive-interactive"
            style={{
              left: `${hotspot.position.x}%`,
              top: `${hotspot.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => setActiveHotspot(hotspot)}
          />
        ))}

        {/* Back Button - Dynamic Category */}
        <Link href={`/vds/portfolio/${params.category}`} className="immersive-back immersive-interactive">
          <div className="immersive-back-arrow">←</div>
          <span className="immersive-back-text">Back to Portfolio</span>
        </Link>

        {/* UI Overlay */}
        <div className="immersive-ui">
          {/* Project Title */}
          <div className="immersive-title">
            <p className="immersive-category">{project.category}</p>
            <h1 className="immersive-name">{project.name}</h1>
            <p className="immersive-location">{project.location} • {project.year}</p>
          </div>

          {/* Tags - Clickable for Camera Movement */}
          <div className="immersive-tags">
            {project.tags.map((tag: string) => (
              <span 
                key={tag} 
                className={`immersive-tag immersive-interactive ${activeTag === tag.toLowerCase() ? 'active' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Reset View Button */}
          <button 
            className={`immersive-reset-view immersive-interactive ${activeTag ? 'visible' : ''}`}
            onClick={() => {
              setCameraPosition({ x: 0, y: 0, zoom: 1 })
              setActiveTag(null)
            }}
          >
            Reset View
          </button>
        </div>
      </div>

      {/* Panel Overlay */}
      <div 
        className={`immersive-panel-overlay ${activeHotspot ? 'active' : ''}`}
        onClick={() => setActiveHotspot(null)}
      />

      {/* Info Panel */}
      <div className={`immersive-panel ${activeHotspot ? 'active' : ''}`}>
        {activeHotspot && (
          <>
            <button 
              className="immersive-panel-close immersive-interactive"
              onClick={() => setActiveHotspot(null)}
            >
              ×
            </button>
            <p className="immersive-panel-category">{activeHotspot.category}</p>
            <h2 className="immersive-panel-title">{activeHotspot.title}</h2>
            <p className="immersive-panel-desc">{activeHotspot.description}</p>
            <div className="immersive-panel-specs">
              <div className="immersive-spec">
                <div className="immersive-spec-value">{activeHotspot.specs?.material}</div>
                <div className="immersive-spec-label">Material</div>
              </div>
              <div className="immersive-spec">
                <div className="immersive-spec-value">{activeHotspot.specs?.origin}</div>
                <div className="immersive-spec-label">Origin</div>
              </div>
              <div className="immersive-spec">
                <div className="immersive-spec-value">{activeHotspot.specs?.style}</div>
                <div className="immersive-spec-label">Style</div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* VERA Bubble - positioned in middle-right, above tags */}
      <div style={{
        position: 'fixed',
        bottom: '50%',
        right: '30px',
        transform: 'translateY(50%)',
        zIndex: 500,
      }}>
        <VeraBubble 
          isPremium={false}
          context="immersive"
          projectName={project.name}
          onUpgradeClick={() => window.location.href = '/pricing'}
        />
      </div>
    </div>
  )
}