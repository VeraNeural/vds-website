'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import VeraBubble from '@/components/vds/VeraBubble'

export default function OutdoorPage() {
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

    const reveals = document.querySelectorAll('.outdoor-reveal')
    reveals.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      title: 'Pool & Water Features',
      description: 'Serene pools, dramatic fountains, and tranquil water elements that transform your outdoor space.',
    },
    {
      title: 'Garden Design',
      description: 'Thoughtfully curated landscapes that evolve with the seasons and mature with time.',
    },
    {
      title: 'Outdoor Living Rooms',
      description: 'Covered patios, pergolas, and lounging areas that extend your home into nature.',
    },
    {
      title: 'Al Fresco Dining',
      description: 'Outdoor kitchens and dining spaces designed for memorable gatherings under the sky.',
    },
  ]

  const principles = [
    {
      number: '01',
      title: 'Nature as Partner',
      text: 'We don\'t fight the landscape—we collaborate with it. Sun patterns, prevailing winds, and native flora inform every design decision.',
    },
    {
      number: '02',
      title: 'Year-Round Living',
      text: 'Florida\'s climate is a gift. We design spaces that embrace every season, from cool winter evenings to warm summer days.',
    },
    {
      number: '03',
      title: 'Seamless Transition',
      text: 'The best outdoor spaces feel like natural extensions of the home, with consistent materials and design language throughout.',
    },
  ]

  return (
    <div className="outdoor-page">
      <style jsx>{`
        .outdoor-page {
          min-height: 100vh;
          padding-top: 100px;
        }

        .outdoor-hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          position: relative;
        }

        .outdoor-hero-content {
          max-width: 900px;
          text-align: center;
        }

        .outdoor-hero-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 40px;
          opacity: 0;
          animation: outdoorFadeUp 1s ease forwards 0.3s;
        }

        .outdoor-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 300;
          line-height: 1;
          margin-bottom: 20px;
          opacity: 0;
          animation: outdoorFadeUp 1s ease forwards 0.5s;
        }

        .outdoor-hero-title span {
          display: block;
          font-style: italic;
          color: var(--vds-gold);
          font-size: 0.6em;
          margin-top: 10px;
        }

        .outdoor-hero-subtitle {
          font-size: 1.1rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(248, 246, 241, 0.7);
          max-width: 600px;
          margin: 0 auto 50px;
          opacity: 0;
          animation: outdoorFadeUp 1s ease forwards 0.7s;
        }

        .outdoor-hero-line {
          width: 1px;
          height: 80px;
          background: linear-gradient(to bottom, var(--vds-gold), transparent);
          margin: 0 auto;
          opacity: 0;
          animation: outdoorFadeUp 1s ease forwards 0.9s;
        }

        @keyframes outdoorFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .outdoor-philosophy {
          padding: 120px 40px;
          position: relative;
        }

        .outdoor-philosophy-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }

        .outdoor-philosophy-content {
          padding-right: 40px;
        }

        .outdoor-philosophy-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 30px;
        }

        .outdoor-philosophy-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 30px;
        }

        .outdoor-philosophy-text {
          font-size: 1rem;
          font-weight: 300;
          line-height: 2;
          color: rgba(248, 246, 241, 0.7);
          margin-bottom: 20px;
        }

        .outdoor-philosophy-visual {
          position: relative;
          height: 500px;
        }

        .outdoor-philosophy-wave {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(123, 163, 179, 0.4), transparent);
          animation: waveFloat 3s ease-in-out infinite;
        }

        .outdoor-philosophy-wave-1 { top: 30%; animation-delay: 0s; }
        .outdoor-philosophy-wave-2 { top: 45%; animation-delay: 0.5s; }
        .outdoor-philosophy-wave-3 { top: 60%; animation-delay: 1s; }
        .outdoor-philosophy-wave-4 { top: 75%; animation-delay: 1.5s; }

        @keyframes waveFloat {
          0%, 100% { transform: translateX(-20px); opacity: 0.3; }
          50% { transform: translateX(20px); opacity: 0.8; }
        }

        .outdoor-philosophy-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .outdoor-philosophy-label-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 300;
          color: var(--vds-gold);
          letter-spacing: 0.1em;
        }

        .outdoor-philosophy-label-sub {
          font-size: 0.6rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(248, 246, 241, 0.5);
          margin-top: 10px;
        }

        @media (max-width: 900px) {
          .outdoor-philosophy-inner {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .outdoor-philosophy-content {
            padding-right: 0;
            text-align: center;
          }
          .outdoor-philosophy-visual {
            height: 300px;
          }
        }

        .outdoor-services {
          padding: 120px 40px;
          background: linear-gradient(to bottom, transparent, rgba(123, 163, 179, 0.03), transparent);
        }

        .outdoor-services-inner {
          max-width: 1000px;
          margin: 0 auto;
        }

        .outdoor-services-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .outdoor-services-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 20px;
        }

        .outdoor-services-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
        }

        .outdoor-services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .outdoor-service {
          padding: 50px;
          border: 1px solid rgba(201, 169, 98, 0.15);
          border-radius: 20px;
          transition: all 0.5s ease;
          position: relative;
          overflow: hidden;
        }

        .outdoor-service::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(123, 163, 179, 0.05) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .outdoor-service:hover::before {
          opacity: 1;
        }

        .outdoor-service:hover {
          border-color: rgba(201, 169, 98, 0.4);
          transform: translateY(-5px);
        }

        .outdoor-service-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 15px;
          position: relative;
          z-index: 1;
        }

        .outdoor-service-desc {
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.6);
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .outdoor-services-grid {
            grid-template-columns: 1fr;
          }
          .outdoor-service {
            padding: 35px;
          }
        }

        .outdoor-principles {
          padding: 120px 40px;
        }

        .outdoor-principles-inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .outdoor-principles-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .outdoor-principles-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--vds-gold);
          margin-bottom: 20px;
        }

        .outdoor-principles-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
        }

        .outdoor-principles-list {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .outdoor-principle {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 40px;
          align-items: start;
        }

        .outdoor-principle-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          color: var(--vds-gold);
          opacity: 0.5;
          line-height: 1;
        }

        .outdoor-principle-content {
          padding-top: 5px;
        }

        .outdoor-principle-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 15px;
        }

        .outdoor-principle-text {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(248, 246, 241, 0.6);
        }

        @media (max-width: 768px) {
          .outdoor-principle {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          .outdoor-principle-number {
            font-size: 2rem;
          }
        }

        .outdoor-cta {
          padding: 120px 40px;
          text-align: center;
          background: linear-gradient(to bottom, transparent, rgba(201, 169, 98, 0.03), transparent);
        }

        .outdoor-cta-inner {
          max-width: 600px;
          margin: 0 auto;
        }

        .outdoor-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          margin-bottom: 20px;
        }

        .outdoor-cta-title span {
          color: var(--vds-gold);
          font-style: italic;
        }

        .outdoor-cta-text {
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.8;
          color: rgba(248, 246, 241, 0.6);
          margin-bottom: 50px;
        }

        .outdoor-cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .outdoor-cta-button {
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

        .outdoor-cta-button::before {
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

        .outdoor-cta-button:hover {
          color: var(--vds-noir);
        }

        .outdoor-cta-button:hover::before {
          left: 0;
        }

        .outdoor-cta-button-secondary {
          border-color: rgba(248, 246, 241, 0.3);
          color: var(--vds-pearl);
        }

        .outdoor-cta-button-secondary::before {
          background: var(--vds-pearl);
        }

        .outdoor-cta-button-secondary:hover {
          color: var(--vds-noir);
        }

        .outdoor-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .outdoor-reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .outdoor-hero,
          .outdoor-philosophy,
          .outdoor-services,
          .outdoor-principles,
          .outdoor-cta {
            padding-left: 24px;
            padding-right: 24px;
          }
        }
      `}</style>

      <section className="outdoor-hero">
        <div className="outdoor-hero-content">
          <p className="outdoor-hero-eyebrow">Landscape Design</p>
          <h1 className="outdoor-hero-title">
            Outdoor Living
            <span>Where Nature Meets Design</span>
          </h1>
          <p className="outdoor-hero-subtitle">
            The boundary between inside and outside dissolves in thoughtful outdoor design. 
            We create exterior spaces that extend your living area into nature, 
            offering sanctuary under open skies.
          </p>
          <div className="outdoor-hero-line" />
        </div>
      </section>

      <section className="outdoor-philosophy">
        <div className="outdoor-philosophy-inner outdoor-reveal">
          <div className="outdoor-philosophy-content">
            <p className="outdoor-philosophy-eyebrow">Our Approach</p>
            <h2 className="outdoor-philosophy-title">
              Bringing the Indoors Out
            </h2>
            <p className="outdoor-philosophy-text">
              Florida offers a rare gift: the ability to live outdoors nearly year-round. 
              We design spaces that honor this privilege, creating outdoor rooms 
              that feel as considered and comfortable as any interior.
            </p>
            <p className="outdoor-philosophy-text">
              From morning coffee by the pool to evening gatherings under string lights, 
              our outdoor spaces become the backdrop for life's most treasured moments.
            </p>
          </div>
          <div className="outdoor-philosophy-visual">
            <div className="outdoor-philosophy-wave outdoor-philosophy-wave-1" />
            <div className="outdoor-philosophy-wave outdoor-philosophy-wave-2" />
            <div className="outdoor-philosophy-wave outdoor-philosophy-wave-3" />
            <div className="outdoor-philosophy-wave outdoor-philosophy-wave-4" />
            <div className="outdoor-philosophy-label">
              <div className="outdoor-philosophy-label-text">6 Video Tours</div>
              <div className="outdoor-philosophy-label-sub">Experience Our Work</div>
            </div>
          </div>
        </div>
      </section>

      <section className="outdoor-services">
        <div className="outdoor-services-inner">
          <div className="outdoor-services-header outdoor-reveal">
            <p className="outdoor-services-eyebrow">What We Create</p>
            <h2 className="outdoor-services-title">Spaces Under the Sky</h2>
          </div>
          <div className="outdoor-services-grid outdoor-reveal">
            {services.map((service, index) => (
              <div key={index} className="outdoor-service">
                <h3 className="outdoor-service-title">{service.title}</h3>
                <p className="outdoor-service-desc">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="outdoor-principles">
        <div className="outdoor-principles-inner">
          <div className="outdoor-principles-header outdoor-reveal">
            <p className="outdoor-principles-eyebrow">Our Principles</p>
            <h2 className="outdoor-principles-title">Designing with Nature</h2>
          </div>
          <div className="outdoor-principles-list outdoor-reveal">
            {principles.map((principle, index) => (
              <div key={index} className="outdoor-principle">
                <div className="outdoor-principle-number">{principle.number}</div>
                <div className="outdoor-principle-content">
                  <h3 className="outdoor-principle-title">{principle.title}</h3>
                  <p className="outdoor-principle-text">{principle.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="outdoor-cta">
        <div className="outdoor-cta-inner outdoor-reveal">
          <h2 className="outdoor-cta-title">
            Experience <span>Outdoor Living</span>
          </h2>
          <p className="outdoor-cta-text">
            Explore our collection of outdoor spaces through immersive video walkthroughs. 
            See how we transform backyards into private resorts.
          </p>
          <div className="outdoor-cta-buttons">
            <Link href="/vds/portfolio/outdoor-living" className="outdoor-cta-button">
              View Portfolio
            </Link>
            <Link href="/vds/visionary" className="outdoor-cta-button outdoor-cta-button-secondary">
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