'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { assessments } from './data'

export default function SpacePsychologyPage() {
  const router = useRouter()
  const [selectedAssessments, setSelectedAssessments] = useState<number[]>([])
  const [takeAll, setTakeAll] = useState(false)

  const toggleAssessment = (id: number) => {
    if (takeAll) return
    setSelectedAssessments(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const handleTakeAll = () => {
    setTakeAll(!takeAll)
    if (!takeAll) {
      setSelectedAssessments([1, 2, 3])
    } else {
      setSelectedAssessments([])
    }
  }

  const handleBegin = () => {
    if (selectedAssessments.length === 0) return
    
    // Store selected assessments
    localStorage.setItem('selected-assessments', JSON.stringify(selectedAssessments.sort()))
    
    // Clear any previous answers
    for (let i = 1; i <= 3; i++) {
      localStorage.removeItem(`assessment-${i}`)
    }
    
    // Go to first selected assessment
    const firstAssessment = Math.min(...selectedAssessments)
    router.push(`/vds/space-psychology/assessment?id=${firstAssessment}`)
  }

  return (
    <div className="sp-page">
      <style jsx>{`
        .sp-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #f8f6f1;
          font-family: 'Outfit', sans-serif;
          padding: 100px 40px;
        }

        .sp-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .sp-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(248, 246, 241, 0.5);
          text-decoration: none;
          margin-bottom: 60px;
          transition: color 0.3s ease;
        }

        .sp-back:hover {
          color: #c9a962;
        }

        .sp-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .sp-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: #c9a962;
          margin-bottom: 20px;
        }

        .sp-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 300;
          margin-bottom: 20px;
        }

        .sp-title span {
          color: #c9a962;
          font-style: italic;
        }

        .sp-tagline {
          font-size: 1.1rem;
          font-weight: 300;
          color: rgba(248, 246, 241, 0.7);
          margin-bottom: 30px;
          line-height: 1.8;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .sp-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-style: italic;
          color: rgba(248, 246, 241, 0.9);
          max-width: 500px;
          margin: 0 auto;
        }

        .sp-quote em {
          color: #c9a962;
        }

        .sp-assessments {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-bottom: 40px;
        }

        .sp-assessment-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 35px 30px;
          cursor: pointer;
          transition: all 0.4s ease;
          position: relative;
        }

        .sp-assessment-card:hover {
          border-color: rgba(201, 169, 98, 0.3);
          background: rgba(201, 169, 98, 0.03);
        }

        .sp-assessment-card.selected {
          border-color: #c9a962;
          background: rgba(201, 169, 98, 0.08);
        }

        .sp-assessment-card.selected::after {
          content: '✓';
          position: absolute;
          top: 15px;
          right: 15px;
          width: 28px;
          height: 28px;
          background: #c9a962;
          color: #0a0a0a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .sp-assessment-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 300;
          color: #c9a962;
          opacity: 0.2;
          line-height: 1;
          margin-bottom: 20px;
        }

        .sp-assessment-icon {
          font-size: 2rem;
          margin-bottom: 20px;
          color: #c9a962;
        }

        .sp-assessment-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 400;
          margin-bottom: 12px;
          color: #f8f6f1;
        }

        .sp-assessment-desc {
          font-size: 0.9rem;
          color: rgba(248, 246, 241, 0.6);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .sp-assessment-questions {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(201, 169, 98, 0.7);
        }

        .sp-take-all {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 50px;
          cursor: pointer;
        }

        .sp-checkbox {
          width: 24px;
          height: 24px;
          border: 1px solid rgba(201, 169, 98, 0.4);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .sp-checkbox.checked {
          background: #c9a962;
          border-color: #c9a962;
        }

        .sp-checkbox.checked::after {
          content: '✓';
          color: #0a0a0a;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .sp-take-all-text {
          font-size: 0.95rem;
          color: rgba(248, 246, 241, 0.8);
        }

        .sp-take-all-text span {
          color: #c9a962;
          font-weight: 500;
        }

        .sp-cta-section {
          text-align: center;
        }

        .sp-cta {
          display: inline-block;
          padding: 20px 60px;
          background: linear-gradient(135deg, #c9a962 0%, #a08050 100%);
          border: none;
          border-radius: 100px;
          color: #0a0a0a;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(201, 169, 98, 0.3);
          opacity: 0.4;
          pointer-events: none;
        }

        .sp-cta.enabled {
          opacity: 1;
          pointer-events: auto;
        }

        .sp-cta.enabled:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(201, 169, 98, 0.5);
        }

        .sp-time {
          margin-top: 20px;
          font-size: 0.85rem;
          color: rgba(248, 246, 241, 0.5);
        }

        .sp-info {
          margin-top: 80px;
          padding-top: 60px;
          border-top: 1px solid rgba(201, 169, 98, 0.1);
          text-align: center;
        }

        .sp-info-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 300;
          margin-bottom: 30px;
          color: #c9a962;
        }

        .sp-info-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          max-width: 900px;
          margin: 0 auto;
        }

        .sp-info-item {
          text-align: center;
        }

        .sp-info-icon {
          font-size: 1.5rem;
          color: #c9a962;
          margin-bottom: 15px;
        }

        .sp-info-label {
          font-size: 0.9rem;
          color: rgba(248, 246, 241, 0.8);
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .sp-assessments {
            grid-template-columns: 1fr;
          }

          .sp-info-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .sp-page {
            padding: 80px 24px;
          }

          .sp-info-grid {
            grid-template-columns: 1fr;
          }

          .sp-cta {
            padding: 18px 40px;
          }
        }
      `}</style>

      <div className="sp-container">
        <Link href="/vds/visionary" className="sp-back">
          ← Back to Visionary
        </Link>

        <div className="sp-header">
          <p className="sp-eyebrow">VDS × VERA</p>
          <h1 className="sp-title">Space <span>Psychology™</span></h1>
          <p className="sp-tagline">
            Architecture that responds to the human nervous system. 
            Not taste. Not trends. Biology. Signal. Regulation.
          </p>
          <p className="sp-quote">
            "We don't design spaces for how they look.<br/>
            We design spaces for how they <em>regulate you</em>."
          </p>
        </div>

        <div className="sp-assessments">
          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className={`sp-assessment-card ${selectedAssessments.includes(assessment.id) ? 'selected' : ''}`}
              onClick={() => toggleAssessment(assessment.id)}
            >
              <div className="sp-assessment-number">0{assessment.id}</div>
              <div className="sp-assessment-icon">{assessment.icon}</div>
              <h3 className="sp-assessment-name">{assessment.name}</h3>
              <p className="sp-assessment-desc">{assessment.description}</p>
              <p className="sp-assessment-questions">
                {assessment.questions.length} questions
              </p>
            </div>
          ))}
        </div>

        <div className="sp-take-all" onClick={handleTakeAll}>
          <div className={`sp-checkbox ${takeAll ? 'checked' : ''}`}></div>
          <p className="sp-take-all-text">
            Take all 3 for <span>complete profile</span> (recommended)
          </p>
        </div>

        <div className="sp-cta-section">
          <button 
            className={`sp-cta ${selectedAssessments.length > 0 ? 'enabled' : ''}`}
            onClick={handleBegin}
          >
            Begin Assessment
          </button>
          <p className="sp-time">
            {selectedAssessments.length === 0 && 'Select at least one assessment'}
            {selectedAssessments.length === 1 && '~5 minutes'}
            {selectedAssessments.length === 2 && '~10 minutes'}
            {selectedAssessments.length === 3 && '~15 minutes for complete profile'}
          </p>
        </div>

        <div className="sp-info">
          <h2 className="sp-info-title">What You'll Receive</h2>
          <div className="sp-info-grid">
            <div className="sp-info-item">
              <div className="sp-info-icon">◈</div>
              <p className="sp-info-label">Your Nervous<br/>System Type</p>
            </div>
            <div className="sp-info-item">
              <div className="sp-info-icon">◈</div>
              <p className="sp-info-label">Design<br/>Translation</p>
            </div>
            <div className="sp-info-item">
              <div className="sp-info-icon">◈</div>
              <p className="sp-info-label">Room-by-Room<br/>Insights</p>
            </div>
            <div className="sp-info-item">
              <div className="sp-info-icon">◈</div>
              <p className="sp-info-label">VDS Design<br/>Alignment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}