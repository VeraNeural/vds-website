'use client'

import Link from 'next/link'
import { useState } from 'react'

const categories = [
  {
    slug: 'residential',
    name: 'Residential',
    description: 'Luxury homes designed for living',
    projectCount: '24 Projects',
    image: '/portfolio/18.webp', // Parisian Alcove - beautiful residential
  },
  {
    slug: 'commercial',
    name: 'Commercial',
    description: 'Spaces that inspire business',
    projectCount: '29 Projects',
    image: '/portfolio/grand-lobby.webp', // Grand Lobby
  },
  {
    slug: 'outdoor-living',
    name: 'Outdoor Living',
    description: 'Where nature meets design',
    projectCount: '6 Projects',
    videoThumbnail: 'https://img.youtube.com/vi/1O3JpYN-PSo/maxresdefault.jpg',
  },
]

export default function PortfolioPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <>
      <style jsx global>{`
        .portfolio-overview {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 120px 40px 80px;
        }

        .portfolio-header {
          text-align: center;
          margin-bottom: 60px;
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
          margin: 0 auto 20px;
          line-height: 1.7;
        }

        .portfolio-address {
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(201, 169, 98, 0.7);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .category-card {
          position: relative;
          aspect-ratio: 3 / 4;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          background: #1a1a1a;
          text-decoration: none;
        }

        .category-card-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .category-card:hover .category-card-image {
          transform: scale(1.08);
        }

        .category-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to top,
            rgba(10, 10, 10, 0.95) 0%,
            rgba(10, 10, 10, 0.5) 40%,
            rgba(10, 10, 10, 0.2) 100%
          );
          transition: background 0.4s ease;
        }

        .category-card:hover .category-card-overlay {
          background: linear-gradient(
            to top,
            rgba(10, 10, 10, 0.98) 0%,
            rgba(10, 10, 10, 0.6) 50%,
            rgba(10, 10, 10, 0.3) 100%
          );
        }

        .category-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px;
          text-align: center;
        }

        .category-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 300;
          color: #f8f6f1;
          margin: 0 0 8px 0;
        }

        .category-card-description {
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          color: rgba(248, 246, 241, 0.6);
          margin: 0 0 16px 0;
        }

        .category-card-count {
          font-family: 'Outfit', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a962;
          padding: 8px 16px;
          border: 1px solid rgba(201, 169, 98, 0.4);
          border-radius: 100px;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .category-card:hover .category-card-count {
          background: #c9a962;
          color: #0a0a0a;
        }

        .category-card-arrow {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f8f6f1;
          font-size: 1.1rem;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.4s ease;
        }

        .category-card:hover .category-card-arrow {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 1000px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .category-card:last-child {
            grid-column: span 2;
            aspect-ratio: 2 / 1;
          }
        }

        @media (max-width: 600px) {
          .portfolio-overview {
            padding: 100px 20px 60px;
          }

          .categories-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .category-card,
          .category-card:last-child {
            aspect-ratio: 4 / 3;
            grid-column: span 1;
          }

          .category-card-content {
            padding: 24px;
          }
        }

        /* Animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .portfolio-header {
          animation: fadeInUp 0.6s ease forwards;
        }

        .category-card {
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
        }

        .category-card:nth-child(1) { animation-delay: 0.1s; }
        .category-card:nth-child(2) { animation-delay: 0.2s; }
        .category-card:nth-child(3) { animation-delay: 0.3s; }
      `}</style>

      <div className="portfolio-overview">
        {/* Header */}
        <div className="portfolio-header">
          <p className="portfolio-eyebrow">Our Work</p>
          <h1 className="portfolio-title">Portfolio</h1>
          <p className="portfolio-subtitle">
            Spaces crafted with intention, designed with soul. 
            Each project tells a unique story.
          </p>
          <p className="portfolio-address">225 1st Ave N, Saint Petersburg, FL 33701</p>
        </div>

        {/* Category Cards */}
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link
              href={`/vds/portfolio/${category.slug}`}
              key={category.slug}
              className="category-card"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={category.videoThumbnail || category.image}
                alt={category.name}
                className="category-card-image"
              />
              <div className="category-card-overlay" />
              <div className="category-card-content">
                <h2 className="category-card-name">{category.name}</h2>
                <p className="category-card-description">{category.description}</p>
                <span className="category-card-count">{category.projectCount}</span>
              </div>
              <div className="category-card-arrow">→</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}