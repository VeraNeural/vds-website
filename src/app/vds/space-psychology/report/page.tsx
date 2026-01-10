'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  calculateScores,
  determineNervousSystemType,
  systemTypeDescriptions,
  designTranslations,
  roomByRoomInsights,
  NervousSystemType,
  UserAnswers,
} from '../data'

export default function ReportPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [nervousSystemType, setNervousSystemType] = useState<NervousSystemType | null>(null)
  const [scores, setScores] = useState<{ calmSeeker: number; energyCraver: number; balanceFinder: number } | null>(null)

  useEffect(() => {
    // Load all assessment answers from localStorage
    const allAnswers: UserAnswers = {}

    for (let i = 1; i <= 3; i++) {
      const saved = localStorage.getItem(`assessment-${i}`)
      if (saved) {
        const parsed = JSON.parse(saved)
        Object.assign(allAnswers, parsed)
      }
    }

    if (Object.keys(allAnswers).length === 0) {
      router.push('/vds/space-psychology')
      return
    }

    const calculatedScores = calculateScores(allAnswers)
    const type = determineNervousSystemType(calculatedScores)

    setScores(calculatedScores)
    setNervousSystemType(type)
    setLoading(false)
  }, [router])

  if (loading || !nervousSystemType || !scores) {
    return (
      <div className="loading">
        <style jsx>{`
          .loading {
            min-height: 100vh;
            background: #0a0a0a;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
          }
          .loading-text {
            color: rgba(248, 246, 241, 0.5);
            font-family: 'Outfit', sans-serif;
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 2px solid rgba(201, 169, 98, 0.2);
            border-top-color: #c9a962;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div className="loading-spinner"></div>
        <p className="loading-text">Analyzing your profile...</p>
      </div>
    )
  }

  const designTrans = designTranslations[nervousSystemType]
  const roomInsights = roomByRoomInsights[nervousSystemType]

  const keyInsights: Record<NervousSystemType, string> = {
    'Calm Seeker': "Your environment directly impacts your nervous system regulation. Investing in the right space is investing in your wellbeing.",
    'Energy Craver': "Spaces that are too understimulating can actually deplete you. You thrive with dynamic, engaging environments that match your energy.",
    'Balance Finder': "You don't need one type of space. You need zones that serve different states—both rest and activation.",
  }

  return (
    <div className="report-page">
      <style jsx>{`
        .report-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #f8f6f1;
          font-family: 'Outfit', sans-serif;
          padding: 80px 40px;
        }

        .report-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .report-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(248, 246, 241, 0.5);
          text-decoration: none;
          margin-bottom: 40px;
          transition: color 0.3s ease;
        }

        .report-back:hover {
          color: #c9a962;
        }

        .report-box {
          border: 1px solid rgba(201, 169, 98, 0.2);
          border-radius: 24px;
          padding: 60px 50px;
          background: linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(201, 169, 98, 0.02) 100%);
        }

        .report-header {
          text-align: center;
          margin-bottom: 60px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(201, 169, 98, 0.15);
        }

        .report-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: #c9a962;
          margin-bottom: 20px;
        }

        .report-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 300;
          margin-bottom: 15px;
        }

        .report-date {
          font-size: 0.85rem;
          color: rgba(248, 246, 241, 0.5);
        }

        .report-section {
          margin-bottom: 50px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(201, 169, 98, 0.1);
        }

        .report-section:last-of-type {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 400;
          color: #c9a962;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(201, 169, 98, 0.15);
        }

        .type-badge {
          display: inline-flex;
          align-items: center;
          gap: 15px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 300;
          color: #c9a962;
          margin-bottom: 25px;
        }

        .type-icon {
          font-size: 1.5rem;
        }

        .type-description {
          font-size: 1rem;
          color: rgba(248, 246, 241, 0.85);
          line-height: 1.9;
          margin-bottom: 25px;
        }

        .key-insight {
          background: rgba(201, 169, 98, 0.05);
          border-left: 3px solid #c9a962;
          padding: 20px 25px;
          margin-top: 25px;
        }

        .key-insight-label {
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a962;
          margin-bottom: 10px;
        }

        .key-insight-text {
          font-size: 0.95rem;
          font-style: italic;
          color: rgba(248, 246, 241, 0.8);
          line-height: 1.7;
        }

        .score-bar {
          display: flex;
          gap: 20px;
          margin-top: 30px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
        }

        .score-item {
          flex: 1;
          text-align: center;
        }

        .score-label {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(248, 246, 241, 0.5);
          margin-bottom: 8px;
        }

        .score-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          color: #c9a962;
        }

        .design-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .design-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(201, 169, 98, 0.1);
          border-radius: 14px;
          padding: 25px;
        }

        .design-item.full {
          grid-column: span 2;
        }

        .design-label {
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a962;
          margin-bottom: 12px;
        }

        .design-content {
          font-size: 0.9rem;
          color: rgba(248, 246, 241, 0.8);
          line-height: 1.7;
        }

        .room-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .room-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(201, 169, 98, 0.08);
          border-radius: 14px;
          padding: 25px;
          transition: all 0.3s ease;
        }

        .room-card:hover {
          border-color: rgba(201, 169, 98, 0.2);
          background: rgba(201, 169, 98, 0.02);
        }

        .room-name {
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a962;
          margin-bottom: 12px;
        }

        .room-insight {
          font-size: 0.85rem;
          color: rgba(248, 246, 241, 0.75);
          line-height: 1.7;
        }

        .cta-section {
          text-align: center;
          margin-top: 60px;
          padding-top: 40px;
          border-top: 1px solid rgba(201, 169, 98, 0.15);
        }

        .cta-label {
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(248, 246, 241, 0.5);
          margin-bottom: 25px;
        }

        .cta-btn {
          display: inline-block;
          padding: 20px 60px;
          background: linear-gradient(135deg, #c9a962 0%, #a08050 100%);
          border: none;
          border-radius: 100px;
          color: #0a0a0a;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(201, 169, 98, 0.3);
        }

        .cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(201, 169, 98, 0.5);
        }

        .secondary-links {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 30px;
          flex-wrap: wrap;
        }

        .secondary-link {
          padding: 12px 30px;
          border: 1px solid rgba(201, 169, 98, 0.25);
          border-radius: 100px;
          color: #c9a962;
          text-decoration: none;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .secondary-link:hover {
          border-color: #c9a962;
          background: rgba(201, 169, 98, 0.05);
        }

        @media (max-width: 768px) {
          .report-page {
            padding: 60px 24px;
          }

          .report-box {
            padding: 40px 30px;
          }

          .design-grid,
          .room-grid {
            grid-template-columns: 1fr;
          }

          .design-item.full {
            grid-column: span 1;
          }

          .type-badge {
            font-size: 1.8rem;
          }

          .score-bar {
            flex-direction: column;
            gap: 15px;
          }

          .secondary-links {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <div className="report-container">
        <Link href="/vds/space-psychology" className="report-back">
          ← Back to Assessments
        </Link>

        <div className="report-box">
          <div className="report-header">
            <p className="report-eyebrow">Space Psychology Profile™</p>
            <h1 className="report-title">Your Assessment Results</h1>
            <p className="report-date">
              Generated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Nervous System Type */}
          <div className="report-section">
            <h2 className="section-title">Your Nervous System Type</h2>
            <div className="type-badge">
              <span className="type-icon">◈</span>
              <span>{nervousSystemType}</span>
            </div>
            <p className="type-description">{systemTypeDescriptions[nervousSystemType]}</p>
            <div className="key-insight">
              <p className="key-insight-label">Key Insight</p>
              <p className="key-insight-text">{keyInsights[nervousSystemType]}</p>
            </div>

            <div className="score-bar">
              <div className="score-item">
                <p className="score-label">Calm Seeker</p>
                <p className="score-value">{scores.calmSeeker}</p>
              </div>
              <div className="score-item">
                <p className="score-label">Energy Craver</p>
                <p className="score-value">{scores.energyCraver}</p>
              </div>
              <div className="score-item">
                <p className="score-label">Balance Finder</p>
                <p className="score-value">{scores.balanceFinder}</p>
              </div>
            </div>
          </div>

          {/* Design Translation */}
          <div className="report-section">
            <h2 className="section-title">Design Translation</h2>
            <div className="design-grid">
              <div className="design-item">
                <p className="design-label">Color Palette</p>
                <p className="design-content">{designTrans.color}</p>
              </div>
              <div className="design-item">
                <p className="design-label">Lighting Strategy</p>
                <p className="design-content">{designTrans.lighting}</p>
              </div>
              <div className="design-item">
                <p className="design-label">Textures & Materials</p>
                <p className="design-content">{designTrans.textures}</p>
              </div>
              <div className="design-item">
                <p className="design-label">Acoustic Considerations</p>
                <p className="design-content">{designTrans.acoustics}</p>
              </div>
              <div className="design-item full">
                <p className="design-label">Spatial Flow</p>
                <p className="design-content">{designTrans.spatial}</p>
              </div>
            </div>
          </div>

          {/* Room-by-Room */}
          <div className="report-section">
            <h2 className="section-title">Room-by-Room Insights</h2>
            <div className="room-grid">
              <div className="room-card">
                <p className="room-name">Bedroom</p>
                <p className="room-insight">{roomInsights.bedroom}</p>
              </div>
              <div className="room-card">
                <p className="room-name">Kitchen</p>
                <p className="room-insight">{roomInsights.kitchen}</p>
              </div>
              <div className="room-card">
                <p className="room-name">Living Room</p>
                <p className="room-insight">{roomInsights.living}</p>
              </div>
              <div className="room-card">
                <p className="room-name">Home Office</p>
                <p className="room-insight">{roomInsights.office}</p>
              </div>
              <div className="room-card">
                <p className="room-name">Bathroom</p>
                <p className="room-insight">{roomInsights.bathroom}</p>
              </div>
              <div className="room-card">
                <p className="room-name">Entryway</p>
                <p className="room-insight">{roomInsights.entryway}</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <p className="cta-label">Ready to design with your profile in mind?</p>
            <Link href="/#contact" className="cta-btn">
              Book a Consultation
            </Link>
            <div className="secondary-links">
              <Link href="/vds/portfolio" className="secondary-link">
                Explore Portfolio
              </Link>
              <Link href="/vds" className="secondary-link">
                Enter Design Studio
              </Link>
              <Link href="/" className="secondary-link">
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}