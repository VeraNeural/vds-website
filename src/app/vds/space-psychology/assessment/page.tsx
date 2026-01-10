'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { assessments, Question, AnswerType, UserAnswers } from '../data'

function AssessmentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const assessmentId = parseInt(searchParams.get('id') || '1')

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<UserAnswers>({})
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)

  const assessment = assessments.find(a => a.id === assessmentId)
  const questions = assessment?.questions || []
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex) / questions.length) * 100

  useEffect(() => {
    // Load any existing answers for this assessment
    const saved = localStorage.getItem(`assessment-${assessmentId}`)
    if (saved) {
      setAnswers(JSON.parse(saved))
    }
  }, [assessmentId])

  useEffect(() => {
    // Reset selected options when question changes
    const existingAnswer = answers[currentQuestion?.id]
    if (existingAnswer) {
      if (Array.isArray(existingAnswer)) {
        setSelectedOptions(existingAnswer)
      } else {
        setSelectedOptions([existingAnswer])
      }
    } else {
      setSelectedOptions([])
    }
  }, [currentQuestionIndex, currentQuestion?.id, answers])

  const handleSelect = (value: string) => {
    if (currentQuestion.type === 'multi') {
      setSelectedOptions(prev => 
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      )
    } else {
      setSelectedOptions([value])
      // Auto-advance for single select after a brief delay
      setTimeout(() => handleNext(value), 300)
    }
  }

  const handleNext = (directValue?: string) => {
    const valueToSave = directValue ? [directValue] : selectedOptions
    
    if (valueToSave.length === 0) return

    setIsTransitioning(true)

    // Save answer
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: currentQuestion.type === 'multi' ? valueToSave : valueToSave[0]
    }
    setAnswers(newAnswers)
    localStorage.setItem(`assessment-${assessmentId}`, JSON.stringify(newAnswers))

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        // Next question
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedOptions([])
      } else {
        // Assessment complete - check if there are more assessments
        const selectedAssessments = JSON.parse(localStorage.getItem('selected-assessments') || '[]') as number[]
        const currentIndex = selectedAssessments.indexOf(assessmentId)
        
        if (currentIndex < selectedAssessments.length - 1) {
          // Go to next assessment
          const nextAssessment = selectedAssessments[currentIndex + 1]
          router.push(`/vds/space-psychology/assessment?id=${nextAssessment}`)
        } else {
          // All done - go to report
          router.push('/vds/space-psychology/report')
        }
      }
      setIsTransitioning(false)
    }, 300)
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  if (!assessment || !currentQuestion) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'rgba(248, 246, 241, 0.5)' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div className="assessment-page">
      <style jsx>{`
        .assessment-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #f8f6f1;
          font-family: 'Outfit', sans-serif;
          display: flex;
          flex-direction: column;
        }

        .assessment-header {
          padding: 30px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(201, 169, 98, 0.1);
        }

        .assessment-title {
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a962;
        }

        .assessment-progress-text {
          font-size: 0.85rem;
          color: rgba(248, 246, 241, 0.5);
        }

        .progress-bar {
          height: 2px;
          background: rgba(201, 169, 98, 0.1);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #c9a962 0%, #e8d5a3 100%);
          transition: width 0.5s ease;
        }

        .assessment-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 60px 40px;
          max-width: 700px;
          margin: 0 auto;
          width: 100%;
          opacity: ${isTransitioning ? 0 : 1};
          transform: translateY(${isTransitioning ? '20px' : '0'});
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .question-number {
          font-size: 0.7rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(201, 169, 98, 0.6);
          margin-bottom: 30px;
        }

        .question-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 300;
          text-align: center;
          line-height: 1.4;
          margin-bottom: 15px;
        }

        .question-subtext {
          font-size: 0.9rem;
          color: rgba(248, 246, 241, 0.5);
          text-align: center;
          margin-bottom: 50px;
        }

        .options {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .options.scale {
          flex-direction: row;
          justify-content: center;
          gap: 15px;
        }

        .option {
          padding: 20px 30px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .option:hover {
          border-color: rgba(201, 169, 98, 0.4);
          background: rgba(201, 169, 98, 0.05);
        }

        .option.selected {
          border-color: #c9a962;
          background: rgba(201, 169, 98, 0.1);
        }

        .option-label {
          font-size: 1rem;
          color: #f8f6f1;
        }

        .options.scale .option {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .options.scale .option-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
        }

        .scale-labels {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 340px;
          margin-top: 15px;
          font-size: 0.75rem;
          color: rgba(248, 246, 241, 0.4);
        }

        .multi-hint {
          font-size: 0.8rem;
          color: rgba(201, 169, 98, 0.7);
          margin-bottom: 20px;
          text-align: center;
        }

        .assessment-footer {
          padding: 30px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(201, 169, 98, 0.1);
        }

        .back-btn {
          padding: 12px 30px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 100px;
          color: rgba(248, 246, 241, 0.7);
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: ${currentQuestionIndex === 0 ? 0.3 : 1};
          pointer-events: ${currentQuestionIndex === 0 ? 'none' : 'auto'};
        }

        .back-btn:hover {
          border-color: rgba(255, 255, 255, 0.4);
          color: #f8f6f1;
        }

        .next-btn {
          padding: 14px 40px;
          background: linear-gradient(135deg, #c9a962 0%, #a08050 100%);
          border: none;
          border-radius: 100px;
          color: #0a0a0a;
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: ${selectedOptions.length === 0 ? 0.4 : 1};
          pointer-events: ${selectedOptions.length === 0 ? 'none' : 'auto'};
        }

        .next-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(201, 169, 98, 0.4);
        }

        .exit-btn {
          position: absolute;
          top: 30px;
          right: 40px;
          padding: 10px 20px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 100px;
          color: rgba(248, 246, 241, 0.5);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .exit-btn:hover {
          border-color: rgba(255, 255, 255, 0.3);
          color: rgba(248, 246, 241, 0.8);
        }

        @media (max-width: 600px) {
          .assessment-header {
            padding: 20px 24px;
          }

          .assessment-content {
            padding: 40px 24px;
          }

          .assessment-footer {
            padding: 20px 24px;
          }

          .options.scale {
            gap: 10px;
          }

          .options.scale .option {
            width: 50px;
            height: 50px;
          }

          .option {
            padding: 16px 20px;
          }

          .exit-btn {
            top: 20px;
            right: 24px;
          }
        }
      `}</style>

      <header className="assessment-header">
        <span className="assessment-title">{assessment.name}</span>
        <span className="assessment-progress-text">
          {currentQuestionIndex + 1} of {questions.length}
        </span>
      </header>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <button 
        className="exit-btn" 
        onClick={() => router.push('/vds/space-psychology')}
      >
        Exit
      </button>

      <main className="assessment-content">
        <p className="question-number">Question {currentQuestionIndex + 1}</p>
        <h2 className="question-text">{currentQuestion.text}</h2>
        {currentQuestion.subtext && (
          <p className="question-subtext">{currentQuestion.subtext}</p>
        )}

        {currentQuestion.type === 'multi' && (
          <p className="multi-hint">Select all that apply</p>
        )}

        <div className={`options ${currentQuestion.type === 'scale' ? 'scale' : ''}`}>
          {currentQuestion.options.map((option) => (
            <div
              key={option.value}
              className={`option ${selectedOptions.includes(option.value) ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              <span className="option-label">{option.label}</span>
            </div>
          ))}
        </div>

        {currentQuestion.type === 'scale' && currentQuestion.subtext && (
          <div className="scale-labels">
            <span>{currentQuestion.subtext.split(',')[0]?.split('=')[1]?.trim()}</span>
            <span>{currentQuestion.subtext.split(',')[1]?.split('=')[1]?.trim()}</span>
          </div>
        )}
      </main>

      <footer className="assessment-footer">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>
        {currentQuestion.type === 'multi' && (
          <button 
            className="next-btn" 
            onClick={() => handleNext()}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Complete' : 'Next'} →
          </button>
        )}
      </footer>
    </div>
  )
}

export default function AssessmentPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: 'rgba(248, 246, 241, 0.5)' }}>Loading...</p></div>}>
      <AssessmentContent />
    </Suspense>
  )
}