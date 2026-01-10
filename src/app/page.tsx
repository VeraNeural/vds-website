'use client'

import { useEffect, useState } from 'react'

export default function VDSHomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => setLoaded(true), 100)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [loaded])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

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
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@200;300;400;500;600&display=swap');
        
        :root {
          --gold: #C9A962;
          --gold-light: #E8D5A3;
          --gold-dark: #A88B4A;
          --pearl: #F8F6F1;
          --pearl-dim: rgba(248, 246, 241, 0.7);
          --noir: #080808;
          --noir-light: #0f0f0f;
          --noir-lighter: #161616;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        html { scroll-behavior: smooth; }
        
        body { 
          font-family: 'Outfit', -apple-system, sans-serif;
          background: var(--noir);
          color: var(--pearl);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        ::selection {
          background: var(--gold);
          color: var(--noir);
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes glow {
          0%, 100% { opacity: 0.4; filter: blur(40px); }
          50% { opacity: 0.6; filter: blur(50px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }

        @keyframes breathe {
          0%, 100% { box-shadow: 0 0 30px rgba(201, 169, 98, 0.3); }
          50% { box-shadow: 0 0 50px rgba(201, 169, 98, 0.5); }
        }

        @keyframes particle {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: var(--noir);
          position: relative;
        }

        /* ===================== PARTICLES ===================== */
        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: var(--gold);
          border-radius: 50%;
          animation: particle 20s linear infinite;
        }

        .particle:nth-child(1) { left: 10%; animation-delay: 0s; animation-duration: 25s; }
        .particle:nth-child(2) { left: 20%; animation-delay: -5s; animation-duration: 20s; }
        .particle:nth-child(3) { left: 30%; animation-delay: -10s; animation-duration: 28s; }
        .particle:nth-child(4) { left: 40%; animation-delay: -15s; animation-duration: 22s; }
        .particle:nth-child(5) { left: 50%; animation-delay: -2s; animation-duration: 26s; }
        .particle:nth-child(6) { left: 60%; animation-delay: -8s; animation-duration: 24s; }
        .particle:nth-child(7) { left: 70%; animation-delay: -12s; animation-duration: 27s; }
        .particle:nth-child(8) { left: 80%; animation-delay: -18s; animation-duration: 21s; }
        .particle:nth-child(9) { left: 90%; animation-delay: -4s; animation-duration: 23s; }
        .particle:nth-child(10) { left: 95%; animation-delay: -14s; animation-duration: 29s; }

        /* ===================== NAV ===================== */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: ${scrolled ? '12px 60px' : '24px 60px'};
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: ${scrolled ? 'rgba(8, 8, 8, 0.95)' : 'transparent'};
          backdrop-filter: ${scrolled ? 'blur(20px) saturate(180%)' : 'none'};
          border-bottom: 1px solid ${scrolled ? 'rgba(201, 169, 98, 0.1)' : 'transparent'};
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-logo {
          height: ${scrolled ? '50px' : '70px'};
          width: auto;
          transition: all 0.5s ease;
          filter: drop-shadow(0 0 20px rgba(201, 169, 98, 0.3));
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 50px;
        }

        .nav-link {
          color: var(--pearl-dim);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          transition: width 0.4s ease;
        }

        .nav-link:hover { color: var(--pearl); }
        .nav-link:hover::after { width: 100%; }

        .nav-cta {
          padding: 14px 36px;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
          color: var(--noir);
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-radius: 50px;
          transition: all 0.4s ease;
          box-shadow: 0 4px 25px rgba(201, 169, 98, 0.4);
        }

        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 35px rgba(201, 169, 98, 0.5);
        }

        /* ===================== HERO ===================== */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 0 60px;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }

        .hero-bg-image {
          position: absolute;
          top: 0;
          right: 0;
          width: 60%;
          height: 100%;
          object-fit: cover;
          opacity: ${loaded ? 0.4 : 0};
          transition: opacity 1.5s ease;
          mask-image: linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 100%);
          -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 100%);
        }

        .hero-glow {
          position: absolute;
          top: 30%;
          right: 20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(201, 169, 98, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          animation: glow 6s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-glow-2 {
          position: absolute;
          bottom: 20%;
          left: 10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(201, 169, 98, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: glow 8s ease-in-out infinite;
          animation-delay: -3s;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          opacity: ${loaded ? 1 : 0};
          transform: translateY(${loaded ? '0' : '60px'});
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 28px;
          background: rgba(201, 169, 98, 0.08);
          border: 1px solid rgba(201, 169, 98, 0.25);
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
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 7vw, 6rem);
          font-weight: 300;
          line-height: 1.05;
          margin-bottom: 30px;
          letter-spacing: -0.02em;
        }

        .hero-title-accent {
          display: block;
          font-style: italic;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .hero-desc {
          font-size: 1.15rem;
          font-weight: 300;
          line-height: 1.9;
          color: var(--pearl-dim);
          margin-bottom: 50px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .btn-primary {
          padding: 20px 50px;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
          color: var(--noir);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 4px 30px rgba(201, 169, 98, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 45px rgba(201, 169, 98, 0.5);
        }

        .btn-outline {
          padding: 20px 50px;
          background: transparent;
          color: var(--pearl);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border-radius: 50px;
          border: 1px solid rgba(248, 246, 241, 0.3);
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .btn-outline:hover {
          background: rgba(248, 246, 241, 0.08);
          border-color: rgba(248, 246, 241, 0.5);
        }

        .hero-scroll {
          position: absolute;
          bottom: 60px;
          left: 60px;
          display: flex;
          align-items: center;
          gap: 20px;
          opacity: ${loaded ? 0.7 : 0};
          transition: opacity 1s ease 1s;
        }

        .hero-scroll-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, var(--gold), transparent);
        }

        .hero-scroll-text {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
        }

        /* ===================== SECTION STYLES ===================== */
        .section {
          padding: 150px 60px;
          position: relative;
        }

        .section-noir { background: var(--noir); }
        .section-noir-light { background: var(--noir-light); }

        .section-header {
          text-align: center;
          margin-bottom: 100px;
        }

        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .section-label-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .section-label-text {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          font-weight: 300;
          line-height: 1.1;
        }

        .section-title span {
          font-style: italic;
          color: var(--gold);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* ===================== VDS SECTION ===================== */
        .vds {
          background: var(--noir-light);
          position: relative;
          overflow: hidden;
        }

        .vds-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(201, 169, 98, 0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        .vds-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .vds-text .partnership {
          display: inline-block;
          padding: 12px 24px;
          background: rgba(201, 169, 98, 0.08);
          border: 1px solid rgba(201, 169, 98, 0.25);
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 35px;
        }

        .vds-text h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 30px;
        }

        .vds-text h2 span {
          font-style: italic;
          color: var(--gold);
        }

        .vds-text p {
          font-size: 1.05rem;
          font-weight: 300;
          line-height: 1.9;
          color: var(--pearl-dim);
          margin-bottom: 20px;
        }

        .vds-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-top: 50px;
        }

        .vds-feature {
          padding: 30px 25px;
          background: rgba(201, 169, 98, 0.03);
          border: 1px solid rgba(201, 169, 98, 0.1);
          border-radius: 16px;
          transition: all 0.4s ease;
        }

        .vds-feature:hover {
          background: rgba(201, 169, 98, 0.08);
          border-color: rgba(201, 169, 98, 0.3);
          transform: translateY(-8px);
        }

        .vds-feature h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 400;
          color: var(--gold);
          margin-bottom: 12px;
        }

        .vds-feature p {
          font-size: 0.9rem;
          color: var(--pearl-dim);
          line-height: 1.6;
          margin: 0;
        }

        .vds-images {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          position: relative;
        }

        .vds-images::before {
          content: '';
          position: absolute;
          top: -30px;
          right: -30px;
          width: 200px;
          height: 200px;
          border: 1px solid rgba(201, 169, 98, 0.15);
          border-radius: 20px;
          pointer-events: none;
        }

        .vds-img {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          transition: all 0.5s ease;
        }

        .vds-img:hover {
          transform: scale(1.03);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
        }

        .vds-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .vds-img:hover img {
          transform: scale(1.1);
        }

        .vds-img.tall {
          grid-row: span 2;
        }

        /* ===================== WORK SECTION ===================== */
        .work-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        .work-card {
          position: relative;
          aspect-ratio: 3/4;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          group: work;
        }

        .work-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 1px solid rgba(201, 169, 98, 0);
          border-radius: 20px;
          transition: border-color 0.4s ease;
          z-index: 3;
          pointer-events: none;
        }

        .work-card:hover::before {
          border-color: rgba(201, 169, 98, 0.5);
        }

        .work-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .work-card:hover img {
          transform: scale(1.15);
        }

        .work-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(201, 169, 98, 0) 0%, rgba(8, 8, 8, 0) 40%, rgba(8, 8, 8, 0.95) 100%);
          transition: background 0.5s ease;
          z-index: 1;
        }

        .work-card:hover .work-card-overlay {
          background: linear-gradient(180deg, rgba(201, 169, 98, 0.1) 0%, rgba(8, 8, 8, 0.3) 40%, rgba(8, 8, 8, 0.98) 100%);
        }

        .work-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 35px 30px;
          z-index: 2;
          transform: translateY(20px);
          transition: transform 0.5s ease;
        }

        .work-card:hover .work-card-content {
          transform: translateY(0);
        }

        .work-card-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 4rem;
          font-weight: 300;
          color: var(--gold);
          opacity: 0.3;
          line-height: 1;
          margin-bottom: 10px;
        }

        .work-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 400;
          margin-bottom: 10px;
        }

        .work-card p {
          font-size: 0.9rem;
          color: var(--pearl-dim);
          line-height: 1.5;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.4s ease 0.1s;
        }

        .work-card:hover p {
          opacity: 1;
          transform: translateY(0);
        }

        .work-card-arrow {
          position: absolute;
          top: 25px;
          right: 25px;
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
          transform: translateX(-10px) rotate(-45deg);
          transition: all 0.4s ease;
          z-index: 2;
        }

        .work-card:hover .work-card-arrow {
          opacity: 1;
          transform: translateX(0) rotate(-45deg);
        }

        /* ===================== GALLERY SECTION ===================== */
        .gallery {
          background: linear-gradient(180deg, var(--noir) 0%, var(--noir-light) 100%);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 20px;
          height: 700px;
        }

        .gallery-item {
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }

        .gallery-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 1px solid rgba(201, 169, 98, 0);
          border-radius: 20px;
          transition: border-color 0.4s ease;
          z-index: 2;
          pointer-events: none;
        }

        .gallery-item:hover::before {
          border-color: rgba(201, 169, 98, 0.4);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.08);
        }

        .gallery-item.large {
          grid-row: span 2;
        }

        /* ===================== TESTIMONIALS ===================== */
        .testimonials {
          background: var(--noir-light);
          position: relative;
          overflow: hidden;
        }

        .testimonials-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 300px;
          background: radial-gradient(ellipse 50% 100% at 50% 0%, rgba(201, 169, 98, 0.08) 0%, transparent 100%);
          pointer-events: none;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          position: relative;
          z-index: 1;
        }

        .testimonial-card {
          padding: 50px 40px;
          background: rgba(248, 246, 241, 0.02);
          border: 1px solid rgba(201, 169, 98, 0.1);
          border-radius: 24px;
          text-align: center;
          transition: all 0.5s ease;
          position: relative;
        }

        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: 6rem;
          color: var(--gold);
          opacity: 0.15;
          line-height: 1;
          pointer-events: none;
        }

        .testimonial-card:hover {
          background: rgba(201, 169, 98, 0.05);
          border-color: rgba(201, 169, 98, 0.25);
          transform: translateY(-10px);
        }

        .testimonial-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-style: italic;
          line-height: 1.7;
          color: var(--pearl);
          margin-bottom: 35px;
          position: relative;
          z-index: 1;
        }

        .testimonial-name {
          font-size: 1rem;
          font-weight: 500;
          color: var(--gold);
          letter-spacing: 0.05em;
          margin-bottom: 5px;
        }

        .testimonial-role {
          font-size: 0.75rem;
          color: var(--pearl-dim);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        /* ===================== AWARD ===================== */
        .award {
          background: var(--noir);
          position: relative;
        }

        .award-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(201, 169, 98, 0.1) 0%, transparent 60%);
          pointer-events: none;
        }

        .award-content {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .award-img {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }

        .award-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .award-img:hover img {
          transform: scale(1.05);
        }

        .award-text {
          text-align: center;
        }

        .award-text h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 5vw, 5rem);
          font-weight: 300;
          margin-bottom: 20px;
        }

        .award-text h2 span {
          font-style: italic;
          color: var(--gold);
        }

        .award-text p {
          font-size: 1.1rem;
          color: var(--pearl-dim);
          margin-bottom: 40px;
          line-height: 1.7;
        }

        /* ===================== CONTACT ===================== */
        .contact {
          background: linear-gradient(180deg, var(--noir-light) 0%, var(--noir) 100%);
          position: relative;
        }

        .contact-glow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 400px;
          background: radial-gradient(ellipse 50% 100% at 50% 100%, rgba(201, 169, 98, 0.08) 0%, transparent 100%);
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
          color: var(--pearl-dim);
          line-height: 1.8;
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
          padding: 20px 25px;
          background: rgba(248, 246, 241, 0.03);
          border: 1px solid rgba(201, 169, 98, 0.15);
          border-radius: 14px;
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
          box-shadow: 0 0 0 3px rgba(201, 169, 98, 0.1);
        }

        .form-textarea {
          min-height: 160px;
          resize: vertical;
        }

        .form-success {
          padding: 30px;
          background: rgba(201, 169, 98, 0.1);
          border: 1px solid rgba(201, 169, 98, 0.3);
          border-radius: 14px;
          color: var(--gold);
          font-size: 1.1rem;
        }

        /* ===================== FOOTER ===================== */
        .footer {
          padding: 50px 60px;
          background: var(--noir);
          border-top: 1px solid rgba(201, 169, 98, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-logo {
          height: 50px;
          width: auto;
          opacity: 0.6;
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
          color: var(--pearl-dim);
          text-decoration: none;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: var(--gold);
        }

        .footer-copy {
          font-size: 0.8rem;
          color: rgba(248, 246, 241, 0.4);
        }

        /* ===================== VERA BUBBLE ===================== */
        .vera-bubble {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, var(--gold-light) 0%, var(--gold) 50%, var(--gold-dark) 100%);
          box-shadow: 0 8px 35px rgba(201, 169, 98, 0.5);
          cursor: pointer;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.4s ease;
          animation: breathe 3s ease-in-out infinite;
        }

        .vera-bubble:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 50px rgba(201, 169, 98, 0.6);
        }

        .vera-bubble-tooltip {
          position: absolute;
          right: 85px;
          background: var(--noir-light);
          padding: 14px 22px;
          border-radius: 12px;
          border: 1px solid rgba(201, 169, 98, 0.2);
          font-size: 0.85rem;
          color: var(--gold);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          white-space: nowrap;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .vera-bubble:hover .vera-bubble-tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        /* ===================== RESPONSIVE ===================== */
        @media (max-width: 1200px) {
          .work-grid { grid-template-columns: repeat(2, 1fr); }
          .gallery-grid { grid-template-columns: 1fr 1fr; height: auto; }
          .gallery-item { height: 300px; }
          .gallery-item.large { grid-row: span 1; }
        }

        @media (max-width: 1024px) {
          .section { padding: 100px 40px; }
          .nav { padding: 15px 40px; }
          .hero { padding: 0 40px; }
          .vds-content { grid-template-columns: 1fr; gap: 60px; }
          .vds-features { grid-template-columns: 1fr 1fr; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .award-content { grid-template-columns: 1fr; text-align: center; }
          .award-img:last-child { display: none; }
          .footer { padding: 40px; }
        }

        @media (max-width: 768px) {
          .nav { padding: 15px 24px; }
          .nav-links { display: none; }
          .nav-logo { height: 45px; }
          .section { padding: 80px 24px; }
          .hero { padding: 0 24px; }
          .hero-content { max-width: 100%; }
          .hero-buttons { flex-direction: column; }
          .btn-primary, .btn-outline { width: 100%; text-align: center; }
          .hero-scroll { display: none; }
          .vds-features { grid-template-columns: 1fr; }
          .work-grid { grid-template-columns: 1fr; }
          .gallery-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .footer { flex-direction: column; gap: 30px; text-align: center; }
          .footer-links { flex-wrap: wrap; justify-content: center; }
          .vera-bubble { width: 60px; height: 60px; bottom: 20px; right: 20px; }
          .vera-bubble-tooltip { display: none; }
        }
      `}</style>

      <div className="page">
        {/* Particles */}
        <div className="particles">
          {[...Array(10)].map((_, i) => <div key={i} className="particle" />)}
        </div>

        {/* Nav */}
        <nav className="nav">
          <img src="/vds-logo.gif" alt="Vision Design Studio" className="nav-logo" />
          <div className="nav-links">
            <a href="#work" className="nav-link">Portfolio</a>
            <a href="#gallery" className="nav-link">Gallery</a>
            <a href="#testimonials" className="nav-link">Reviews</a>
            <a href="#contact" className="nav-link">Contact</a>
            <a href="https://veraneural.ai/vds" className="nav-cta">Enter Studio</a>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="hero-bg">
            <img src={images.hero} alt="" className="hero-bg-image" />
            <div className="hero-glow" />
            <div className="hero-glow-2" />
          </div>

          <div className="hero-content">
            <div className="hero-label">
              <span className="hero-label-dot" />
              <span className="hero-label-text">Luxury Design Excellence</span>
            </div>
            <h1 className="hero-title">
              <span>Spaces That</span>
              <span className="hero-title-accent">Inspire Living</span>
            </h1>
            <p className="hero-desc">
              Where architecture, interior design, and landscape converge into environments 
              that elevate life and inspire the soul. Experience design without boundaries.
            </p>
            <div className="hero-buttons">
              <a href="https://veraneural.ai/vds" className="btn-primary">Enter Virtual Studio</a>
              <a href="#work" className="btn-outline">View Our Work</a>
            </div>
          </div>

          <div className="hero-scroll">
            <div className="hero-scroll-line" />
            <span className="hero-scroll-text">Scroll to Explore</span>
          </div>
        </section>

        {/* VDS Section */}
        <section className="section vds">
          <div className="vds-glow" />
          <div className="container">
            <div className="vds-content">
              <div className="vds-text">
                <div className="partnership reveal">Partnering with VERANeural</div>
                <h2 className="reveal reveal-delay-1">The Virtual <span>Design Studio</span></h2>
                <p className="reveal reveal-delay-2">
                  Step into your space before it's built. The Virtual Design Studio lets you 
                  visualize, customize, and experience your environment in immersive 3D.
                </p>
                <p className="reveal reveal-delay-3">
                  VERA is your creative companion inside VDS. She helps you explore layouts, 
                  suggest materials, visualize spaces in real-time, and refine your vision 
                  until it feels exactly right.
                </p>
                <div className="vds-features reveal reveal-delay-4">
                  <div className="vds-feature">
                    <h4>Visualize in 3D</h4>
                    <p>Walk through your space. See how light moves, how rooms connect.</p>
                  </div>
                  <div className="vds-feature">
                    <h4>Design with VERA</h4>
                    <p>Tell VERA what you're imagining. She helps bring ideas to life.</p>
                  </div>
                  <div className="vds-feature">
                    <h4>Save & Share</h4>
                    <p>Keep designs, compare versions, share when you're ready.</p>
                  </div>
                </div>
                <div style={{ marginTop: '50px' }} className="reveal">
                  <a href="https://veraneural.ai/vds" className="btn-primary">Enter the Design Studio</a>
                </div>
              </div>
              <div className="vds-images reveal">
                <div className="vds-img tall">
                  <img src={images.landscape} alt="Landscape Design" />
                </div>
                <div className="vds-img">
                  <img src={images.kitchen} alt="Kitchen Design" />
                </div>
                <div className="vds-img">
                  <img src={images.pool} alt="Pool Design" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section className="section section-noir" id="work">
          <div className="container">
            <div className="section-header">
              <div className="section-label reveal">
                <span className="section-label-line" />
                <span className="section-label-text">The Collection</span>
                <span className="section-label-line" />
              </div>
              <h2 className="section-title reveal reveal-delay-1">Visionary <span>Spaces</span></h2>
            </div>

            <div className="work-grid">
              <div className="work-card reveal">
                <img src={images.lobby} alt="Residential" />
                <div className="work-card-overlay" />
                <span className="work-card-arrow">↗</span>
                <div className="work-card-content">
                  <div className="work-card-number">01</div>
                  <h3>Residential</h3>
                  <p>Bespoke living spaces where luxury meets comfort.</p>
                </div>
              </div>

              <div className="work-card reveal reveal-delay-1">
                <img src={images.kitchen} alt="Commercial" />
                <div className="work-card-overlay" />
                <span className="work-card-arrow">↗</span>
                <div className="work-card-content">
                  <div className="work-card-number">02</div>
                  <h3>Commercial</h3>
                  <p>Spaces that inspire success and productivity.</p>
                </div>
              </div>

              <div className="work-card reveal reveal-delay-2">
                <img src={images.pool} alt="Outdoor" />
                <div className="work-card-overlay" />
                <span className="work-card-arrow">↗</span>
                <div className="work-card-content">
                  <div className="work-card-number">03</div>
                  <h3>Outdoor</h3>
                  <p>Where architecture meets nature.</p>
                </div>
              </div>

              <div className="work-card reveal reveal-delay-3">
                <img src={images.residence} alt="VERA Spaces" />
                <div className="work-card-overlay" />
                <span className="work-card-arrow">↗</span>
                <div className="work-card-content">
                  <div className="work-card-number">04</div>
                  <h3>VERA Spaces</h3>
                  <p>Technology meets tranquility.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section gallery" id="gallery">
          <div className="container">
            <div className="section-header">
              <div className="section-label reveal">
                <span className="section-label-line" />
                <span className="section-label-text">Our Gallery</span>
                <span className="section-label-line" />
              </div>
              <h2 className="section-title reveal reveal-delay-1">Curated <span>Excellence</span></h2>
            </div>

            <div className="gallery-grid reveal">
              <div className="gallery-item large">
                <img src={images.landscape} alt="Gallery" />
              </div>
              <div className="gallery-item">
                <img src={images.poolTerrace} alt="Gallery" />
              </div>
              <div className="gallery-item">
                <img src={images.kitchenAlt} alt="Gallery" />
              </div>
              <div className="gallery-item">
                <img src={images.lobby} alt="Gallery" />
              </div>
              <div className="gallery-item">
                <img src={images.residence} alt="Gallery" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section testimonials" id="testimonials">
          <div className="testimonials-glow" />
          <div className="container">
            <div className="section-header">
              <div className="section-label reveal">
                <span className="section-label-line" />
                <span className="section-label-text">Client Stories</span>
                <span className="section-label-line" />
              </div>
              <h2 className="section-title reveal reveal-delay-1">What People <span>Say</span></h2>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card reveal">
                <p className="testimonial-quote">
                  Vision Design Studio transformed our space into a timeless sanctuary.
                </p>
                <p className="testimonial-name">Aya Nakamura</p>
                <p className="testimonial-role">Homeowner</p>
              </div>

              <div className="testimonial-card reveal reveal-delay-1">
                <p className="testimonial-quote">
                  The team combined luxury with thoughtful detail, exceeding our expectations.
                </p>
                <p className="testimonial-name">Mateo García</p>
                <p className="testimonial-role">Business Owner</p>
              </div>

              <div className="testimonial-card reveal reveal-delay-2">
                <p className="testimonial-quote">
                  They understood how we wanted to feel in our space. The result is beyond imagination.
                </p>
                <p className="testimonial-name">Sarah Chen</p>
                <p className="testimonial-role">Interior Enthusiast</p>
              </div>
            </div>
          </div>
        </section>

        {/* Award */}
        <section className="section award">
          <div className="award-glow" />
          <div className="container">
            <div className="award-content">
              <div className="award-img reveal">
                <img src={images.poolTerrace} alt="Award" />
              </div>
              <div className="award-text">
                <h2 className="reveal">Award <span>Winning</span></h2>
                <p className="reveal reveal-delay-1">
                  Recognized for excellence in design, innovation, and client satisfaction.
                </p>
                <a href="https://veraneural.ai/portfolio" className="btn-primary reveal reveal-delay-2">
                  View Full Portfolio
                </a>
              </div>
              <div className="award-img reveal reveal-delay-1">
                <img src={images.kitchenAlt} alt="Award" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section contact" id="contact">
          <div className="contact-glow" />
          <div className="container">
            <div className="contact-content">
              <div className="section-header">
                <div className="section-label reveal">
                  <span className="section-label-line" />
                  <span className="section-label-text">Get In Touch</span>
                  <span className="section-label-line" />
                </div>
                <h2 className="section-title reveal reveal-delay-1">Contact <span>Us</span></h2>
              </div>

              <p className="contact-desc reveal reveal-delay-2">
                Ready to transform your space? We'd love to hear about your vision. 
                Reach out for a confidential consultation.
              </p>

              {submitted ? (
                <div className="form-success reveal">
                  Thank you for your message. We'll be in touch soon.
                </div>
              ) : (
                <form className="contact-form reveal reveal-delay-3" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <textarea
                    className="form-textarea"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <img src="/vds-logo.gif" alt="Vision Design Studio" className="footer-logo" />
          <div className="footer-links">
            <a href="#work" className="footer-link">Portfolio</a>
            <a href="#gallery" className="footer-link">Gallery</a>
            <a href="#testimonials" className="footer-link">Reviews</a>
            <a href="https://veraneural.ai/vds" className="footer-link">Enter Studio</a>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} Vision Design Studio. All rights reserved.</p>
        </footer>

        {/* VERA Bubble */}
        <a href="https://veraneural.ai/sanctuary" target="_blank" rel="noopener noreferrer" className="vera-bubble">
          <span className="vera-bubble-tooltip">Chat with VERA</span>
        </a>
      </div>
    </>
  )
}