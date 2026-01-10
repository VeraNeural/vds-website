'use client'

import { useState } from 'react'
import Link from 'next/link'

const projects = [
  // Featured - Beautiful rendering
  { slug: 'cascading-light', name: 'Cascading Light', category: 'Great Room', image: '/portfolio/residential-render-4.webp', featured: true },
  
  // Renderings (9 total)
  { slug: 'marble-grandeur', name: 'Marble Grandeur', category: 'Living Room', image: '/portfolio/residential-render-1.webp' },
  { slug: 'marble-grandeur-ii', name: 'Marble Grandeur II', category: 'Living Room', image: '/portfolio/residential-render-2.webp' },
  { slug: 'garden-view-living', name: 'Garden View Living', category: 'Living & Dining', image: '/portfolio/residential-render-3.webp' },
  { slug: 'forest-frame', name: 'Forest Frame', category: 'Living & Dining', image: '/portfolio/residential-render-5.webp' },
  { slug: 'timber-and-stone', name: 'Timber & Stone', category: 'Living Room', image: '/portfolio/residential-render-6.webp' },
  { slug: 'cascading-light-ii', name: 'Cascading Light II', category: 'Great Room', image: '/portfolio/residential-render-7.webp' },
  { slug: 'garden-view-living-ii', name: 'Garden View II', category: 'Living & Dining', image: '/portfolio/residential-render-8.webp' },
  { slug: 'the-grand-foyer', name: 'The Grand Foyer', category: 'Entryway', image: '/portfolio/residential-render-9.webp' },
  
  // Real Photos - numbered files (11 total)
  { slug: 'jazz-and-velvet', name: 'Jazz & Velvet', category: 'Dining Room', image: '/portfolio/05.webp' },
  { slug: 'skylight-kitchen', name: 'Skylight Kitchen', category: 'Kitchen', image: '/portfolio/09.webp' },
  { slug: 'collectors-gallery', name: "The Collector's Gallery", category: 'Living Room', image: '/portfolio/10.webp' },
  { slug: 'gallery-corridor', name: 'Gallery Corridor', category: 'Hallway', image: '/portfolio/11.webp' },
  { slug: 'taupe-comfort', name: 'Taupe Comfort', category: 'Living Room', image: '/portfolio/12.webp' },
  { slug: 'chefs-canvas', name: "Chef's Canvas", category: 'Kitchen', image: '/portfolio/13.webp' },
  { slug: 'stone-and-steel', name: 'Stone & Steel', category: 'Kitchen', image: '/portfolio/14.webp' },
  { slug: 'monochrome-elegance', name: 'Monochrome Elegance', category: 'Living Room', image: '/portfolio/15.webp' },
  { slug: 'golden-hour-glamour', name: 'Golden Hour Glamour', category: 'Living Room', image: '/portfolio/16.webp' },
  { slug: 'the-parisian-alcove', name: 'The Parisian Alcove', category: 'Bathroom', image: '/portfolio/18.webp' },
  { slug: 'modern-conversation', name: 'Modern Conversation', category: 'Dining', image: '/portfolio/33.webp' },
  
  // Residential numbered (4 total)
  { slug: 'champagne-silk', name: 'Champagne & Silk', category: 'Living Room', image: '/portfolio/residential-12.webp' },
  { slug: 'lavender-dusk', name: 'Lavender Dusk', category: 'Dining Room', image: '/portfolio/residential-13.webp' },
  { slug: 'composers-loft', name: "The Composer's Loft", category: 'Music Room', image: '/portfolio/residential-15.webp' },
  { slug: 'midnight-retreat', name: 'Midnight Retreat', category: 'Bathroom', image: '/portfolio/residential-16.webp' },
]

function ResidentialPage() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (slug: string) => {
    setImageErrors(prev => new Set(prev).add(slug))
  }

  const featuredProject = projects.find(p => p.featured)
  const gridProjects = projects.filter(p => !p.featured)

  return (
    <div className="portfolio-page">
      <style jsx global>{`
        .portfolio-page {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 140px 80px 100px;
        }

        .portfolio-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .portfolio-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(248, 246, 241, 0.5);
          text-decoration: none;
          margin-bottom: 24px;
          transition: color 0.3s ease;
        }

        .portfolio-back:hover {
          color: #c9a962;
        }

        .portfolio-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: #c9a962;
          margin-bottom: 16px;
        }

        .portfolio-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 300;
          color: #f8f6f1;
          margin: 0 0 16px 0;
        }

        .portfolio-subtitle {
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          font-weight: 300;
          color: rgba(248, 246, 241, 0.5);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .portfolio-count {
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(201, 169, 98, 0.6);
          margin-top: 16px;
        }

        .featured-section {
          max-width: 1400px;
          margin: 0 auto 30px;
        }

        .featured-card {
          position: relative;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          aspect-ratio: 16 / 9;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          background: #1a1a1a;
          display: block;
          text-decoration: none;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .featured-card-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .featured-card:hover .featured-card-image {
          transform: scale(1.05);
        }

        .featured-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to top,
            rgba(10, 10, 10, 0.9) 0%,
            rgba(10, 10, 10, 0.3) 50%,
            rgba(10, 10, 10, 0.1) 100%
          );
        }

        .featured-badge {
          position: absolute;
          top: 24px;
          left: 24px;
          padding: 8px 16px;
          background: rgba(201, 169, 98, 0.9);
          border-radius: 100px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #0a0a0a;
          font-weight: 500;
        }

        .featured-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px;
        }

        .featured-category {
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c9a962;
          margin-bottom: 12px;
        }

        .featured-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          color: #f8f6f1;
          margin: 0;
        }

        .featured-arrow {
          position: absolute;
          bottom: 40px;
          right: 40px;
          width: 56px;
          height: 56px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f8f6f1;
          font-size: 1.3rem;
          transition: all 0.4s ease;
        }

        .featured-card:hover .featured-arrow {
          background: #c9a962;
          border-color: #c9a962;
          color: #0a0a0a;
          transform: scale(1.1);
        }

        .grid-section {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-title {
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c9a962;
          margin-bottom: 20px;
          padding-left: 4px;
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .grid-card {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          background: #1a1a1a;
          display: block;
          text-decoration: none;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }

        .grid-card:hover {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          transform: translateY(-5px);
        }

        .grid-card-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .grid-card:hover .grid-card-image {
          transform: scale(1.08);
        }

        .grid-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to top,
            rgba(10, 10, 10, 0.95) 0%,
            rgba(10, 10, 10, 0.2) 50%,
            transparent 100%
          );
          opacity: 0.8;
          transition: opacity 0.4s ease;
        }

        .grid-card:hover .grid-card-overlay {
          opacity: 1;
        }

        .grid-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          transform: translateY(8px);
          transition: transform 0.4s ease;
        }

        .grid-card:hover .grid-card-content {
          transform: translateY(0);
        }

        .grid-card-category {
          font-family: 'Outfit', sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a962;
          margin-bottom: 6px;
        }

        .grid-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 400;
          color: #f8f6f1;
          margin: 0;
          line-height: 1.3;
        }

        .grid-card-arrow {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f8f6f1;
          font-size: 0.9rem;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.4s ease;
        }

        .grid-card:hover .grid-card-arrow {
          opacity: 1;
          transform: scale(1);
        }

        .card-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1a1815 0%, #252220 50%, #1a1815 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-placeholder span {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          color: rgba(201, 169, 98, 0.2);
          letter-spacing: 0.1em;
        }

        @media (max-width: 1100px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .featured-card {
            aspect-ratio: 16 / 9;
          }
        }

        @media (max-width: 768px) {
          .portfolio-page {
            padding: 100px 24px 60px;
          }

          .portfolio-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .featured-card {
            aspect-ratio: 4 / 3;
          }

          .featured-content {
            padding: 24px;
          }

          .featured-arrow {
            bottom: 24px;
            right: 24px;
            width: 44px;
            height: 44px;
          }
        }
      `}</style>

      <div className="portfolio-header">
        <Link href="/vds/portfolio" className="portfolio-back">
          ← Back to Portfolio
        </Link>
        <p className="portfolio-eyebrow">Residential</p>
        <h1 className="portfolio-title">Homes & Living Spaces</h1>
        <p className="portfolio-subtitle">
          Transforming houses into sanctuaries. Each residence reflects the unique personality of those who call it home.
        </p>
        <p className="portfolio-count">24 Projects</p>
      </div>

      {featuredProject && (
        <div className="featured-section">
          <Link href={`/vds/portfolio/residential/${featuredProject.slug}`} className="featured-card">
            {!imageErrors.has(featuredProject.slug) ? (
              <img
                src={featuredProject.image}
                alt={featuredProject.name}
                className="featured-card-image"
                onError={() => handleImageError(featuredProject.slug)}
              />
            ) : (
              <div className="card-placeholder"><span>VDS</span></div>
            )}
            <div className="featured-card-overlay" />
            <div className="featured-badge">Featured</div>
            <div className="featured-content">
              <p className="featured-category">{featuredProject.category}</p>
              <h2 className="featured-name">{featuredProject.name}</h2>
            </div>
            <div className="featured-arrow">→</div>
          </Link>
        </div>
      )}

      <div className="grid-section">
        <h3 className="section-title">All Projects</h3>
        <div className="portfolio-grid">
          {gridProjects.map((project) => (
            <Link href={`/vds/portfolio/residential/${project.slug}`} key={project.slug} className="grid-card">
              {!imageErrors.has(project.slug) ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="grid-card-image"
                  loading="lazy"
                  onError={() => handleImageError(project.slug)}
                />
              ) : (
                <div className="card-placeholder"><span>VDS</span></div>
              )}
              <div className="grid-card-overlay" />
              <div className="grid-card-content">
                <p className="grid-card-category">{project.category}</p>
                <h3 className="grid-card-name">{project.name}</h3>
              </div>
              <div className="grid-card-arrow">→</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResidentialPage