'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import VeraBubble from '@/components/vds/VeraBubble'

export default function VDSVisionaryPage() {
  const [activeStyle, setActiveStyle] = useState<string | null>(null)

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

    const reveals = document.querySelectorAll('.vds-reveal')
    reveals.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const styles = [
    { 
      id: 'modern', 
      icon: (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="20" width="80" height="60" stroke="currentColor" strokeWidth="2" fill="none"/>
          <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="2"/>
          <circle cx="30" cy="40" r="4" fill="currentColor"/>
          <circle cx="70" cy="50" r="4" fill="currentColor"/>
        </svg>
      ), 
      name: 'Modern Minimal', 
      desc: 'Clean lines, open space' 
    },
    { 
      id: 'farmhouse', 
      icon: (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,10 10,50 20,50 20,85 80,85 80,50 90,50" stroke="currentColor" strokeWidth="2" fill="none"/>
          <line x1="35" y1="50" x2="35" y2="85" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="65" y1="50" x2="65" y2="85" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="25" y="55" width="12" height="12" fill="currentColor" opacity="0.3"/>
        </svg>
      ), 
      name: 'Farmhouse', 
      desc: 'Warm, rustic comfort' 
    },
    { 
      id: 'village', 
      icon: (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="35" width="25" height="35" stroke="currentColor" strokeWidth="2"/>
          <rect x="60" y="40" width="25" height="30" stroke="currentColor" strokeWidth="2"/>
          <polygon points="27.5,20 40,35 15,35" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="22" y="45" width="8" height="8" fill="currentColor" opacity="0.2"/>
          <rect x="68" y="50" width="8" height="8" fill="currentColor" opacity="0.2"/>
        </svg>
      ), 
      name: 'Village Cottage', 
      desc: 'Cozy, charming details' 
    },
    { 
      id: 'country', 
      icon: (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="20" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="3"/>
          <circle cx="40" cy="35" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="60" cy="45" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line x1="15" y1="70" x2="85" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        </svg>
      ), 
      name: 'Country', 
      desc: 'Natural, earthy tones' 
    },
    { 
      id: 'metro', 
      icon: (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="15" width="35" height="70" stroke="currentColor" strokeWidth="2"/>
          <rect x="55" y="25" width="35" height="60" stroke="currentColor" strokeWidth="2"/>
          <line x1="20" y1="35" x2="40" y2="35" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
          <line x1="65" y1="45" x2="85" y2="45" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
        </svg>
      ), 
      name: 'Metro Loft', 
      desc: 'Urban, industrial chic' 
    },
    { 
      id: 'apartment', 
      icon: (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="20" width="70" height="65" stroke="currentColor" strokeWidth="2"/>
          <line x1="50" y1="20" x2="50" y2="85" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
          <line x1="15" y1="55" x2="85" y2="55" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
          <circle cx="28" cy="38" r="3" fill="currentColor" opacity="0.3"/>
          <circle cx="72" cy="38" r="3" fill="currentColor" opacity="0.3"/>
        </svg>
      ), 
      name: 'Apartment', 
      desc: 'Smart, efficient living' 
    },
  ]

  return (
    <div className="vds-visionary">
      <style jsx>{`
        /* ========================================
           VISIONARY PAGE
           ======================================== */
        .vds-visionary {
          min-height: 100vh;
          min-height: 100dvh;
        }

        /* ========================================
           HERO SECTION
           ======================================== */
        .vds-vis-hero {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 120px 24px 80px;
          position: relative;
        }

        .vds-vis-vera {
          margin-bottom: 40px;
          opacity: 0;
          animation: vdsFadeSlideUp 1s ease forwards 0.3s;
        }

        .vds-vis-vera-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--vds-gold) 0%, var(--vds-terracotta) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          margin: 0 auto 24px;
          box-shadow: 0 20px 60px rgba(201, 169, 98, 0.4);
          animation: vdsPulse 3s ease-in-out infinite;
        }

        .vds-vis-vera-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.2rem, 3vw, 1.6rem);
          font-style: italic;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.85);
          max-width: 600px;
          margin: 0 auto;
        }

        .vds-vis-vera-name {
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-top: 20px;
          font-style: normal;
        }

        .vds-vis-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 10vw, 7rem);
          font-weight: 300;
          line-height: 0.95;
          margin-bottom: 20px;
          opacity: 0;
          animation: vdsFadeSlideUp 1s ease forwards 0.5s;
        }

        .vds-vis-title span {
          display: block;
          font-style: italic;
          color: var(--vds-gold);
        }

        .vds-vis-subtitle {
          font-size: clamp(0.95rem, 2vw, 1.2rem);
          font-weight: 200;
          letter-spacing: 0.05em;
          color: rgba(248, 246, 241, 0.7);
          max-width: 500px;
          line-height: 1.8;
          margin-bottom: 60px;
          opacity: 0;
          animation: vdsFadeSlideUp 1s ease forwards 0.7s;
        }

        .vds-vis-scroll {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0;
          animation: vdsFadeSlideUp 1s ease forwards 1s;
        }

        .vds-vis-scroll-line {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, var(--vds-gold), transparent);
          animation: vdsScrollPulse 2s ease infinite;
        }

        .vds-vis-scroll-text {
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--vds-gold);
        }

        /* ========================================
           SPACE PSYCHOLOGY SECTION
           ======================================== */
        .vds-space-psychology {
          min-height: 100vh;
          padding: 120px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(180deg, transparent 0%, rgba(201, 169, 98, 0.02) 50%, transparent 100%);
        }

        .vds-sp-header {
          text-align: center;
          margin-bottom: 80px;
          max-width: 700px;
        }

        .vds-sp-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 20px;
          opacity: 0.8;
        }

        .vds-sp-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 300;
          margin-bottom: 20px;
        }

        .vds-sp-title span {
          color: var(--vds-gold);
          font-style: italic;
        }

        .vds-sp-tagline {
          font-size: 1rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          color: rgba(248, 246, 241, 0.7);
          margin-bottom: 30px;
        }

        .vds-sp-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-style: italic;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.9);
        }

        .vds-sp-desc em {
          color: var(--vds-gold);
          font-style: italic;
        }

        .vds-sp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1100px;
          width: 100%;
          margin-bottom: 80px;
        }

        .vds-sp-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          padding: 40px 30px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .vds-sp-card:hover {
          border-color: rgba(201, 169, 98, 0.3);
          transform: translateY(-8px);
          background: rgba(201, 169, 98, 0.03);
        }

        .vds-sp-card-number {
          position: absolute;
          top: 25px;
          right: 25px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          color: var(--vds-gold);
          opacity: 0.15;
          line-height: 1;
        }

        .vds-sp-card-icon {
          width: 70px;
          height: 70px;
          margin-bottom: 25px;
          color: var(--vds-gold);
        }

        .vds-sp-card-icon svg {
          width: 100%;
          height: 100%;
        }

        .vds-sp-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 15px;
          color: var(--vds-gold);
        }

        .vds-sp-card-desc {
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(248, 246, 241, 0.7);
          margin-bottom: 25px;
        }

        .vds-sp-card-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .vds-sp-card-list li {
          font-size: 0.8rem;
          color: rgba(248, 246, 241, 0.5);
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-left: 20px;
          position: relative;
        }

        .vds-sp-card-list li:last-child {
          border-bottom: none;
        }

        .vds-sp-card-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--vds-gold);
          opacity: 0.5;
          font-size: 0.7rem;
        }

        .vds-sp-output {
          text-align: center;
          margin-bottom: 60px;
          max-width: 800px;
        }

        .vds-sp-output-header {
          margin-bottom: 40px;
        }

        .vds-sp-output-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 15px;
          opacity: 0.7;
        }

        .vds-sp-output-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 300;
        }

        .vds-sp-output-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .vds-sp-output-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 25px 15px;
          background: rgba(201, 169, 98, 0.05);
          border: 1px solid rgba(201, 169, 98, 0.1);
          border-radius: 16px;
          font-size: 0.85rem;
          color: rgba(248, 246, 241, 0.8);
          transition: all 0.3s ease;
        }

        .vds-sp-output-item:hover {
          border-color: rgba(201, 169, 98, 0.3);
          background: rgba(201, 169, 98, 0.08);
        }

        .vds-sp-output-icon {
          color: var(--vds-gold);
          font-size: 1.2rem;
        }

        .vds-sp-cta {
          padding: 22px 60px;
          background: linear-gradient(135deg, var(--vds-gold) 0%, #a08050 100%);
          border: none;
          border-radius: 100px;
          color: var(--vds-noir);
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(201, 169, 98, 0.3);
        }

        .vds-sp-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(201, 169, 98, 0.5);
        }

        @media (max-width: 900px) {
          .vds-sp-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .vds-sp-output-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .vds-space-psychology {
            padding: 80px 20px;
          }

          .vds-sp-card {
            padding: 30px 24px;
          }

          .vds-sp-output-grid {
            grid-template-columns: 1fr;
          }

          .vds-sp-cta {
            padding: 20px 40px;
            font-size: 0.8rem;
          }
        }

        /* ========================================
           STYLE SELECTION SECTION
           ======================================== */
        .vds-vis-styles {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 100px 24px;
        }

        .vds-vis-styles-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .vds-vis-styles-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 20px;
        }

        .vds-vis-styles-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 300;
        }

        .vds-vis-styles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 800px;
          width: 100%;
          margin-bottom: 60px;
        }

        .vds-vis-style-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 30px 20px;
          text-align: center;
          cursor: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .vds-vis-style-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--vds-gold) 0%, var(--vds-terracotta) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .vds-vis-style-card:hover {
          border-color: var(--vds-gold);
          transform: translateY(-5px);
        }

        .vds-vis-style-card:hover::before {
          opacity: 0.1;
        }

        .vds-vis-style-card.selected {
          border-color: var(--vds-gold);
          background: rgba(201, 169, 98, 0.15);
        }

        .vds-vis-style-card.selected::after {
          content: '✓';
          position: absolute;
          top: 12px;
          right: 12px;
          width: 26px;
          height: 26px;
          background: var(--vds-gold);
          color: var(--vds-noir);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .vds-vis-style-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
          position: relative;
          z-index: 1;
          width: 60px;
          height: 60px;
          margin-left: auto;
          margin-right: auto;
          color: var(--vds-gold);
        }

        .vds-vis-style-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 400;
          margin-bottom: 6px;
          position: relative;
          z-index: 1;
        }

        .vds-vis-style-desc {
          font-size: 0.65rem;
          opacity: 0.5;
          letter-spacing: 0.05em;
          position: relative;
          z-index: 1;
        }

        .vds-vis-begin-btn {
          padding: 22px 60px;
          background: linear-gradient(135deg, var(--vds-gold) 0%, #a08050 100%);
          border: none;
          border-radius: 100px;
          color: var(--vds-noir);
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: none;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          min-height: 44px;
          opacity: 0.4;
          pointer-events: none;
        }

        .vds-vis-begin-btn.enabled {
          opacity: 1;
          pointer-events: auto;
        }

        .vds-vis-begin-btn.enabled:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(201, 169, 98, 0.5);
        }

        @media (max-width: 768px) {
          .vds-vis-styles-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .vds-vis-style-card {
            padding: 20px 15px;
          }

          .vds-vis-style-icon {
            font-size: 2rem;
          }

          .vds-vis-style-name {
            font-size: 1rem;
          }
        }

        /* ========================================
           FEATURES SECTION
           ======================================== */
        .vds-vis-features {
          padding: 100px 24px;
          background: linear-gradient(180deg, transparent 0%, rgba(201, 169, 98, 0.03) 50%, transparent 100%);
        }

        .vds-vis-features-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .vds-vis-features-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 20px;
        }

        .vds-vis-features-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 300;
        }

        .vds-vis-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .vds-vis-feature {
          text-align: center;
          padding: 40px 30px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          transition: all 0.4s ease;
        }

        .vds-vis-feature:hover {
          border-color: rgba(201, 169, 98, 0.3);
          transform: translateY(-5px);
        }

        .vds-vis-feature-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .vds-vis-feature-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 15px;
          color: var(--vds-gold);
        }

        .vds-vis-feature-desc {
          font-size: 0.9rem;
          font-weight: 200;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.7);
        }

        @media (max-width: 768px) {
          .vds-vis-features-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .vds-vis-feature {
            padding: 30px 20px;
          }
        }

        /* ========================================
           VERA SECTION
           ======================================== */
        .vds-vis-vera-section {
          padding: 100px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .vds-vis-vera-large {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--vds-gold) 0%, var(--vds-terracotta) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          margin-bottom: 40px;
          box-shadow: 0 25px 80px rgba(201, 169, 98, 0.4);
          animation: vdsPulse 3s ease-in-out infinite;
        }

        .vds-vis-vera-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 300;
          margin-bottom: 20px;
        }

        .vds-vis-vera-title span {
          color: var(--vds-gold);
          font-style: italic;
        }

        .vds-vis-vera-desc {
          font-size: 1rem;
          font-weight: 200;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.7);
          max-width: 600px;
          margin-bottom: 50px;
        }

        .vds-vis-vera-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-style: italic;
          color: rgba(248, 246, 241, 0.6);
          max-width: 500px;
          position: relative;
          padding: 0 30px;
        }

        .vds-vis-vera-quote::before {
          content: '"';
          position: absolute;
          left: 0;
          top: -10px;
          font-size: 3rem;
          color: var(--vds-gold);
          opacity: 0.3;
        }

        /* ========================================
           FINAL CTA
           ======================================== */
        .vds-vis-final-cta {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 100px 24px;
          background: linear-gradient(to top, rgba(201, 169, 98, 0.08) 0%, transparent 100%);
        }

        .vds-vis-final-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 300;
          margin-bottom: 20px;
        }

        .vds-vis-final-title span {
          color: var(--vds-gold);
          font-style: italic;
        }

        .vds-vis-final-subtitle {
          font-size: 1rem;
          font-weight: 200;
          color: rgba(248, 246, 241, 0.6);
          margin-bottom: 50px;
          letter-spacing: 0.1em;
        }

        .vds-vis-final-btn {
          padding: 24px 70px;
          background: linear-gradient(135deg, var(--vds-gold) 0%, #a08050 100%);
          border: none;
          border-radius: 100px;
          color: var(--vds-noir);
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: none;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          min-height: 44px;
        }

        .vds-vis-final-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 25px 60px rgba(201, 169, 98, 0.5);
        }

        /* ========================================
           CONFETTI
           ======================================== */
        .vds-confetti {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10000;
          overflow: hidden;
        }

        .vds-confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -20px;
          animation: vdsConfettiFall 3s ease-out forwards;
        }

        @keyframes vdsConfettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="vds-vis-hero">
        <div className="vds-vis-vera">
          <div className="vds-vis-vera-avatar" style={{ position: 'relative' }}>
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '60%', height: '60%' }}>
              <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
              <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
              <g opacity="0.7">
                <circle cx="50" cy="35" r="3" fill="currentColor"/>
                <circle cx="65" cy="45" r="3" fill="currentColor"/>
                <circle cx="60" cy="65" r="3" fill="currentColor"/>
              </g>
            </svg>
          </div>
          <p className="vds-vis-vera-text">
            "Welcome, beautiful soul. I'm VERA, your design companion inside Vision Design Studio. 
            Together with the VDS team of experts, we'll shape a space that feels like home — 
            a reflection of who you are and who you're becoming."
          </p>
          <p className="vds-vis-vera-name">— VERA, Your Design Guide</p>
        </div>

        <h1 className="vds-vis-title">
          Visionary
          <span>Spaces</span>
        </h1>

        <p className="vds-vis-subtitle">
          Design your dream space with Vision Design Studio and AI-powered guidance from VERA. 
          From concept to creation, our team of experts is here to help.
        </p>

        <div className="vds-vis-scroll">
          <div className="vds-vis-scroll-line"></div>
          <span className="vds-vis-scroll-text">Begin</span>
        </div>
      </section>

      {/* Space Psychology Section */}
      <section className="vds-space-psychology">
        <div className="vds-sp-header vds-reveal">
          <p className="vds-sp-eyebrow">VDS × VERA</p>
          <h2 className="vds-sp-title">
            Space <span>Psychology™</span>
          </h2>
          <p className="vds-sp-tagline">Architecture that responds to the human nervous system</p>
          <p className="vds-sp-desc">
            We don't design spaces for how they look.<br/>
            We design spaces for how they <em>regulate you</em>.
          </p>
        </div>

        <div className="vds-sp-grid vds-reveal">
          <div className="vds-sp-card">
            <div className="vds-sp-card-number">01</div>
            <div className="vds-sp-card-icon">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M50 25 Q70 35 70 50 Q70 65 50 75 Q30 65 30 50 Q30 35 50 25" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="50" cy="40" r="4" fill="currentColor"/>
                <circle cx="40" cy="55" r="3" fill="currentColor" opacity="0.6"/>
                <circle cx="60" cy="55" r="3" fill="currentColor" opacity="0.6"/>
              </svg>
            </div>
            <h3 className="vds-sp-card-title">Nervous System Mapping</h3>
            <p className="vds-sp-card-desc">
              Understand how your biology responds to environmental input. Stress patterns, 
              light sensitivity, and spatial needs decoded.
            </p>
            <ul className="vds-sp-card-list">
              <li>Stress response patterns</li>
              <li>Calming vs energizing needs</li>
              <li>Light & sound sensitivity</li>
              <li>Color-response tendencies</li>
            </ul>
          </div>

          <div className="vds-sp-card">
            <div className="vds-sp-card-number">02</div>
            <div className="vds-sp-card-icon">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="30" width="60" height="45" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <line x1="35" y1="30" x2="35" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                <line x1="65" y1="30" x2="65" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                <circle cx="50" cy="52" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="50" cy="52" r="3" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="vds-sp-card-title">Lifestyle Decoding</h3>
            <p className="vds-sp-card-desc">
              Map how you actually move through life—not how you think you do. 
              Rhythms, rituals, and real behavior patterns.
            </p>
            <ul className="vds-sp-card-list">
              <li>Morning & evening rhythms</li>
              <li>Work & engagement patterns</li>
              <li>Social vs solitude needs</li>
              <li>Movement paths through home</li>
            </ul>
          </div>

          <div className="vds-sp-card">
            <div className="vds-sp-card-number">03</div>
            <div className="vds-sp-card-icon">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="40" r="12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="70" cy="45" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="45" cy="70" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <line x1="38" y1="48" x2="62" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <line x1="50" y1="63" x2="65" y2="53" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
              </svg>
            </div>
            <h3 className="vds-sp-card-title">Sensory Profile</h3>
            <p className="vds-sp-card-desc">
              Discover your sensory thresholds and tolerances. 
              Two people can have opposite responses in the same room.
            </p>
            <ul className="vds-sp-card-list">
              <li>Texture preferences</li>
              <li>Temperature comfort</li>
              <li>Scent associations</li>
              <li>Visual complexity tolerance</li>
            </ul>
          </div>
        </div>

        <div className="vds-sp-output vds-reveal">
          <div className="vds-sp-output-header">
            <p className="vds-sp-output-eyebrow">The Output</p>
            <h3 className="vds-sp-output-title">Your Space Psychology Report™</h3>
          </div>
          <div className="vds-sp-output-grid">
            <div className="vds-sp-output-item">
              <span className="vds-sp-output-icon">◈</span>
              <span>Nervous System Type</span>
            </div>
            <div className="vds-sp-output-item">
              <span className="vds-sp-output-icon">◈</span>
              <span>Design Translation</span>
            </div>
            <div className="vds-sp-output-item">
              <span className="vds-sp-output-icon">◈</span>
              <span>Room-by-Room Insights</span>
            </div>
            <div className="vds-sp-output-item">
              <span className="vds-sp-output-icon">◈</span>
              <span>VDS Design Alignment</span>
            </div>
          </div>
        </div>

        <Link href="/vds/space-psychology" className="vds-sp-cta vds-interactive vds-reveal">
          Begin Your Assessment
        </Link>
      </section>

      {/* Style Selection Section */}
      <section className="vds-vis-styles">
        <div className="vds-vis-styles-header vds-reveal">
          <p className="vds-vis-styles-eyebrow">Step 1</p>
          <h2 className="vds-vis-styles-title">Choose Your Style Foundation</h2>
        </div>

        <div className="vds-vis-styles-grid vds-reveal">
          {styles.map((style) => (
            <div
              key={style.id}
              className={`vds-vis-style-card vds-interactive ${activeStyle === style.id ? 'selected' : ''}`}
              onClick={() => setActiveStyle(style.id)}
            >
              <div className="vds-vis-style-icon">{style.icon}</div>
              <div className="vds-vis-style-name">{style.name}</div>
              <div className="vds-vis-style-desc">{style.desc}</div>
            </div>
          ))}
        </div>

        <Link 
          href={activeStyle ? `/vds/design?style=${activeStyle}` : '#'}
          className={`vds-vis-begin-btn vds-interactive ${activeStyle ? 'enabled' : ''}`}
        >
          Begin Designing
        </Link>
      </section>

      {/* Features Section */}
      <section className="vds-vis-features">
        <div className="vds-vis-features-header vds-reveal">
          <p className="vds-vis-features-eyebrow">What Awaits</p>
          <h2 className="vds-vis-features-title">Your Design Journey</h2>
        </div>

        <div className="vds-vis-features-grid vds-reveal">
          <div className="vds-vis-feature">
            <div className="vds-vis-feature-icon" style={{ color: 'var(--vds-gold)', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <rect x="20" y="30" width="60" height="45" stroke="currentColor" strokeWidth="2"/>
                <line x1="50" y1="30" x2="50" y2="75" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
                <line x1="20" y1="52" x2="80" y2="52" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
              </svg>
            </div>
            <h3 className="vds-vis-feature-title">Floor Plans</h3>
            <p className="vds-vis-feature-desc">
              Draw rooms like an architect. Add walls, doors, and windows with intuitive tools.
            </p>
          </div>

          <div className="vds-vis-feature">
            <div className="vds-vis-feature-icon" style={{ color: 'var(--vds-gold)', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <rect x="15" y="25" width="25" height="50" stroke="currentColor" strokeWidth="2" rx="3"/>
                <rect x="50" y="35" width="20" height="40" stroke="currentColor" strokeWidth="2" rx="2"/>
                <circle cx="27.5" cy="50" r="4" fill="currentColor" opacity="0.3"/>
                <line x1="15" y1="75" x2="70" y2="75" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
              </svg>
            </div>
            <h3 className="vds-vis-feature-title">Furniture & Decor</h3>
            <p className="vds-vis-feature-desc">
              Drag and drop from our curated catalog. Sofas, tables, lighting, plants, and more.
            </p>
          </div>

          <div className="vds-vis-feature">
            <div className="vds-vis-feature-icon" style={{ color: 'var(--vds-gold)', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <circle cx="35" cy="40" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="65" cy="45" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
                <rect x="25" y="60" width="12" height="20" fill="currentColor" opacity="0.3"/>
                <rect x="60" y="65" width="10" height="15" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            <h3 className="vds-vis-feature-title">36+ Materials</h3>
            <p className="vds-vis-feature-desc">
              Customize every piece with luxurious fabrics, woods, stones, and metals.
            </p>
          </div>

          <div className="vds-vis-feature">
            <div className="vds-vis-feature-icon" style={{ color: 'var(--vds-gold)', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M50 25 L60 40 L50 45 L40 40 Z" fill="currentColor" opacity="0.4"/>
                <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.2"/>
                <circle cx="35" cy="35" r="3" fill="currentColor" opacity="0.3"/>
                <circle cx="65" cy="65" r="3" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            <h3 className="vds-vis-feature-title">3D Visualization</h3>
            <p className="vds-vis-feature-desc">
              See your space come alive with immersive 3D rendering and realistic lighting.
            </p>
          </div>

          <div className="vds-vis-feature">
            <div className="vds-vis-feature-icon" style={{ color: 'var(--vds-gold)', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M50 30 Q65 40 65 50 Q65 60 50 70 Q35 60 35 50 Q35 40 50 30" fill="currentColor" opacity="0.2"/>
                <line x1="50" y1="35" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <h3 className="vds-vis-feature-title">VERA Guidance</h3>
            <p className="vds-vis-feature-desc">
              Your AI companion offers tips, encouragement, and design wisdom throughout.
            </p>
          </div>

          <div className="vds-vis-feature">
            <div className="vds-vis-feature-icon" style={{ color: 'var(--vds-gold)', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <rect x="20" y="20" width="30" height="35" stroke="currentColor" strokeWidth="2" rx="2"/>
                <rect x="55" y="25" width="25" height="30" stroke="currentColor" strokeWidth="2" rx="2"/>
                <line x1="25" y1="60" x2="75" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
                <line x1="25" y1="70" x2="75" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
              </svg>
            </div>
            <h3 className="vds-vis-feature-title">Save & Share</h3>
            <p className="vds-vis-feature-desc">
              Save your designs and share them with family, friends, or your designer.
            </p>
          </div>
        </div>
      </section>

      {/* VERA Section */}
      <section className="vds-vis-vera-section vds-reveal">
        <div className="vds-vis-vera-large" style={{ position: 'relative' }}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '70%', height: '70%' }}>
            <defs>
              <linearGradient id="veraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="35" stroke="url(#veraGradient)" strokeWidth="2" fill="none"/>
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
            <g opacity="0.8">
              <circle cx="50" cy="30" r="4" fill="currentColor"/>
              <circle cx="68" cy="42" r="3.5" fill="currentColor"/>
              <circle cx="65" cy="68" r="3.5" fill="currentColor"/>
              <circle cx="32" cy="68" r="3" fill="currentColor"/>
              <circle cx="30" cy="42" r="3.5" fill="currentColor"/>
            </g>
          </svg>
        </div>
        <h2 className="vds-vis-vera-title">
          Meet <span>VERA</span>
        </h2>
        <p className="vds-vis-vera-desc">
          VERA isn't just an AI — she's your creative partner inside VDS. Guided by Vision Design Studio's 
          design principles and our team of experts, she helps you explore options, refine details, and move 
          confidently from inspiration to a buildable plan.
        </p>
        <p className="vds-vis-vera-quote">
          Vision Design Studio × VERA — we amplify your creativity, never replace it.
        </p>
      </section>

      {/* Final CTA */}
      <section className="vds-vis-final-cta">
        <h2 className="vds-vis-final-title">
          Ready to Create Your <span>Dream Space</span>?
        </h2>
        <p className="vds-vis-final-subtitle">
          Free to start • Premium features available
        </p>
        <Link href="/vds/design" className="vds-vis-final-btn vds-interactive">
          Start Designing Now
        </Link>
      </section>
      <VeraBubble 
        isPremium={false}
        context="visionary"
        onUpgradeClick={() => window.location.href = '/pricing'}
      />
    </div>
  )
}