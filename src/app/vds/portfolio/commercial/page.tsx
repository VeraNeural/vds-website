'use client'

import { useState } from 'react'
import Link from 'next/link'

const projects = [
  // Featured
  { slug: 'grand-lobby', name: 'The Grand Lobby', category: 'Lobby', image: '/portfolio/grand-lobby.webp', featured: true },
  // Lobbies
  { slug: 'lobby-01', name: 'Executive Lobby I', category: 'Lobby', image: '/portfolio/lobby-01.webp' },
  { slug: 'lobby-01b', name: 'Executive Lobby II', category: 'Lobby', image: '/portfolio/lobby-01b.webp' },
  { slug: 'lobby-02', name: 'Modern Reception', category: 'Lobby', image: '/portfolio/lobby-02.webp' },
  { slug: 'lobby-04', name: 'Corporate Welcome', category: 'Lobby', image: '/portfolio/lobby-04.webp' },
  // Offices
  { slug: 'office-04', name: 'Executive Suite', category: 'Office', image: '/portfolio/office-04.webp' },
  { slug: 'office-05', name: 'Modern Workspace', category: 'Office', image: '/portfolio/office-05.webp' },
  // Hospitality
  { slug: 'hospitality-01', name: 'Boutique Hotel I', category: 'Hospitality', image: '/portfolio/hospitality-01.webp' },
  { slug: 'hospitality-01b', name: 'Boutique Hotel II', category: 'Hospitality', image: '/portfolio/hospitality-01b.webp' },
  { slug: 'hospitality-02', name: 'Resort Lounge', category: 'Hospitality', image: '/portfolio/hospitality-02.webp' },
  { slug: 'hospitality-12', name: 'Hotel Retreat', category: 'Hospitality', image: '/portfolio/hospitality-12.webp' },
  { slug: 'hospitality-16', name: 'Luxury Suite', category: 'Hospitality', image: '/portfolio/hospitality-16.webp' },
  // Bedroom (Hotel)
  { slug: 'bedroom-01', name: 'Presidential Suite', category: 'Hotel Suite', image: '/portfolio/bedroom-01.webp' },
  // Commercial numbered
  { slug: 'commercial-01', name: 'Commercial Space I', category: 'Commercial', image: '/portfolio/commercial-01.webp' },
  { slug: 'commercial-02', name: 'Commercial Space II', category: 'Commercial', image: '/portfolio/commercial-02.webp' },
  { slug: 'commercial-03', name: 'Commercial Space III', category: 'Commercial', image: '/portfolio/commercial-03.webp' },
  { slug: 'commercial-04', name: 'Commercial Space IV', category: 'Commercial', image: '/portfolio/commercial-04.webp' },
  { slug: 'commercial-19', name: 'Retail Design I', category: 'Retail', image: '/portfolio/commercial-19.webp' },
  { slug: 'commercial-20', name: 'Retail Design II', category: 'Retail', image: '/portfolio/commercial-20.webp' },
  { slug: 'commercial-21', name: 'Retail Design III', category: 'Retail', image: '/portfolio/commercial-21.webp' },
  { slug: 'commercial-22', name: 'Retail Design IV', category: 'Retail', image: '/portfolio/commercial-22.webp' },
  { slug: 'commercial-23', name: 'Retail Design V', category: 'Retail', image: '/portfolio/commercial-23.webp' },
  // Commercial assets
  { slug: 'commercial-asset', name: 'Modern Commercial', category: 'Commercial', image: '/portfolio/commercial-asset.webp' },
  { slug: 'commercial-asset-1', name: 'Corporate Design I', category: 'Commercial', image: '/portfolio/commercial-asset-1.webp' },
  { slug: 'commercial-asset-2', name: 'Corporate Design II', category: 'Commercial', image: '/portfolio/commercial-asset-2.webp' },
  { slug: 'commercial-asset-3', name: 'Corporate Design III', category: 'Commercial', image: '/portfolio/commercial-asset-3.webp' },
  { slug: 'commercial-asset-4', name: 'Corporate Design IV', category: 'Commercial', image: '/portfolio/commercial-asset-4.webp' },
  { slug: 'commercial-asset-5', name: 'Corporate Design V', category: 'Commercial', image: '/portfolio/commercial-asset-5.webp' },
  { slug: 'commercial-asset-6', name: 'Corporate Design VI', category: 'Commercial', image: '/portfolio/commercial-asset-6.webp' },
  { slug: 'commercial-asset-7', name: 'Corporate Design VII', category: 'Commercial', image: '/portfolio/commercial-asset-7.webp' },
  { slug: 'commercial-asset-8', name: 'Corporate Design VIII', category: 'Commercial', image: '/portfolio/commercial-asset-8.webp' },
  { slug: 'commercial-asset-9', name: 'Corporate Design IX', category: 'Commercial', image: '/portfolio/commercial-asset-9.webp' },
  { slug: 'commercial-asset-10', name: 'Corporate Design X', category: 'Commercial', image: '/portfolio/commercial-asset-10.webp' },
  { slug: 'commercial-asset-11', name: 'Corporate Design XI', category: 'Commercial', image: '/portfolio/commercial-asset-11.webp' },
]

const videos = [
  { id: 'dxk_l5Z-RNQ', name: 'Modern Office Design', category: 'Office' },
  { id: '4veRDfeZ9KU', name: 'Brainwaive Insights', category: 'Office' },
]

export default function CommercialPage() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  const handleImageError = (slug: string) => {
    setImageErrors(prev => new Set(prev).add(slug))
  }

  const featuredProject = projects.find(p => p.featured)
  const gridProjects = projects.filter(p => !p.featured)

  return (
    <>
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

        /* Featured */
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

        /* Videos Section */
        .videos-section {
          max-width: 1400px;
          margin: 0 auto 40px;
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

        .videos-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .video-card {
          position: relative;
          aspect-ratio: 16 / 9;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          background: #1a1a1a;
        }

        .video-card-thumbnail {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .video-card:hover .video-card-thumbnail {
          transform: scale(1.05);
        }

        .video-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(10, 10, 10, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }

        .video-card:hover .video-card-overlay {
          background: rgba(10, 10, 10, 0.6);
        }

        .video-play-btn {
          width: 70px;
          height: 70px;
          border: 2px solid #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }

        .video-card:hover .video-play-btn {
          background: #c9a962;
          border-color: #c9a962;
          color: #0a0a0a;
          transform: scale(1.1);
        }

        .video-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          background: linear-gradient(to top, rgba(10,10,10,0.9), transparent);
        }

        .video-card-category {
          font-family: 'Outfit', sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a962;
          margin-bottom: 4px;
        }

        .video-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: #f8f6f1;
          margin: 0;
        }

        /* Grid */
        .grid-section {
          max-width: 1400px;
          margin: 0 auto;
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
        }

        /* Video Lightbox */
        .video-lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 40px;
        }

        .video-lightbox-close {
          position: absolute;
          top: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          background: transparent;
          color: #fff;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .video-lightbox-close:hover {
          background: #c9a962;
          border-color: #c9a962;
          color: #0a0a0a;
        }

        .video-lightbox iframe {
          width: 100%;
          max-width: 1200px;
          aspect-ratio: 16 / 9;
          border-radius: 12px;
        }

        /* Responsive */
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

          .portfolio-grid,
          .videos-grid {
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

          .video-lightbox {
            padding: 20px;
          }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .portfolio-header { animation: fadeInUp 0.6s ease forwards; }
        .featured-section { animation: fadeInUp 0.6s ease 0.1s forwards; opacity: 0; }
        .videos-section { animation: fadeInUp 0.6s ease 0.2s forwards; opacity: 0; }
        .grid-section { animation: fadeInUp 0.6s ease 0.3s forwards; opacity: 0; }
      `}</style>

      <div className="portfolio-page">
        <div className="portfolio-header">
          <Link href="/vds/portfolio" className="portfolio-back">
            ← Back to Portfolio
          </Link>
          <p className="portfolio-eyebrow">Commercial</p>
          <h1 className="portfolio-title">Business & Hospitality</h1>
          <p className="portfolio-subtitle">
            Creating environments that elevate brands and inspire success. From lobbies to executive suites.
          </p>
        </div>

        {featuredProject && (
          <div className="featured-section">
            <Link href={`/vds/portfolio/commercial/${featuredProject.slug}`} className="featured-card">
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

        {/* Videos Section */}
        <div className="videos-section">
          <h3 className="section-title">Video Walkthroughs</h3>
          <div className="videos-grid">
            {videos.map((video) => (
              <div key={video.id} className="video-card" onClick={() => setActiveVideo(video.id)}>
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.name}
                  className="video-card-thumbnail"
                />
                <div className="video-card-overlay">
                  <div className="video-play-btn">▶</div>
                </div>
                <div className="video-card-content">
                  <p className="video-card-category">{video.category}</p>
                  <h4 className="video-card-name">{video.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid-section">
          <h3 className="section-title">All Projects</h3>
          <div className="portfolio-grid">
            {gridProjects.map((project) => (
              <Link href={`/vds/portfolio/commercial/${project.slug}`} key={project.slug} className="grid-card">
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

        {/* Video Lightbox */}
        {activeVideo && (
          <div className="video-lightbox" onClick={() => setActiveVideo(null)}>
            <button className="video-lightbox-close" onClick={() => setActiveVideo(null)}>✕</button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </>
  )
}