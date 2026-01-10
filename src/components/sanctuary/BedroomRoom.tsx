'use client';

import { useState, useEffect } from 'react';

interface BedroomRoomProps {
  onBack: () => void;
  onStartSleepStory?: (storyId: string) => void;
  onPlaySound?: (soundId: string) => void;
}

type SleepContent = {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'story' | 'soundscape' | 'meditation';
};

const SLEEP_CONTENT: SleepContent[] = [
  { id: 'rain-sleep', title: 'Gentle Rain', description: 'Soft rain on a quiet night', duration: '∞', type: 'soundscape' },
  { id: 'ocean-waves', title: 'Ocean Waves', description: 'Rhythmic waves for deep sleep', duration: '∞', type: 'soundscape' },
  { id: 'night-forest', title: 'Night Forest', description: 'Crickets and gentle breeze', duration: '∞', type: 'soundscape' },
  { id: 'sleep-story-1', title: 'The Sleepy Village', description: 'A cozy bedtime tale', duration: '20 min', type: 'story' },
  { id: 'sleep-story-2', title: 'Cloud Journey', description: 'Floating through soft clouds', duration: '15 min', type: 'story' },
  { id: 'body-scan', title: 'Body Scan', description: 'Release tension, find rest', duration: '12 min', type: 'meditation' },
];

export default function BedroomRoom({ onBack, onStartSleepStory, onPlaySound }: BedroomRoomProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);
  const [selectedTimer, setSelectedTimer] = useState<string | null>(null);

  useEffect(() => {
    // Generate stars
    const newStars = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 55,
      size: Math.random() * 2.5 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleContentClick = (item: SleepContent) => {
    if (item.type === 'soundscape') {
      const newActive = activeSound === item.id ? null : item.id;
      setActiveSound(newActive);
      if (onPlaySound && newActive) onPlaySound(item.id);
    } else if (onStartSleepStory) {
      onStartSleepStory(item.id);
    }
  };

  return (
    <>
      <style jsx>{`
        .bedroom-room {
          min-height: 100vh;
          min-height: 100dvh;
          background: linear-gradient(180deg, #030308 0%, #08081a 25%, #0d0d25 50%, #0a0a1f 75%, #050515 100%);
          position: relative;
          overflow: hidden;
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

        .night-sky {
          background: 
            radial-gradient(ellipse 120% 80% at 50% 0%, rgba(20, 25, 60, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 30% 10%, rgba(40, 50, 100, 0.15) 0%, transparent 40%);
        }

        .moonlight {
          background: radial-gradient(ellipse 40% 50% at 82% 12%, rgba(180, 190, 230, 0.12) 0%, transparent 50%);
          animation: moonGlow 8s ease-in-out infinite;
        }

        @keyframes moonGlow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        .stars-glow {
          background: 
            radial-gradient(ellipse 60% 40% at 20% 20%, rgba(100, 120, 180, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 70% 30%, rgba(120, 130, 200, 0.04) 0%, transparent 40%);
        }

        /* Stars */
        .star {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          animation: twinkle ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        .shooting-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          box-shadow: 
            0 0 5px white,
            -20px 0 10px rgba(255, 255, 255, 0.5),
            -40px 0 15px rgba(255, 255, 255, 0.3),
            -60px 0 20px rgba(255, 255, 255, 0.1);
          animation: shootingStar 8s ease-in-out infinite;
          opacity: 0;
        }

        @keyframes shootingStar {
          0%, 90%, 100% { 
            opacity: 0;
            transform: translate(0, 0) rotate(-45deg);
          }
          92% {
            opacity: 1;
          }
          95% {
            opacity: 1;
            transform: translate(150px, 150px) rotate(-45deg);
          }
          96% {
            opacity: 0;
            transform: translate(180px, 180px) rotate(-45deg);
          }
        }

        /* Moon */
        .moon-container {
          position: absolute;
          top: 8%;
          right: 10%;
        }

        .moon {
          width: 75px;
          height: 75px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%,
            rgba(250, 250, 255, 1) 0%,
            rgba(230, 235, 250, 0.95) 25%,
            rgba(200, 210, 235, 0.9) 50%,
            rgba(180, 190, 220, 0.85) 75%,
            rgba(160, 170, 200, 0.8) 100%);
          box-shadow:
            0 0 50px rgba(200, 210, 255, 0.5),
            0 0 100px rgba(180, 190, 240, 0.3),
            0 0 150px rgba(160, 170, 220, 0.15),
            inset -10px -10px 30px rgba(150, 160, 200, 0.3);
        }

        .moon-crater {
          position: absolute;
          border-radius: 50%;
          background: rgba(170, 180, 210, 0.3);
          box-shadow: inset 1px 1px 3px rgba(140, 150, 180, 0.3);
        }

        .crater-1 { width: 12px; height: 12px; top: 20%; left: 25%; }
        .crater-2 { width: 8px; height: 8px; top: 45%; left: 55%; }
        .crater-3 { width: 6px; height: 6px; top: 60%; left: 35%; }
        .crater-4 { width: 10px; height: 10px; top: 30%; left: 60%; }

        .moon-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(200, 210, 255, 0.15) 0%,
            rgba(180, 190, 240, 0.08) 40%,
            transparent 70%);
          animation: moonPulse 6s ease-in-out infinite;
        }

        @keyframes moonPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
        }

        /* Window */
        .window-container {
          position: absolute;
          top: 5%;
          right: 5%;
          width: 25%;
          height: 50%;
        }

        .window {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg,
            rgba(10, 15, 35, 0.8) 0%,
            rgba(15, 20, 45, 0.7) 50%,
            rgba(10, 15, 35, 0.8) 100%);
          border: 4px solid rgba(30, 35, 50, 0.9);
          border-radius: 6px 6px 0 0;
          position: relative;
          box-shadow:
            inset 0 0 50px rgba(100, 120, 180, 0.08),
            0 0 30px rgba(0, 0, 0, 0.5);
        }

        .window-frame-v {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background: rgba(30, 35, 50, 0.9);
        }

        .window-frame-h {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 4px;
          background: rgba(30, 35, 50, 0.9);
        }

        .window-sill {
          position: absolute;
          bottom: -10px;
          left: -6px;
          right: -6px;
          height: 10px;
          background: linear-gradient(180deg,
            rgba(40, 45, 60, 1) 0%,
            rgba(30, 35, 50, 1) 100%);
          border-radius: 0 0 4px 4px;
        }

        /* Curtains */
        .curtain {
          position: absolute;
          top: -3%;
          width: 22%;
          height: 108%;
          background: linear-gradient(180deg,
            rgba(40, 45, 70, 0.9) 0%,
            rgba(35, 40, 60, 0.85) 50%,
            rgba(30, 35, 55, 0.8) 100%);
        }

        .curtain-left {
          left: -15%;
          border-radius: 0 6px 0 0;
          box-shadow: 3px 0 15px rgba(0, 0, 0, 0.3);
        }

        .curtain-right {
          right: -15%;
          border-radius: 6px 0 0 0;
          box-shadow: -3px 0 15px rgba(0, 0, 0, 0.3);
        }

        .curtain-fold {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 30%;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0, 0, 0, 0.08) 50%,
            transparent 100%);
        }

        .curtain-left .curtain-fold { right: 15%; }
        .curtain-right .curtain-fold { left: 15%; }

        /* Bed */
        .bed-container {
          position: absolute;
          bottom: 8%;
          left: 5%;
          width: 55%;
          height: 35%;
        }

        .bed-frame {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 85%;
          background: linear-gradient(180deg,
            rgba(45, 40, 55, 0.95) 0%,
            rgba(35, 32, 45, 0.9) 100%);
          border-radius: 8px;
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.4),
            inset 0 2px 10px rgba(80, 75, 100, 0.1);
        }

        .headboard {
          position: absolute;
          top: -25%;
          left: 2%;
          right: 2%;
          height: 35%;
          background: linear-gradient(180deg,
            rgba(55, 50, 68, 0.98) 0%,
            rgba(45, 40, 55, 0.95) 100%);
          border-radius: 12px 12px 0 0;
          box-shadow:
            0 -5px 25px rgba(0, 0, 0, 0.3),
            inset 0 5px 15px rgba(90, 85, 110, 0.1);
        }

        .headboard-detail {
          position: absolute;
          top: 15%;
          left: 5%;
          right: 5%;
          bottom: 20%;
          background: linear-gradient(180deg,
            rgba(60, 55, 75, 0.3) 0%,
            transparent 100%);
          border-radius: 8px;
          border: 1px solid rgba(80, 75, 100, 0.15);
        }

        .mattress {
          position: absolute;
          top: 8%;
          left: 3%;
          right: 3%;
          height: 75%;
          background: linear-gradient(180deg,
            rgba(240, 238, 245, 0.95) 0%,
            rgba(225, 220, 235, 0.9) 50%,
            rgba(210, 205, 220, 0.85) 100%);
          border-radius: 6px;
          box-shadow:
            inset 0 5px 20px rgba(255, 255, 255, 0.3),
            inset 0 -8px 25px rgba(0, 0, 0, 0.08);
        }

        .blanket {
          position: absolute;
          top: 25%;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg,
            rgba(80, 90, 130, 0.95) 0%,
            rgba(70, 80, 120, 0.9) 40%,
            rgba(60, 70, 110, 0.85) 100%);
          border-radius: 0 0 6px 6px;
          box-shadow:
            inset 0 8px 25px rgba(120, 130, 170, 0.2),
            0 5px 20px rgba(0, 0, 0, 0.15);
        }

        .blanket-fold {
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 20%;
          background: linear-gradient(180deg,
            rgba(90, 100, 140, 0.4) 0%,
            transparent 100%);
          border-radius: 0 0 30px 30px;
        }

        /* Pillows */
        .pillow {
          position: absolute;
          top: 12%;
          height: 20%;
          background: linear-gradient(180deg,
            rgba(250, 250, 255, 0.98) 0%,
            rgba(235, 235, 245, 0.95) 100%);
          border-radius: 8px;
          box-shadow:
            0 5px 20px rgba(0, 0, 0, 0.1),
            inset 0 3px 15px rgba(255, 255, 255, 0.5);
        }

        .pillow-1 {
          left: 8%;
          width: 28%;
          transform: rotate(-3deg);
        }

        .pillow-2 {
          right: 8%;
          width: 28%;
          transform: rotate(2deg);
        }

        .pillow-indent {
          position: absolute;
          top: 30%;
          left: 20%;
          right: 20%;
          bottom: 30%;
          background: rgba(220, 220, 235, 0.3);
          border-radius: 50%;
        }

        /* Nightstand */
        .nightstand {
          position: absolute;
          bottom: 12%;
          right: 22%;
          width: 60px;
        }

        .nightstand-top {
          width: 100%;
          height: 10px;
          background: linear-gradient(180deg,
            rgba(50, 45, 60, 1) 0%,
            rgba(40, 35, 50, 1) 100%);
          border-radius: 4px 4px 0 0;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
        }

        .nightstand-body {
          width: 100%;
          height: 55px;
          background: linear-gradient(180deg,
            rgba(45, 40, 55, 1) 0%,
            rgba(38, 34, 48, 1) 100%);
          border-radius: 0 0 4px 4px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .nightstand-drawer {
          position: absolute;
          top: 15px;
          left: 8%;
          right: 8%;
          height: 18px;
          background: linear-gradient(180deg,
            rgba(55, 50, 65, 0.8) 0%,
            rgba(45, 40, 55, 0.7) 100%);
          border-radius: 2px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .drawer-handle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 15px;
          height: 4px;
          background: rgba(100, 95, 115, 0.8);
          border-radius: 2px;
        }

        /* Lamp on nightstand */
        .nightstand-lamp {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
        }

        .lamp-shade-night {
          width: 28px;
          height: 22px;
          background: linear-gradient(180deg,
            rgba(60, 55, 75, 0.95) 0%,
            rgba(50, 45, 65, 0.9) 100%);
          border-radius: 4px 4px 10px 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .lamp-stem-night {
          width: 4px;
          height: 15px;
          background: linear-gradient(180deg,
            rgba(80, 75, 95, 1) 0%,
            rgba(65, 60, 80, 1) 100%);
          margin: 0 auto;
        }

        .lamp-base-night {
          width: 16px;
          height: 5px;
          background: linear-gradient(180deg,
            rgba(70, 65, 85, 1) 0%,
            rgba(55, 50, 70, 1) 100%);
          margin: 0 auto;
          border-radius: 2px;
        }

        /* Floor */
        .floor {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background: linear-gradient(180deg,
            rgba(18, 18, 30, 0.95) 0%,
            rgba(12, 12, 22, 1) 100%);
          transform: perspective(600px) rotateX(45deg);
          transform-origin: bottom center;
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
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
          cursor: pointer;
          z-index: 100;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(-2px);
        }

        /* Content */
        .content {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: calc(env(safe-area-inset-top, 0px) + 80px) 20px 100px;
          opacity: ${isLoaded ? 1 : 0};
          transform: translateY(${isLoaded ? '0' : '20px'});
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.2rem;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 10px;
          letter-spacing: 0.03em;
        }

        .subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.45);
        }

        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
          gap: 16px;
          max-width: 720px;
          width: 100%;
        }

        .content-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 22px;
          padding: 26px 18px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .content-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 119, 183, 0.4);
          background: rgba(139, 119, 183, 0.08);
          box-shadow: 0 12px 40px rgba(139, 119, 183, 0.12);
        }

        .content-card.active {
          border-color: rgba(139, 119, 183, 0.6);
          background: rgba(139, 119, 183, 0.12);
          box-shadow: 0 0 40px rgba(139, 119, 183, 0.2);
        }

        .card-title {
          font-size: 1rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 8px;
        }

        .card-description {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: 10px;
          line-height: 1.45;
        }

        .card-duration {
          font-size: 0.8rem;
          color: rgba(139, 119, 183, 0.8);
          letter-spacing: 0.03em;
        }

        /* Playing Indicator */
        .playing-indicator {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-top: 14px;
        }

        .playing-bar {
          width: 3px;
          border-radius: 2px;
          background: rgba(139, 119, 183, 0.8);
          animation: playingBounce 0.8s ease-in-out infinite alternate;
        }

        .bar-1 { height: 12px; animation-delay: 0s; }
        .bar-2 { height: 18px; animation-delay: 0.15s; }
        .bar-3 { height: 14px; animation-delay: 0.3s; }
        .bar-4 { height: 16px; animation-delay: 0.45s; }

        @keyframes playingBounce {
          0% { transform: scaleY(0.4); }
          100% { transform: scaleY(1); }
        }

        /* Sleep Timer */
        .sleep-timer {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 28px;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50px;
          backdrop-filter: blur(15px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        .timer-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.55);
        }

        .timer-options {
          display: flex;
          gap: 8px;
        }

        .timer-btn {
          padding: 8px 14px;
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: transparent;
          color: rgba(255, 255, 255, 0.55);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .timer-btn:hover {
          background: rgba(139, 119, 183, 0.2);
          border-color: rgba(139, 119, 183, 0.4);
          color: rgba(255, 255, 255, 0.9);
        }

        .timer-btn.active {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(99, 102, 241, 0.4) 100%);
          border-color: rgba(139, 92, 246, 0.5);
          color: #fff;
        }

        /* VERA Orb */
        .vera-presence {
          position: fixed;
          bottom: 90px;
          right: 24px;
          z-index: 50;
        }

        .vera-orb {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%,
            rgba(200, 180, 240, 0.7) 0%,
            rgba(150, 130, 200, 0.5) 50%,
            rgba(120, 100, 180, 0.3) 100%);
          box-shadow: 0 0 30px rgba(139, 119, 183, 0.3);
          animation: orbBreathe 6s ease-in-out infinite;
          cursor: pointer;
        }

        @keyframes orbBreathe {
          0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(139, 119, 183, 0.3); }
          50% { transform: scale(1.05); box-shadow: 0 0 45px rgba(139, 119, 183, 0.4); }
        }

        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .bed-container {
            width: 70%;
            left: 3%;
          }

          .nightstand {
            display: none;
          }

          .window-container {
            width: 30%;
          }

          .sleep-timer {
            flex-direction: column;
            gap: 10px;
            padding: 16px 24px;
          }
        }
      `}</style>

      <div className="bedroom-room">
        {/* Ambient Layers */}
        <div className="ambient-layer night-sky" />
        <div className="ambient-layer moonlight" />
        <div className="ambient-layer stars-glow" />

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

        {/* Shooting Star */}
        <div className="shooting-star" style={{ top: '15%', left: '20%' }} />

        {/* Floor */}
        <div className="floor" />

        {/* Window with Curtains */}
        <div className="window-container">
          <div className="curtain curtain-left">
            <div className="curtain-fold" />
          </div>
          <div className="curtain curtain-right">
            <div className="curtain-fold" />
          </div>
          <div className="window">
            <div className="window-frame-v" />
            <div className="window-frame-h" />
          </div>
          <div className="window-sill" />
        </div>

        {/* Moon */}
        <div className="moon-container">
          <div className="moon-glow" />
          <div className="moon">
            <div className="moon-crater crater-1" />
            <div className="moon-crater crater-2" />
            <div className="moon-crater crater-3" />
            <div className="moon-crater crater-4" />
          </div>
        </div>

        {/* Bed */}
        <div className="bed-container">
          <div className="headboard">
            <div className="headboard-detail" />
          </div>
          <div className="bed-frame">
            <div className="mattress">
              <div className="pillow pillow-1">
                <div className="pillow-indent" />
              </div>
              <div className="pillow pillow-2">
                <div className="pillow-indent" />
              </div>
            </div>
            <div className="blanket">
              <div className="blanket-fold" />
            </div>
          </div>
        </div>

        {/* Nightstand */}
        <div className="nightstand">
          <div className="nightstand-lamp">
            <div className="lamp-shade-night" />
            <div className="lamp-stem-night" />
            <div className="lamp-base-night" />
          </div>
          <div className="nightstand-top" />
          <div className="nightstand-body">
            <div className="nightstand-drawer">
              <div className="drawer-handle" />
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={onBack}>
          <span>←</span>
          <span>Back</span>
        </button>

        {/* Content */}
        <div className="content">
          <div className="header">
            <h1 className="title">Time to Rest</h1>
            <div className="subtitle">Let go of the day</div>
          </div>

          <div className="content-grid">
            {SLEEP_CONTENT.map((item) => (
              <div
                key={item.id}
                className={`content-card ${activeSound === item.id ? 'active' : ''}`}
                onClick={() => handleContentClick(item)}
              >
                <div className="card-title">{item.title}</div>
                <div className="card-description">{item.description}</div>
                <div className="card-duration">{item.duration}</div>

                {activeSound === item.id && (
                  <div className="playing-indicator">
                    <div className="playing-bar bar-1" />
                    <div className="playing-bar bar-2" />
                    <div className="playing-bar bar-3" />
                    <div className="playing-bar bar-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sleep Timer */}
        <div className="sleep-timer">
          <span className="timer-label">Sleep timer</span>
          <div className="timer-options">
            {['15m', '30m', '1h', '∞'].map((time) => (
              <button
                key={time}
                className={`timer-btn ${selectedTimer === time ? 'active' : ''}`}
                onClick={() => setSelectedTimer(selectedTimer === time ? null : time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* VERA Presence */}
        <div className="vera-presence">
          <div className="vera-orb" />
        </div>
      </div>
    </>
  );
}