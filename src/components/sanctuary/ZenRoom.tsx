'use client';

import { useState, useEffect, useRef } from 'react';

interface ZenRoomProps {
  onBack: () => void;
  onComplete?: () => void;
}

type BreathingPattern = {
  name: string;
  description: string;
  phases: { name: string; duration: number }[];
};

const BREATHING_PATTERNS: Record<string, BreathingPattern> = {
  coherent: {
    name: 'Coherent',
    description: 'Balance & calm',
    phases: [
      { name: 'Breathe in', duration: 5 },
      { name: 'Breathe out', duration: 5 },
    ],
  },
  '478': {
    name: '4-7-8',
    description: 'Deep relaxation',
    phases: [
      { name: 'Breathe in', duration: 4 },
      { name: 'Hold', duration: 7 },
      { name: 'Breathe out', duration: 8 },
    ],
  },
  box: {
    name: 'Box',
    description: 'Focus & calm',
    phases: [
      { name: 'Breathe in', duration: 4 },
      { name: 'Hold', duration: 4 },
      { name: 'Breathe out', duration: 4 },
      { name: 'Hold', duration: 4 },
    ],
  },
  calming: {
    name: 'Calming',
    description: 'Quick reset',
    phases: [
      { name: 'Breathe in', duration: 4 },
      { name: 'Breathe out', duration: 6 },
    ],
  },
};

const DURATIONS = [
  { label: '2 min', seconds: 120 },
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
];

export default function ZenRoom({ onBack, onComplete }: ZenRoomProps) {
  const [mode, setMode] = useState<'select' | 'active' | 'complete'>('select');
  const [selectedPattern, setSelectedPattern] = useState('coherent');
  const [selectedDuration, setSelectedDuration] = useState(120);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  // Breathing state
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Generate stars
    const newStars = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 70,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }));
    setStars(newStars);

    setTimeout(() => setIsLoaded(true), 100);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const pattern = BREATHING_PATTERNS[selectedPattern];
  const currentPhase = pattern?.phases[currentPhaseIndex];

  const getOrbScale = () => {
    if (mode !== 'active' || !currentPhase) return 1;
    const phaseName = currentPhase.name.toLowerCase();
    if (phaseName.includes('in')) return 1 + phaseProgress * 0.5;
    if (phaseName.includes('out')) return 1.5 - phaseProgress * 0.5;
    return phaseName.includes('hold') ? (currentPhaseIndex === 1 ? 1.5 : 1) : 1;
  };

  const startBreathing = () => {
    setMode('active');
    setTimeRemaining(selectedDuration);
    setCurrentPhaseIndex(0);
    setPhaseProgress(0);
    setCycleCount(0);

    let elapsed = 0;
    let currentPhase = 0;
    const tickMs = 50;

    intervalRef.current = setInterval(() => {
      elapsed += tickMs / 1000;
      const currentPhaseDuration = pattern.phases[currentPhase].duration;
      
      setPhaseProgress(Math.min(elapsed / currentPhaseDuration, 1));
      setTimeRemaining((prev) => {
        const newTime = prev - tickMs / 1000;
        if (newTime <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setMode('complete');
          return 0;
        }
        return newTime;
      });

      if (elapsed >= currentPhaseDuration) {
        currentPhase = (currentPhase + 1) % pattern.phases.length;
        setCurrentPhaseIndex(currentPhase);
        if (currentPhase === 0) setCycleCount((c) => c + 1);
        setPhaseProgress(0);
        elapsed = 0;
      }
    }, tickMs);
  };

  const stopBreathing = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setMode('complete');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetAndGoBack = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setMode('select');
    onBack();
  };

  return (
    <>
      <style jsx>{`
        .zen-room {
          min-height: 100vh;
          min-height: 100dvh;
          background: linear-gradient(180deg, #050510 0%, #0a0a18 30%, #0f0f22 60%, #0a0a18 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* Ambient Layers */
        .ambient-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .stars-layer {
          background-image: 
            radial-gradient(1px 1px at 10% 10%, rgba(255, 255, 255, 0.5), transparent),
            radial-gradient(1px 1px at 20% 20%, rgba(255, 255, 255, 0.3), transparent),
            radial-gradient(2px 2px at 30% 5%, rgba(255, 255, 255, 0.4), transparent),
            radial-gradient(1px 1px at 40% 15%, rgba(255, 255, 255, 0.3), transparent),
            radial-gradient(2px 2px at 50% 8%, rgba(255, 255, 255, 0.2), transparent),
            radial-gradient(1px 1px at 60% 25%, rgba(255, 255, 255, 0.4), transparent),
            radial-gradient(1px 1px at 70% 12%, rgba(255, 255, 255, 0.3), transparent),
            radial-gradient(2px 2px at 80% 18%, rgba(255, 255, 255, 0.2), transparent),
            radial-gradient(1px 1px at 90% 5%, rgba(255, 255, 255, 0.5), transparent),
            radial-gradient(1px 1px at 95% 22%, rgba(255, 255, 255, 0.3), transparent);
          background-size: 250px 250px;
        }

        .star {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          animation: twinkle ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        .nebula-glow {
          background: 
            radial-gradient(ellipse 80% 50% at 20% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(99, 102, 241, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse 100% 80% at 50% 50%, rgba(139, 119, 183, 0.05) 0%, transparent 60%);
        }

        .ambient-glow {
          background: radial-gradient(ellipse 80% 60% at 50% 60%, rgba(139, 119, 183, 0.12) 0%, transparent 60%);
          animation: ambientPulse 8s ease-in-out infinite;
        }

        @keyframes ambientPulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        /* Floor/Ground */
        .ground {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 35%;
          background: linear-gradient(180deg, 
            transparent 0%,
            rgba(10, 10, 24, 0.5) 30%,
            rgba(8, 8, 20, 0.8) 60%,
            rgba(5, 5, 15, 1) 100%);
        }

        .ground-texture {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(ellipse 100% 50% at 50% 100%, rgba(20, 20, 40, 0.5) 0%, transparent 60%);
        }

        /* Candles */
        .candles-container {
          position: absolute;
          bottom: 12%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 80px;
        }

        .candle-group {
          position: relative;
        }

        .candle {
          position: relative;
          width: 24px;
          background: linear-gradient(180deg, 
            rgba(255, 252, 248, 0.95) 0%,
            rgba(245, 240, 230, 0.9) 50%,
            rgba(235, 228, 215, 0.85) 100%);
          border-radius: 3px 3px 6px 6px;
          box-shadow: 
            0 5px 20px rgba(0, 0, 0, 0.3),
            inset -2px 0 5px rgba(0, 0, 0, 0.05);
        }

        .candle-tall { height: 70px; }
        .candle-medium { height: 55px; margin-top: 15px; }
        .candle-short { height: 45px; margin-top: 25px; }

        .candle-drip {
          position: absolute;
          top: 5px;
          width: 6px;
          height: 15px;
          background: linear-gradient(180deg,
            rgba(255, 252, 248, 0.95) 0%,
            rgba(245, 240, 230, 0.9) 100%);
          border-radius: 0 0 3px 3px;
        }

        .drip-1 { left: 3px; height: 12px; }
        .drip-2 { right: 4px; height: 18px; }

        .wick {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 8px;
          background: linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 100%);
          border-radius: 1px;
        }

        .flame-container {
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 40px;
        }

        .flame {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 14px;
          height: 28px;
          background: radial-gradient(ellipse at bottom,
            rgba(255, 255, 240, 1) 0%,
            rgba(255, 220, 120, 0.95) 20%,
            rgba(255, 180, 80, 0.85) 40%,
            rgba(255, 130, 50, 0.6) 60%,
            rgba(255, 80, 20, 0.3) 80%,
            transparent 100%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          animation: flameFlicker 0.4s ease-in-out infinite alternate;
          filter: blur(0.5px);
        }

        .flame-inner {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 14px;
          background: radial-gradient(ellipse at bottom,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 200, 0.9) 50%,
            transparent 100%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          animation: flameFlicker 0.3s ease-in-out infinite alternate;
          animation-delay: 0.1s;
        }

        @keyframes flameFlicker {
          0% { 
            transform: translateX(-50%) scaleY(1) scaleX(1) rotate(-1deg); 
            opacity: 1;
          }
          100% { 
            transform: translateX(-50%) scaleY(1.08) scaleX(0.96) rotate(1deg); 
            opacity: 0.95;
          }
        }

        .flame-glow {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 100px;
          background: radial-gradient(circle,
            rgba(255, 180, 80, 0.25) 0%,
            rgba(255, 150, 50, 0.15) 30%,
            rgba(255, 120, 30, 0.08) 50%,
            transparent 70%);
          animation: glowPulse 2.5s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.7; }
          50% { transform: translateX(-50%) scale(1.15); opacity: 0.5; }
        }

        .candle-holder {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 36px;
          height: 10px;
          background: linear-gradient(180deg,
            rgba(80, 70, 60, 0.9) 0%,
            rgba(60, 50, 40, 1) 100%);
          border-radius: 4px 4px 6px 6px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
        }

        /* Meditation Mat */
        .meditation-mat {
          position: absolute;
          bottom: 8%;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 60px;
          background: linear-gradient(90deg,
            rgba(80, 70, 100, 0.3) 0%,
            rgba(100, 90, 120, 0.4) 50%,
            rgba(80, 70, 100, 0.3) 100%);
          border-radius: 100px;
          box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
        }

        .mat-pattern {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 60%;
          border: 1px solid rgba(139, 119, 183, 0.2);
          border-radius: 50px;
        }

        /* Back Button */
        .back-button {
          position: fixed;
          top: calc(env(safe-area-inset-top, 0px) + 16px);
          left: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.85rem;
          cursor: pointer;
          z-index: 100;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateX(-2px);
        }

        /* Content */
        .content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px;
          opacity: ${isLoaded ? 1 : 0};
          transform: translateY(${isLoaded ? '0' : '20px'});
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        /* Breathing Orb */
        .orb-container {
          position: relative;
          margin-bottom: 30px;
        }

        .zen-orb {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%,
            rgba(200, 180, 240, 0.5) 0%,
            rgba(150, 130, 200, 0.35) 40%,
            rgba(120, 100, 180, 0.2) 70%,
            rgba(100, 80, 160, 0.1) 100%);
          box-shadow: 
            0 0 80px rgba(139, 119, 183, 0.4),
            0 0 150px rgba(139, 119, 183, 0.2),
            inset 0 0 60px rgba(139, 119, 183, 0.15);
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: ${mode === 'select' ? 'pointer' : 'default'};
        }

        .orb-inner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: 60%;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%,
            rgba(220, 200, 255, 0.4) 0%,
            rgba(180, 160, 220, 0.2) 50%,
            transparent 70%);
        }

        .orb-ring {
          position: absolute;
          top: -15px;
          left: -15px;
          right: -15px;
          bottom: -15px;
          border-radius: 50%;
          border: 2px solid rgba(139, 119, 183, 0.2);
          animation: orbRingPulse 6s ease-in-out infinite;
        }

        .orb-ring-2 {
          top: -30px;
          left: -30px;
          right: -30px;
          bottom: -30px;
          border-color: rgba(139, 119, 183, 0.1);
          animation-delay: -3s;
        }

        @keyframes orbRingPulse {
          0%, 100% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.2; }
        }

        /* Selection Mode */
        .select-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.8rem;
          font-weight: 300;
          color: #ffffff;
          margin-bottom: 8px;
          letter-spacing: 0.02em;
        }

        .select-subtitle {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 36px;
        }

        .pattern-options {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 24px;
          max-width: 400px;
        }

        .pattern-btn {
          padding: 12px 20px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pattern-btn:hover {
          border-color: rgba(139, 119, 183, 0.5);
          color: rgba(255, 255, 255, 0.9);
        }

        .pattern-btn.selected {
          background: rgba(139, 92, 246, 0.25);
          border-color: rgba(139, 92, 246, 0.5);
          color: #fff;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
        }

        .duration-options {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
        }

        .duration-btn {
          padding: 12px 24px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .duration-btn:hover {
          border-color: rgba(139, 119, 183, 0.4);
          color: rgba(255, 255, 255, 0.8);
        }

        .duration-btn.selected {
          background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
        }

        .start-btn {
          padding: 18px 56px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
          color: #fff;
          font-size: 1.05rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 35px rgba(139, 92, 246, 0.4);
          letter-spacing: 0.02em;
        }

        .start-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 45px rgba(139, 92, 246, 0.5);
        }

        .tap-hint {
          color: rgba(255, 255, 255, 0.25);
          font-size: 0.8rem;
          margin-top: 18px;
        }

        /* Active Breathing */
        .timer {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 8px;
          letter-spacing: 0.1em;
        }

        .phase-text {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          font-weight: 300;
          color: #ffffff;
          margin-bottom: 10px;
          letter-spacing: 0.03em;
        }

        .countdown {
          font-size: 4rem;
          font-weight: 200;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 20px;
          font-variant-numeric: tabular-nums;
        }

        .cycle-counter {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.25);
          margin-bottom: 36px;
          letter-spacing: 0.05em;
        }

        .end-btn {
          padding: 14px 32px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .end-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Complete State */
        .complete-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          color: #ffffff;
          font-size: 2.2rem;
          font-weight: 300;
          margin-bottom: 12px;
          letter-spacing: 0.02em;
        }

        .complete-stats {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
          margin-bottom: 36px;
        }

        .complete-btn {
          padding: 16px 44px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 25px rgba(139, 92, 246, 0.35);
        }

        .complete-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 35px rgba(139, 92, 246, 0.45);
        }

        @media (max-width: 480px) {
          .zen-orb {
            width: 150px;
            height: 150px;
          }

          .candles-container {
            gap: 50px;
          }

          .candle-tall { height: 55px; }
          .candle-medium { height: 45px; margin-top: 10px; }
          .candle-short { height: 38px; margin-top: 17px; }

          .pattern-options {
            max-width: 320px;
          }

          .phase-text {
            font-size: 1.6rem;
          }

          .countdown {
            font-size: 3rem;
          }
        }
      `}</style>

      <div className="zen-room">
        {/* Ambient layers */}
        <div className="ambient-layer stars-layer" />
        <div className="ambient-layer nebula-glow" />
        <div className="ambient-layer ambient-glow" />

        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}

        {/* Ground */}
        <div className="ground">
          <div className="ground-texture" />
        </div>

        {/* Meditation Mat */}
        <div className="meditation-mat">
          <div className="mat-pattern" />
        </div>

        {/* Candles */}
        <div className="candles-container">
          {/* Left candle */}
          <div className="candle-group">
            <div className="candle candle-medium">
              <div className="wick" />
              <div className="candle-drip drip-1" />
              <div className="flame-container">
                <div className="flame-glow" />
                <div className="flame" />
                <div className="flame-inner" />
              </div>
            </div>
            <div className="candle-holder" />
          </div>

          {/* Center candle (tall) */}
          <div className="candle-group">
            <div className="candle candle-tall">
              <div className="wick" />
              <div className="candle-drip drip-1" />
              <div className="candle-drip drip-2" />
              <div className="flame-container">
                <div className="flame-glow" />
                <div className="flame" />
                <div className="flame-inner" />
              </div>
            </div>
            <div className="candle-holder" />
          </div>

          {/* Right candle */}
          <div className="candle-group">
            <div className="candle candle-short">
              <div className="wick" />
              <div className="candle-drip drip-2" />
              <div className="flame-container">
                <div className="flame-glow" />
                <div className="flame" />
                <div className="flame-inner" />
              </div>
            </div>
            <div className="candle-holder" />
          </div>
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={resetAndGoBack}>
          <span>←</span>
          <span>Back</span>
        </button>

        {/* Content */}
        <div className="content">
          {/* Breathing Orb */}
          <div className="orb-container">
            <div className="orb-ring" />
            <div className="orb-ring orb-ring-2" />
            <div 
              className="zen-orb" 
              style={{ transform: `scale(${getOrbScale()})` }}
              onClick={mode === 'select' ? startBreathing : undefined}
            >
              <div className="orb-inner" />
            </div>
          </div>

          {/* Selection Mode */}
          {mode === 'select' && (
            <>
              <h1 className="select-title">Find your breath</h1>
              <div className="select-subtitle">Choose your practice</div>

              <div className="pattern-options">
                {Object.entries(BREATHING_PATTERNS).map(([key, p]) => (
                  <button
                    key={key}
                    className={`pattern-btn ${selectedPattern === key ? 'selected' : ''}`}
                    onClick={() => setSelectedPattern(key)}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              <div className="duration-options">
                {DURATIONS.map((d) => (
                  <button
                    key={d.seconds}
                    className={`duration-btn ${selectedDuration === d.seconds ? 'selected' : ''}`}
                    onClick={() => setSelectedDuration(d.seconds)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              <button className="start-btn" onClick={startBreathing}>
                Begin
              </button>

              <div className="tap-hint">or tap the orb</div>
            </>
          )}

          {/* Active Breathing */}
          {mode === 'active' && currentPhase && (
            <>
              <div className="timer">{formatTime(timeRemaining)}</div>
              <div className="phase-text">{currentPhase.name}</div>
              <div className="countdown">
                {Math.ceil(currentPhase.duration * (1 - phaseProgress))}
              </div>
              <div className="cycle-counter">Cycle {cycleCount + 1}</div>
              <button className="end-btn" onClick={stopBreathing}>
                End Session
              </button>
            </>
          )}

          {/* Complete */}
          {mode === 'complete' && (
            <>
              <h1 className="complete-title">Beautiful</h1>
              <div className="complete-stats">
                {cycleCount} breathing cycles completed
              </div>
              <button className="complete-btn" onClick={resetAndGoBack}>
                Return to Sanctuary
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}