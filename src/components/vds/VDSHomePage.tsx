'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import VeraBubble from '@/components/vds/VeraBubble'

export default function VDSHomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
    if (typeof window !== 'undefined' && window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual'
    }
    setTimeout(() => setLoaded(true), 100)
  }, [])

  // Handle nav background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const images = {
    hero: 'https://elvec2kw-pwazr.wordpress.com/wp-content/uploads/2025/12/site-title-695456ef5319c.png',
    pool: 'https://elvec2kw-pwazr.wordpress.com/wp-content/uploads/2025/12/site-title-695456ef27991.png',
    kitchen: 'https://elvec2kw-pwazr.wordpress.com/wp-content/uploads/2025/12/site-title-695456ef2374c.png',
    landscape: 'https://elvec2kw-pwazr.wordpress.com/wp-content/uploads/2025/12/site-title-695456eeb4aa2.png',
    residence: 'https://elvec2kw-pwazr.wordpress.com/wp-content/uploads/2025/12/site-title-695456eef28e4.png',
    lobby: 'https://elvec2kw-pwazr.wordpress.com/wp-content/uploads/2025/12/site-title-695456ef73e43.png',
    poolTerrace: 'https://elvec2kw-pwazr.wordpress.com/wp-content/uploads/2025/12/site-title-695456ef1e4e6.png',
    kitchenAlt: 'https://elvec2kw-pwazr.wordpress.com/wp-content/uploads/2025/12/site-title-695456eec72b9.png',
  }

  return (
    <div className="vds-landing">
      <style jsx global>{`
        :root {
          --gold: #C9A962;
          --gold-light: #E8D5A3;
          --pearl: #F8F6F1;
          --noir: #0a0a0a;
          --noir-light: #141414;
        }

        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Outfit:wght@200;300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { 
          font-family: 'Outfit', sans-serif; 
          background: var(--noir); 
          color: var(--pearl); 
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        ::selection {
          background: var(--gold);
          color: var(--noir);
        }

        .vds-reveal {
          opacity: 0;
          transform: translateY(60px);
          transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .vds-reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 40px rgba(201, 169, 98, 0.3); }
          50% { box-shadow: 0 0 80px rgba(201, 169, 98, 0.5); }
        }
      `}</style>

      <style jsx>{`
        .vds-landing {
          background: var(--noir);
          min-height: 100vh;
        }

        /* ==================== NAVIGATION ==================== */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: ${scrolled ? '15px 50px' : '25px 50px'};
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: ${scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent'};
          backdrop-filter: ${scrolled ? 'blur(20px)' : 'none'};
          border-bottom: ${scrolled ? '1px solid rgba(201, 169, 98, 0.15)' : 'none'};
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav-logo {
          height: ${scrolled ? '80px' : '100px'};
          width: auto;
          transition: all 0.4s ease;
        }

        .nav-links {
          display: flex;
          gap: 50px;
          align-items: center;
        }

        .nav-link {
          color: rgba(248, 246, 241, 0.8);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 300;
          letter-spacing: 0.08em;
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: var(--pearl);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-cta {
          padding: 14px 32px;
          background: linear-gradient(135deg, var(--gold) 0%, #B8956E 100%);
          color: var(--noir);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          border-radius: 50px;
          transition: all 0.4s ease;
          box-shadow: 0 4px 20px rgba(201, 169, 98, 0.3);
        }

        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(201, 169, 98, 0.5);
        }

        /* ==================== HERO ==================== */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }

        .hero-bg-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201, 169, 98, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 20% 80%, rgba(201, 169, 98, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, var(--noir) 0%, var(--noir-light) 50%, var(--noir) 100%);
        }

        .hero-bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: ${loaded ? 0.35 : 0};
          transition: opacity 1.5s ease;
        }

        .hero-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--gold);
          border-radius: 50%;
          opacity: 0.3;
          animation: float 8s ease-in-out infinite;
        }

        .particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { top: 60%; left: 20%; animation-delay: -2s; }
        .particle:nth-child(3) { top: 40%; left: 80%; animation-delay: -4s; }
        .particle:nth-child(4) { top: 80%; left: 70%; animation-delay: -6s; }
        .particle:nth-child(5) { top: 30%; left: 50%; animation-delay: -1s; }

        .hero-content {
          position: relative;
          z-index: 10;
          padding: 0 80px;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          opacity: ${loaded ? 1 : 0};
          transform: translateY(${loaded ? '0' : '50px'});
          transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
        }

        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          background: rgba(201, 169, 98, 0.1);
          border: 1px solid rgba(201, 169, 98, 0.3);
          border-radius: 50px;
          margin-bottom: 40px;
        }

        .hero-label-dot {
          width: 8px;
          height: 8px;
          background: var(--gold);
          border-radius: 50%;
          animation: pulse 2s ease infinite;
        }

        .hero-label-text {
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 30px;
          letter-spacing: -0.02em;
        }

        .hero-title-line {
          display: block;
          overflow: hidden;
        }

        .hero-title-italic {
          font-style: italic;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .hero-desc {
          font-size: 1.2rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(248, 246, 241, 0.7);
          max-width: 550px;
          margin: 0 auto 50px;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .btn-primary {
          padding: 20px 50px;
          background: #C9A962;
          color: #0a0a0a;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          border-radius: 50px;
          transition: all 0.4s ease;
          box-shadow: 0 4px 25px rgba(201, 169, 98, 0.5);
          border: none;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 40px rgba(201, 169, 98, 0.6);
          background: #E8D5A3;
        }

        .btn-secondary {
          padding: 20px 50px;
          background: #FFFFFF;
          color: #0a0a0a;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          border: none;
          border-radius: 50px;
          transition: all 0.4s ease;
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
        }

        .btn-secondary:hover {
          transform: translateY(-3px);
          background: #F8F6F1;
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.4);
        }

        .hero-scroll {
          position: absolute;
          bottom: 50px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          opacity: ${loaded ? 1 : 0};
          transition: opacity 1s ease 1.5s;
        }

        .hero-scroll-line {
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, var(--gold), transparent);
          animation: pulse 2s ease infinite;
        }

        .hero-scroll-text {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
        }

        /* ==================== PORTFOLIO ==================== */
        .portfolio {
          padding: 150px 80px;
          position: relative;
          overflow: hidden;
        }

        .portfolio-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse 50% 50% at 0% 50%, rgba(201, 169, 98, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 100% 50%, rgba(201, 169, 98, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .section-header {
          text-align: center;
          margin-bottom: 100px;
          position: relative;
          z-index: 1;
        }

        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .section-label-line {
          width: 50px;
          height: 1px;
          background: var(--gold);
        }

        .section-label-text {
          font-size: 0.75rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 300;
          line-height: 1.1;
        }

        .section-title span {
          font-style: italic;
          color: var(--gold);
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .portfolio-card {
          position: relative;
          aspect-ratio: 3/4;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
        }

        .portfolio-card-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .portfolio-card:hover .portfolio-card-image {
          transform: scale(1.1);
        }

        .portfolio-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, transparent 0%, transparent 40%, rgba(0,0,0,0.95) 100%);
          transition: all 0.5s ease;
        }

        .portfolio-card:hover .portfolio-card-overlay {
          background: linear-gradient(180deg, rgba(201, 169, 98, 0.1) 0%, transparent 40%, rgba(0,0,0,0.95) 100%);
        }

        .portfolio-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px 30px;
          transform: translateY(20px);
          transition: transform 0.5s ease;
        }

        .portfolio-card:hover .portfolio-card-content {
          transform: translateY(0);
        }

        .portfolio-card-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 4rem;
          font-weight: 300;
          color: var(--gold);
          opacity: 0.4;
          line-height: 1;
          margin-bottom: 15px;
        }

        .portfolio-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 400;
          margin-bottom: 10px;
        }

        .portfolio-card-desc {
          font-size: 0.9rem;
          color: rgba(248, 246, 241, 0.7);
          line-height: 1.6;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.5s ease 0.1s;
        }

        .portfolio-card:hover .portfolio-card-desc {
          opacity: 1;
          transform: translateY(0);
        }

        .portfolio-card-arrow {
          position: absolute;
          top: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          border: 1px solid rgba(201, 169, 98, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          font-size: 1.2rem;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.4s ease;
        }

        .portfolio-card:hover .portfolio-card-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ==================== PHILOSOPHY ==================== */
        .philosophy {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
          overflow: hidden;
        }

        .philosophy-visual {
          position: relative;
          background: var(--noir-light);
          overflow: hidden;
        }

        .philosophy-images {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .philosophy-img {
          position: absolute;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(201, 169, 98, 0.2);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .philosophy-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .philosophy-img:hover {
          border-color: rgba(201, 169, 98, 0.5);
          z-index: 10;
          transform: scale(1.02);
        }

        .philosophy-img:hover img {
          transform: scale(1.05);
        }

        .philosophy-img-1 {
          width: 320px;
          height: 240px;
          top: 10%;
          left: 8%;
          animation: float 10s ease-in-out infinite;
        }

        .philosophy-img-2 {
          width: 350px;
          height: 380px;
          top: 25%;
          left: 45%;
          animation: float 12s ease-in-out infinite;
          animation-delay: -3s;
        }

        .philosophy-img-3 {
          width: 300px;
          height: 220px;
          top: 60%;
          left: 12%;
          animation: float 11s ease-in-out infinite;
          animation-delay: -6s;
        }

        .philosophy-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(201, 169, 98, 0.15) 0%, transparent 70%);
          pointer-events: none;
          animation: glowPulse 4s ease infinite;
        }

        .philosophy-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 100px;
          position: relative;
        }

        .philosophy-content::before {
          content: '"';
          position: absolute;
          top: 80px;
          left: 80px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 15rem;
          color: var(--gold);
          opacity: 0.08;
          line-height: 1;
          pointer-events: none;
        }

        .philosophy-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 300;
          line-height: 1.3;
          margin-bottom: 35px;
        }

        .philosophy-title span {
          font-style: italic;
          color: var(--gold);
        }

        .philosophy-text {
          font-size: 1.1rem;
          font-weight: 300;
          line-height: 2;
          color: rgba(248, 246, 241, 0.7);
          margin-bottom: 60px;
        }

        .philosophy-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .stat {
          text-align: center;
          padding: 30px;
          background: rgba(201, 169, 98, 0.03);
          border: 1px solid rgba(201, 169, 98, 0.1);
          border-radius: 16px;
          transition: all 0.4s ease;
        }

        .stat:hover {
          background: rgba(201, 169, 98, 0.08);
          border-color: rgba(201, 169, 98, 0.3);
          transform: translateY(-5px);
        }

        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.5rem;
          font-weight: 300;
          color: var(--gold);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(248, 246, 241, 0.5);
          margin-top: 12px;
        }

        /* ==================== IMMERSIVE ==================== */
        .immersive {
          padding: 150px 80px;
          position: relative;
          overflow: hidden;
        }

        .immersive-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(201, 169, 98, 0.1) 0%, transparent 50%),
            linear-gradient(180deg, var(--noir) 0%, var(--noir-light) 50%, var(--noir) 100%);
          pointer-events: none;
        }

        .immersive-content {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .immersive-preview {
          max-width: 1100px;
          margin: 80px auto 0;
          aspect-ratio: 16/9;
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(201, 169, 98, 0.2);
        }

        .immersive-preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.6;
          transition: all 0.8s ease;
        }

        .immersive-preview:hover .immersive-preview-image {
          opacity: 0.8;
          transform: scale(1.02);
        }

        .immersive-preview-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 10, 0.7) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 25px;
        }

        .immersive-preview-icon {
          width: 90px;
          height: 90px;
          border: 2px solid var(--gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: var(--gold);
          transition: all 0.4s ease;
          animation: glowPulse 3s ease infinite;
        }

        .immersive-preview:hover .immersive-preview-icon {
          transform: scale(1.1);
          background: rgba(201, 169, 98, 0.1);
        }

        .immersive-preview-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          color: var(--pearl);
        }

        .immersive-btn {
          margin-top: 50px;
          padding: 20px 50px;
          background: linear-gradient(135deg, var(--gold) 0%, #B8956E 100%);
          color: var(--noir);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-radius: 50px;
          display: inline-block;
          transition: all 0.4s ease;
          box-shadow: 0 4px 30px rgba(201, 169, 98, 0.4);
        }

        .immersive-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 50px rgba(201, 169, 98, 0.5);
        }

        /* ==================== TESTIMONIALS ==================== */
        .testimonials {
          padding: 150px 80px;
          position: relative;
          overflow: hidden;
          background: var(--noir-light);
        }

        .testimonials-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201, 169, 98, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(201, 169, 98, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .testimonial-card {
          padding: 50px 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(201, 169, 98, 0.15);
          border-radius: 20px;
          text-align: center;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .testimonial-card:hover {
          background: rgba(201, 169, 98, 0.05);
          border-color: rgba(201, 169, 98, 0.3);
          transform: translateY(-10px);
        }

        .testimonial-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-style: italic;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.9);
          margin-bottom: 30px;
          position: relative;
        }

        .testimonial-quote::before {
          content: '"';
          font-size: 4rem;
          color: var(--gold);
          opacity: 0.3;
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .testimonial-name {
          font-size: 1rem;
          font-weight: 500;
          color: var(--gold);
          letter-spacing: 0.05em;
        }

        .testimonial-role {
          font-size: 0.75rem;
          color: rgba(248, 246, 241, 0.5);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        @media (max-width: 1024px) {
          .testimonials { padding: 100px 40px; }
          .testimonials-grid { grid-template-columns: 1fr; gap: 30px; }
        }

        @media (max-width: 768px) {
          .testimonials { padding: 80px 24px; }
          .testimonial-card { padding: 40px 30px; }
          .testimonial-quote { font-size: 1.1rem; }
        }

        /* ==================== CONTACT ==================== */
        .contact {
          padding: 150px 80px;
          position: relative;
          overflow: hidden;
        }

        .contact-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(ellipse 50% 50% at 50% 100%, rgba(201, 169, 98, 0.08) 0%, transparent 50%),
            linear-gradient(180deg, var(--noir-light) 0%, var(--noir) 100%);
          pointer-events: none;
        }

        .contact-content {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .contact-desc {
          font-size: 1.1rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.7);
          margin-bottom: 50px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 18px 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(201, 169, 98, 0.2);
          border-radius: 12px;
          color: var(--pearl);
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(248, 246, 241, 0.4);
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--gold);
          background: rgba(201, 169, 98, 0.05);
        }

        .form-textarea {
          resize: vertical;
          min-height: 150px;
        }

        .form-submit {
          padding: 20px 50px;
          background: linear-gradient(135deg, var(--gold) 0%, #B8956E 100%);
          color: var(--noir);
          border: none;
          border-radius: 50px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 4px 30px rgba(201, 169, 98, 0.3);
          margin-top: 10px;
        }

        .form-submit:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 40px rgba(201, 169, 98, 0.5);
        }

        @media (max-width: 1024px) {
          .contact { padding: 100px 40px; }
        }

        @media (max-width: 768px) {
          .contact { padding: 80px 24px; }
          .form-row { grid-template-columns: 1fr; }
          .contact-desc { font-size: 1rem; }
        }

        /* ==================== FOOTER ==================== */
        .footer {
          padding: 60px 80px;
          border-top: 1px solid rgba(201, 169, 98, 0.15);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-logo {
          height: 70px;
          width: auto;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .footer-logo:hover {
          opacity: 1;
        }

        .footer-links {
          display: flex;
          gap: 40px;
        }

        .footer-link {
          color: rgba(248, 246, 241, 0.5);
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: var(--gold);
        }

        .footer-copy {
          font-size: 0.8rem;
          color: rgba(248, 246, 241, 0.4);
        }

        /* ==================== RESPONSIVE ==================== */
        @media (max-width: 1200px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .nav { padding: 15px 30px; }
          .hero-content { padding: 0 40px; }
          .portfolio { padding: 100px 40px; }
          
          .philosophy {
            grid-template-columns: 1fr;
          }
          .philosophy-visual {
            min-height: 500px;
          }
          .philosophy-content {
            padding: 80px 40px;
          }
          .philosophy-content::before {
            display: none;
          }

          .immersive { padding: 100px 40px; }
          .footer { padding: 40px 30px; }
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-logo { height: 45px; }
          
          .hero-content { padding: 0 24px; }
          .hero-label { padding: 10px 18px; }
          .hero-desc { font-size: 1rem; }
          .hero-buttons { flex-direction: column; }
          .btn-primary, .btn-secondary { width: 100%; text-align: center; }

          .portfolio { padding: 80px 24px; }
          .portfolio-grid { grid-template-columns: 1fr; gap: 20px; }
          .section-header { margin-bottom: 60px; }

          .philosophy-visual { min-height: 400px; }
          .philosophy-img { 
            width: 45% !important;
            height: auto !important;
            aspect-ratio: 4/3;
          }
          .philosophy-img-1 { top: 10%; left: 5%; }
          .philosophy-img-2 { top: 35%; left: 50%; }
          .philosophy-img-3 { top: 60%; left: 20%; }
          .philosophy-content { padding: 60px 24px; }
          .philosophy-stats { gap: 15px; }
          .stat { padding: 20px 15px; }
          .stat-number { font-size: 2.5rem; }

          .immersive { padding: 80px 24px; }
          
          .footer {
            flex-direction: column;
            gap: 30px;
            text-align: center;
          }
          .footer-links { flex-wrap: wrap; justify-content: center; gap: 20px; }
        }
      `}</style>

      {/* Navigation */}
      <nav className="nav">
        <img src="/vds-logo.gif" alt="Vision Design Studio" className="nav-logo" />
        <div className="nav-links">
          <a href="#portfolio" className="nav-link">Portfolio</a>
          <a href="#philosophy" className="nav-link">Philosophy</a>
          <a href="#immersive" className="nav-link">Immersive Experience</a>
          <Link href="/vds" className="nav-cta">Enter Studio</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-gradient" />
          <img src={images.hero} alt="" className="hero-bg-image" />
          <div className="hero-particles">
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-label">
            <span className="hero-label-dot" />
            <span className="hero-label-text">Luxury Design Excellence</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line">Vision</span>
            <span className="hero-title-line hero-title-italic">Design Studio</span>
          </h1>
          <p className="hero-desc">
            Where architecture, interior design, and landscape converge into spaces 
            that elevate life and inspire the soul. Experience design without boundaries.
          </p>
          <div className="hero-buttons">
            <Link href="/vds" className="btn-primary">Enter Virtual Studio</Link>
            <a href="#portfolio" className="btn-secondary">View Our Work</a>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-text">Scroll to Explore</span>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio" id="portfolio">
        <div className="portfolio-bg" />
        <div className="section-header vds-reveal">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">The Collection</span>
            <span className="section-label-line" />
          </div>
          <h2 className="section-title">Visionary <span>Spaces</span></h2>
        </div>

        <div className="portfolio-grid">
          <div className="portfolio-card vds-reveal">
            <img src={images.lobby} alt="Residential" className="portfolio-card-image" />
            <div className="portfolio-card-overlay" />
            <span className="portfolio-card-arrow">→</span>
            <div className="portfolio-card-content">
              <div className="portfolio-card-number">01</div>
              <h3 className="portfolio-card-title">Residential</h3>
              <p className="portfolio-card-desc">Bespoke living spaces where luxury meets comfort. From modern sanctuaries to timeless elegance.</p>
            </div>
          </div>

          <div className="portfolio-card vds-reveal">
            <img src={images.kitchen} alt="Commercial" className="portfolio-card-image" />
            <div className="portfolio-card-overlay" />
            <span className="portfolio-card-arrow">→</span>
            <div className="portfolio-card-content">
              <div className="portfolio-card-number">02</div>
              <h3 className="portfolio-card-title">Commercial</h3>
              <p className="portfolio-card-desc">Spaces that inspire success. Corporate lobbies, offices, and hospitality venues designed to impress.</p>
            </div>
          </div>

          <div className="portfolio-card vds-reveal">
            <img src={images.pool} alt="Outdoor Living" className="portfolio-card-image" />
            <div className="portfolio-card-overlay" />
            <span className="portfolio-card-arrow">→</span>
            <div className="portfolio-card-content">
              <div className="portfolio-card-number">03</div>
              <h3 className="portfolio-card-title">Outdoor Living</h3>
              <p className="portfolio-card-desc">Where architecture meets nature. Poolside paradises and garden sanctuaries that extend your world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy" id="philosophy">
        <div className="philosophy-visual">
          <div className="philosophy-glow" />
          <div className="philosophy-images">
            <div className="philosophy-img philosophy-img-1">
              <img src={images.landscape} alt="Design Philosophy" />
            </div>
            <div className="philosophy-img philosophy-img-2">
              <img src={images.residence} alt="Interior Design" />
            </div>
            <div className="philosophy-img philosophy-img-3">
              <img src={images.poolTerrace} alt="Outdoor Design" />
            </div>
          </div>
        </div>

        <div className="philosophy-content">
          <div className="section-label vds-reveal">
            <span className="section-label-line" />
            <span className="section-label-text">Our Philosophy</span>
          </div>
          <h2 className="philosophy-title vds-reveal">
            Design that speaks <span>to the soul</span>
          </h2>
          <p className="philosophy-text vds-reveal">
            Every space tells a story. We believe in creating environments that don't just 
            house life—they elevate it. Through careful curation of light, texture, and form, 
            we craft spaces that resonate with their inhabitants on a profound, emotional level.
          </p>
          <div className="philosophy-stats vds-reveal">
            <div className="stat">
              <div className="stat-number">20+</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
            <div className="stat">
              <div className="stat-number">150+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat">
              <div className="stat-number">∞</div>
              <div className="stat-label">Possibilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Experience Section */}
      <section className="immersive" id="immersive">
        <div className="immersive-bg" />
        <div className="immersive-content">
          <div className="section-header vds-reveal">
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">Step Inside</span>
              <span className="section-label-line" />
            </div>
            <h2 className="section-title">Immersive <span>Experience</span></h2>
          </div>

          <div className="immersive-preview vds-reveal">
            <img src={images.landscape} alt="Immersive Preview" className="immersive-preview-image" />
            <div className="immersive-preview-overlay">
              <div className="immersive-preview-icon">▶</div>
              <span className="immersive-preview-text">Experience Your Future Space</span>
            </div>
          </div>

          <Link href="/vds" className="immersive-btn vds-reveal">
            Enter Virtual Studio
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="testimonials-bg" />
        <div className="section-header">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Client Stories</span>
            <span className="section-label-line" />
          </div>
          <h2 className="section-title">What People <span>Say</span></h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-quote">
              Vision Design Studio transformed our space into a timeless sanctuary. Every detail reflects thoughtfulness and artistry.
            </p>
            <div className="testimonial-author">
              <span className="testimonial-name">Aya Nakamura</span>
              <span className="testimonial-role">Homeowner</span>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              The team combined luxury with thoughtful detail, exceeding our expectations at every turn. Truly visionary work.
            </p>
            <div className="testimonial-author">
              <span className="testimonial-name">Mateo García</span>
              <span className="testimonial-role">Business Owner</span>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-quote">
              They didn't just design a space — they understood how we wanted to feel in it. The result is beyond what we imagined.
            </p>
            <div className="testimonial-author">
              <span className="testimonial-name">Sarah Chen</span>
              <span className="testimonial-role">Interior Enthusiast</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="contact-bg" />
        <div className="contact-content">
          <div className="section-header">
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">Get In Touch</span>
              <span className="section-label-line" />
            </div>
            <h2 className="section-title">Contact <span>Us</span></h2>
          </div>
          <p className="contact-desc">
            Ready to transform your space? We'd love to hear about your vision. 
            Reach out for a confidential consultation.
          </p>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <input type="text" placeholder="Your Name" className="form-input" required />
              <input type="email" placeholder="Your Email" className="form-input" required />
            </div>
            <input type="text" placeholder="Subject" className="form-input" />
            <textarea placeholder="Tell us about your project..." className="form-textarea" rows={5} required />
            <button type="submit" className="form-submit">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <img src="/vds-logo.gif" alt="Vision Design Studio" className="footer-logo" />
        <div className="footer-links">
          <a href="#portfolio" className="footer-link">Portfolio</a>
          <a href="#philosophy" className="footer-link">Philosophy</a>
          <a href="#immersive" className="footer-link">Experience</a>
          <Link href="/vds" className="footer-link">Enter Studio</Link>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Vision Design Studio. All rights reserved.</p>
      </footer>

      {/* VERA Bubble */}
      <VeraBubble 
        isPremium={false}
        context="home"
        onUpgradeClick={() => window.location.href = '/pricing'}
      />
    </div>
  )
}