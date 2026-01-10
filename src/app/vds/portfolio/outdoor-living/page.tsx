'use client'

import { useState } from 'react'
import Link from 'next/link'

const videos = [
  { id: '1O3JpYN-PSo', name: 'Edison Hotel', category: 'Hospitality', description: 'Stunning hotel exterior and pool area' },
  { id: 'bTouMSsaDc8', name: 'Private Estate I', category: 'Residential', description: 'Luxury home with breathtaking pool' },
  { id: '8vRZhjSCmgc', name: 'Private Estate II', category: 'Residential', description: 'Modern outdoor living design' },
  { id: 'WchHdZqLkhM', name: 'Coastal Retreat', category: 'Residential', description: 'Serene waterfront property' },
  { id: 'E6KJfI4RHeY', name: 'Poolside Paradise', category: 'Residential', description: 'Resort-style backyard oasis' },
  { id: 'ghPjSxQhbpM', name: 'Tropical Oasis', category: 'Residential', description: 'Lush landscape meets luxury' },
]

function OutdoorLivingPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  const featuredVideo = videos[0]
  const gridVideos = videos.slice(1)

  return (
    <div className="portfolio-page">
      <style jsx global>{`
        .portfolio-page {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 100px 40px 60px;
        }

        .portfolio-header {
          text-align: center;
          margin-bottom: 40px;
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

        .featured-video {
          position: relative;
          width: 100%;
          aspect-ratio: 21 / 9;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          background: #1a1a1a;
        }

        .featured-video-thumbnail {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .featured-video:hover .featured-video-thumbnail {
          transform: scale(1.05);
        }

        .featured-video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to top,
            rgba(10, 10, 10, 0.9) 0%,
            rgba(10, 10, 10, 0.3) 50%,
            rgba(10, 10, 10, 0.2) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .featured-play-btn {
          width: 100px;
          height: 100px;
          border: 2px solid #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 2rem;
          transition: all 0.4s ease;
          padding-left: 8px;
        }

        .featured-video:hover .featured-play-btn {
          background: #c9a962;
          border-color: #c9a962;
          color: #0a0a0a;
          transform: scale(1.1);
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
          pointer-events: none;
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
          margin: 0 0 8px 0;
        }

        .featured-description {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          color: rgba(248, 246, 241, 0.6);
          margin: 0;
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

        .videos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .video-card:hover .video-card-thumbnail {
          transform: scale(1.08);
        }

        .video-card-overlay {
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
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }

        .video-card:hover .video-card-overlay {
          background: linear-gradient(
            to top,
            rgba(10, 10, 10, 0.95) 0%,
            rgba(10, 10, 10, 0.4) 50%,
            rgba(10, 10, 10, 0.2) 100%
          );
        }

        .video-play-btn {
          width: 60px;
          height: 60px;
          border: 2px solid #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.3rem;
          transition: all 0.3s ease;
          padding-left: 4px;
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
          pointer-events: none;
        }

        .video-card-category {
          font-family: 'Outfit', sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a962;
          margin-bottom: 6px;
        }

        .video-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 400;
          color: #f8f6f1;
          margin: 0;
          line-height: 1.3;
        }

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
          border: 1px solid rgba(255, 255, 255, 0.3);
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
          border: none;
        }

        @media (max-width: 1100px) {
          .videos-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .featured-video {
            aspect-ratio: 16 / 9;
          }
        }

        @media (max-width: 768px) {
          .portfolio-page {
            padding: 80px 20px 40px;
          }

          .videos-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .featured-video {
            aspect-ratio: 16 / 9;
          }

          .featured-content {
            padding: 24px;
          }

          .featured-play-btn {
            width: 70px;
            height: 70px;
            font-size: 1.5rem;
          }

          .video-lightbox {
            padding: 20px;
          }

          .video-lightbox-close {
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
          }
        }
      `}</style>

      <div className="portfolio-header">
        <Link href="/vds/portfolio" className="portfolio-back">
          ← Back to Portfolio
        </Link>
        <p className="portfolio-eyebrow">Outdoor Living</p>
        <h1 className="portfolio-title">Pools & Landscapes</h1>
        <p className="portfolio-subtitle">
          Where nature meets design. Creating outdoor sanctuaries that extend your living space into the beauty of Florida.
        </p>
        <p className="portfolio-count">6 Projects</p>
      </div>

      <div className="featured-section">
        <div className="featured-video" onClick={() => setActiveVideo(featuredVideo.id)}>
          <img
            src={`https://img.youtube.com/vi/${featuredVideo.id}/maxresdefault.jpg`}
            alt={featuredVideo.name}
            className="featured-video-thumbnail"
          />
          <div className="featured-video-overlay">
            <div className="featured-play-btn">▶</div>
          </div>
          <div className="featured-badge">Featured</div>
          <div className="featured-content">
            <p className="featured-category">{featuredVideo.category}</p>
            <h2 className="featured-name">{featuredVideo.name}</h2>
            <p className="featured-description">{featuredVideo.description}</p>
          </div>
        </div>
      </div>

      <div className="grid-section">
        <h3 className="section-title">All Projects</h3>
        <div className="videos-grid">
          {gridVideos.map((video) => (
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

      {activeVideo && (
        <div className="video-lightbox" onClick={() => setActiveVideo(null)}>
          <button className="video-lightbox-close" onClick={() => setActiveVideo(null)}>✕</button>
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
            title="Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  )
}

export default OutdoorLivingPage