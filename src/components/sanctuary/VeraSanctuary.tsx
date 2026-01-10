'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface VeraSanctuaryProps {
  onRoomSelect: (room: string) => void;
  userName?: string;
}

type Room = {
  id: string;
  name: string;
  description: string;
};

const ROOMS: Room[] = [
  { id: 'therapy', name: 'Therapy Room', description: 'Talk with VERA' },
  { id: 'zen', name: 'Zen Room', description: 'Breathe & meditate' },
  { id: 'library', name: 'Library', description: 'Stories & learning' },
  { id: 'bedroom', name: 'Bedroom', description: 'Sleep & rest' },
  { id: 'studio', name: 'Design Studio', description: 'Create spaces' },
  { id: 'journal', name: 'Journal Nook', description: 'Write & reflect' },
];

export default function VeraSanctuary({ onRoomSelect, userName }: VeraSanctuaryProps) {
  const router = useRouter();

  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);
  const [dustParticles, setDustParticles] = useState<Array<{ id: number; x: number; size: number; duration: number; delay: number }>>([]);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');

  const handleTalkToVera = () => {
    router.push('/chat-exact');
  };

  useEffect(() => {
    // Floating ambient particles
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    // Dust in light beams
    const newDust = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: 50 + Math.random() * 40,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 8,
    }));
    setDustParticles(newDust);

    // Determine time of day
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setTimeOfDay('morning');
    else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon');
    else if (hour >= 17 && hour < 21) setTimeOfDay('evening');
    else setTimeOfDay('night');
  }, []);

  const getGreeting = () => {
    switch (timeOfDay) {
      case 'morning': return 'Good morning';
      case 'afternoon': return 'Good afternoon';
      case 'evening': return 'Good evening';
      case 'night': return 'Late night sanctuary';
    }
  };

  const isDark = timeOfDay === 'evening' || timeOfDay === 'night';

  return (
    <>
      <style jsx>{`
        .sanctuary-container {
          min-height: 100vh;
          min-height: 100dvh;
          background: ${isDark 
            ? 'linear-gradient(180deg, #0e0e1a 0%, #1a1a2e 50%, #0e0e1a 100%)'
            : 'linear-gradient(180deg, #faf8f5 0%, #f5f0e8 60%, #ebe5db 100%)'};
          position: relative;
          overflow: hidden;
          transition: background 1s ease;
        }

        .vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 9;
          background:
            radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,${isDark ? 0.35 : 0.18}) 100%);
        }

        /* ==================== INTRO SEQUENCE (CSS-only) ==================== */
        .intro-bg {
          opacity: 0;
          animation: introFadeIn 0.5s ease-out forwards;
        }

        .intro-orb {
          opacity: 0;
          transform: scale(0.9);
          animation: introPop 0.5s ease-out forwards;
          animation-delay: 0.5s;
        }

        .intro-greeting {
          opacity: 0;
          transform: translateY(14px);
          animation: introRise 0.5s ease-out forwards;
          animation-delay: 1s;
        }

        .intro-quick {
          opacity: 0;
          transform: translateY(14px);
          animation: introRise 0.5s ease-out forwards;
          animation-delay: 1.5s;
        }

        .intro-grid {
          opacity: 0;
          transform: translateY(18px);
          animation: introRise 0.5s ease-out forwards;
          animation-delay: 2s;
        }

        @keyframes introFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes introPop {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes introRise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-bg,
          .intro-orb,
          .intro-greeting,
          .intro-quick,
          .intro-grid {
            opacity: 1;
            transform: none;
            animation: none;
          }
        }

        /* Ambient Light Layers */
        .light-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .sunlight {
          background: ${isDark
            ? 'radial-gradient(ellipse 60% 60% at 80% 20%, rgba(100, 100, 180, 0.15) 0%, transparent 50%)'
            : `radial-gradient(ellipse 80% 100% at 75% 20%, rgba(255, 248, 235, 0.9) 0%, transparent 50%),
               radial-gradient(ellipse 60% 80% at 80% 30%, rgba(255, 245, 225, 0.6) 0%, transparent 40%)`};
          animation: sunPulse 8s ease-in-out infinite;
        }

        @keyframes sunPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }

        .ambient-glow {
          background: ${isDark
            ? 'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(139, 119, 183, 0.1) 0%, transparent 60%)'
            : `radial-gradient(ellipse 100% 60% at 50% 100%, rgba(212, 200, 184, 0.3) 0%, transparent 60%),
               radial-gradient(ellipse 80% 40% at 20% 80%, rgba(168, 181, 160, 0.15) 0%, transparent 50%)`};
        }

        /* Light Beams */
        .light-beams {
          position: absolute;
          top: 0;
          right: 10%;
          width: 45%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          opacity: ${isDark ? 0.3 : 1};
        }

        .beam {
          position: absolute;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(100, 120, 180, 0.2) 0%, rgba(100, 120, 180, 0.1) 30%, transparent 70%)'
            : 'linear-gradient(180deg, rgba(255, 250, 240, 0.4) 0%, rgba(255, 248, 235, 0.2) 30%, rgba(255, 245, 225, 0.05) 70%, transparent 100%)'};
          transform-origin: top center;
          animation: beamFloat 12s ease-in-out infinite;
        }

        .beam-1 {
          width: 120px;
          height: 110%;
          top: -5%;
          left: 20%;
          transform: rotate(-8deg) skewX(-5deg);
          animation-delay: 0s;
        }

        .beam-2 {
          width: 80px;
          height: 105%;
          top: -5%;
          left: 45%;
          transform: rotate(-5deg) skewX(-3deg);
          animation-delay: -3s;
          opacity: 0.7;
        }

        .beam-3 {
          width: 100px;
          height: 108%;
          top: -5%;
          left: 65%;
          transform: rotate(-10deg) skewX(-4deg);
          animation-delay: -6s;
          opacity: 0.5;
        }

        .beam-4 {
          width: 60px;
          height: 112%;
          top: -6%;
          left: 8%;
          transform: rotate(-12deg) skewX(-6deg);
          animation-delay: -9s;
          opacity: 0.35;
        }

        .beam-5 {
          width: 140px;
          height: 110%;
          top: -6%;
          left: 78%;
          transform: rotate(-7deg) skewX(-4deg);
          animation-delay: -12s;
          opacity: 0.25;
        }

        @keyframes beamFloat {
          0%, 100% { transform: rotate(-8deg) skewX(-5deg) translateX(0); opacity: 1; }
          50% { transform: rotate(-6deg) skewX(-4deg) translateX(10px); opacity: 0.8; }
        }

        /* Dust Particles in Light */
        .dust-container {
          position: absolute;
          top: 0;
          right: 5%;
          width: 50%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .dust {
          position: absolute;
          border-radius: 50%;
          background: ${isDark ? 'rgba(200, 200, 255, 0.6)' : 'rgba(255, 250, 240, 0.8)'};
          box-shadow: 0 0 6px ${isDark ? 'rgba(200, 200, 255, 0.4)' : 'rgba(255, 250, 240, 0.5)'};
          animation: dustFloat linear infinite;
        }

        @keyframes dustFloat {
          0% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(80vh) translateX(10px) scale(1);
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-20vh) translateX(-20px) scale(0.5);
            opacity: 0;
          }
        }

        /* Floating particles */
        .particle {
          position: absolute;
          border-radius: 50%;
          background: ${isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 248, 235, 0.8)'};
          box-shadow: 0 0 ${isDark ? '10px' : '6px'} ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 248, 235, 0.5)'};
          animation: float linear infinite;
        }

        @keyframes float {
          0% { transform: translateY(100vh) translateX(-12px) scale(0); opacity: 0; }
          10% { opacity: 0.85; transform: translateY(80vh) translateX(18px) scale(1); }
          50% { opacity: 0.65; transform: translateY(40vh) translateX(-22px) scale(1.05); }
          90% { opacity: 0.55; }
          100% { transform: translateY(-20vh) translateX(26px) scale(0.5); opacity: 0; }
        }

        /* Room Structure Background */
        .room-bg {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70%;
          pointer-events: none;
          opacity: ${isDark ? 0.55 : 0.6};
        }

        /* Floor */
        .floor {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 45%;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(30, 30, 50, 0.6) 0%, rgba(20, 20, 35, 0.8) 50%, rgba(15, 15, 25, 0.9) 100%)'
            : 'linear-gradient(180deg, rgba(245, 240, 232, 0.9) 0%, rgba(232, 224, 212, 0.95) 50%, rgba(221, 213, 200, 1) 100%)'};
          transform: perspective(850px) rotateX(68deg);
          transform-origin: bottom center;
        }

        .floor-texture {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: repeating-linear-gradient(90deg, 
            transparent 0px, 
            transparent 150px, 
            ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 150px, 
            ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 152px);
          opacity: 0.5;
        }

        /* Wall */
        .wall-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 70%;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(20, 20, 35, 0.9) 0%, rgba(26, 26, 46, 0.95) 60%, rgba(30, 30, 50, 1) 100%)'
            : 'linear-gradient(180deg, rgba(250, 248, 245, 1) 0%, rgba(245, 240, 232, 1) 60%, rgba(235, 229, 219, 1) 100%)'};
        }

        /* Window */
        .window-container {
          position: absolute;
          top: 8%;
          right: 8%;
          width: 28%;
          height: 45%;
        }

        .window {
          width: 100%;
          height: 100%;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(20, 25, 50, 0.9) 0%, rgba(30, 40, 70, 0.8) 50%, rgba(25, 30, 55, 0.9) 100%)'
            : 'linear-gradient(180deg, rgba(232, 244, 248, 0.9) 0%, rgba(212, 232, 237, 0.8) 30%, rgba(200, 221, 229, 0.85) 60%, rgba(240, 245, 242, 0.9) 100%)'};
          border: 4px solid ${isDark ? 'rgba(60, 60, 80, 0.6)' : 'rgba(212, 200, 184, 0.9)'};
          box-shadow: 
            inset 0 0 60px ${isDark ? 'rgba(100, 120, 180, 0.2)' : 'rgba(255, 255, 255, 0.8)'},
            0 10px 40px ${isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.08)'};
          position: relative;
          border-radius: 4px;
        }

        .window-frame-v {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background: ${isDark ? 'rgba(60, 60, 80, 0.6)' : 'rgba(212, 200, 184, 0.9)'};
        }

        .window-frame-h {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 4px;
          background: ${isDark ? 'rgba(60, 60, 80, 0.6)' : 'rgba(212, 200, 184, 0.9)'};
        }

        .window-sill {
          position: absolute;
          bottom: -12px;
          left: -8px;
          right: -8px;
          height: 12px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(60, 60, 80, 0.7) 0%, rgba(50, 50, 70, 0.8) 100%)'
            : 'linear-gradient(180deg, rgba(212, 200, 184, 1) 0%, rgba(196, 184, 168, 1) 100%)'};
          border-radius: 0 0 3px 3px;
        }

        /* Moon visible through window at night */
        .moon-window {
          position: absolute;
          top: 20%;
          right: 25%;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #f0f0ff 0%, #d0d0e8 50%, #b8b8d0 100%);
          box-shadow: 0 0 30px rgba(200, 210, 255, 0.6);
          opacity: ${isDark ? 1 : 0};
          transition: opacity 1s ease;
        }

        /* Sofa */
        .sofa-container {
          position: absolute;
          bottom: 18%;
          left: 6%;
          width: 38%;
          height: auto;
        }

        .sofa {
          position: relative;
          width: 100%;
          height: 140px;
        }

        .sofa-back {
          position: absolute;
          bottom: 50px;
          left: 0;
          width: 100%;
          height: 90px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(80, 70, 100, 0.7) 0%, rgba(70, 60, 90, 0.8) 50%, rgba(60, 50, 80, 0.9) 100%)'
            : 'linear-gradient(180deg, rgba(232, 224, 212, 0.95) 0%, rgba(216, 207, 192, 0.9) 50%, rgba(200, 191, 176, 0.85) 100%)'};
          border-radius: 16px 16px 0 0;
          box-shadow: 
            inset 0 10px 30px ${isDark ? 'rgba(100, 90, 130, 0.3)' : 'rgba(255,255,255,0.5)'},
            0 -5px 20px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.08)'};
        }

        .sofa-seat {
          position: absolute;
          bottom: 25px;
          left: 5%;
          width: 90%;
          height: 40px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(90, 80, 110, 0.8) 0%, rgba(80, 70, 100, 0.9) 100%)'
            : 'linear-gradient(180deg, rgba(240, 232, 220, 1) 0%, rgba(224, 216, 204, 1) 100%)'};
          border-radius: 12px;
          box-shadow: 
            0 8px 25px ${isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.08)'},
            inset 0 5px 15px ${isDark ? 'rgba(100, 90, 130, 0.2)' : 'rgba(255,255,255,0.6)'};
        }

        .sofa-cushion {
          position: absolute;
          bottom: 55px;
          width: 26%;
          height: 55px;
          background: ${isDark
            ? 'linear-gradient(135deg, rgba(85, 75, 105, 0.85) 0%, rgba(75, 65, 95, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(235, 227, 215, 1) 0%, rgba(221, 213, 201, 1) 100%)'};
          border-radius: 10px;
          box-shadow: 
            inset 0 5px 15px ${isDark ? 'rgba(100, 90, 130, 0.2)' : 'rgba(255,255,255,0.5)'},
            0 5px 15px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.08)'};
        }

        .cushion-1 { left: 8%; }
        .cushion-2 { left: 37%; }
        .cushion-3 { left: 66%; }

        .sofa-arm {
          position: absolute;
          bottom: 25px;
          width: 10%;
          height: 70px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(80, 70, 100, 0.8) 0%, rgba(70, 60, 90, 0.9) 100%)'
            : 'linear-gradient(180deg, rgba(224, 216, 204, 1) 0%, rgba(208, 200, 188, 1) 100%)'};
          border-radius: 12px;
          box-shadow: 0 5px 20px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.08)'};
        }

        .arm-left { left: 0; border-radius: 12px 4px 4px 12px; }
        .arm-right { right: 0; border-radius: 4px 12px 12px 4px; }

        .sofa-legs {
          position: absolute;
          bottom: 0;
          width: 6px;
          height: 25px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(60, 50, 70, 0.9) 0%, rgba(50, 40, 60, 1) 100%)'
            : 'linear-gradient(180deg, rgba(139, 115, 85, 1) 0%, rgba(107, 85, 69, 1) 100%)'};
          border-radius: 2px;
        }

        .leg-1 { left: 10%; }
        .leg-2 { left: 35%; }
        .leg-3 { right: 35%; }
        .leg-4 { right: 10%; }

        /* Throw Pillows */
        .throw-pillow {
          position: absolute;
          width: 45px;
          height: 38px;
          border-radius: 8px;
          box-shadow: 0 3px 10px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.08)'};
        }

        .pillow-sage {
          bottom: 80px;
          left: 12%;
          background: ${isDark
            ? 'linear-gradient(135deg, rgba(100, 130, 100, 0.8) 0%, rgba(80, 110, 80, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(168, 181, 160, 1) 0%, rgba(143, 165, 136, 1) 100%)'};
          transform: rotate(-8deg);
        }

        .pillow-terracotta {
          bottom: 75px;
          right: 15%;
          background: ${isDark
            ? 'linear-gradient(135deg, rgba(160, 100, 80, 0.8) 0%, rgba(140, 85, 65, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(196, 164, 132, 1) 0%, rgba(184, 148, 116, 1) 100%)'};
          transform: rotate(5deg);
        }

        /* Coffee Table */
        .coffee-table {
          position: absolute;
          bottom: 12%;
          left: 25%;
          width: 20%;
        }

        .table-top {
          width: 100%;
          height: 12px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(80, 65, 50, 0.9) 0%, rgba(70, 55, 40, 1) 100%)'
            : 'linear-gradient(180deg, rgba(160, 128, 96, 1) 0%, rgba(139, 112, 80, 1) 100%)'};
          border-radius: 20px;
          box-shadow: 
            0 8px 25px ${isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0,0,0,0.15)'},
            inset 0 2px 5px ${isDark ? 'rgba(100, 85, 70, 0.3)' : 'rgba(255,255,255,0.2)'};
        }

        .table-legs {
          display: flex;
          justify-content: space-between;
          padding: 0 15%;
          margin-top: 4px;
        }

        .table-leg {
          width: 6px;
          height: 30px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(70, 55, 40, 0.9) 0%, rgba(55, 40, 30, 1) 100%)'
            : 'linear-gradient(180deg, rgba(139, 112, 80, 1) 0%, rgba(107, 80, 64, 1) 100%)'};
          border-radius: 2px;
        }

        /* Items on coffee table */
        .table-items {
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 20px;
          align-items: flex-end;
        }

        .vase {
          width: 18px;
          height: 35px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(200, 195, 190, 0.9) 0%, rgba(180, 175, 170, 1) 100%)'
            : 'linear-gradient(180deg, rgba(245, 240, 232, 1) 0%, rgba(224, 216, 204, 1) 100%)'};
          border-radius: 6px 6px 4px 4px;
          position: relative;
          box-shadow: 0 3px 10px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.08)'};
        }

        .vase-flowers {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 25px;
          height: 25px;
        }

        .flower-stem {
          position: absolute;
          bottom: 0;
          width: 2px;
          height: 20px;
          background: rgba(120, 150, 100, 0.8);
        }

        .flower-stem-1 { left: 8px; transform: rotate(-10deg); }
        .flower-stem-2 { left: 12px; }
        .flower-stem-3 { left: 16px; transform: rotate(10deg); }

        .book-stack {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .book {
          height: 6px;
          border-radius: 1px;
          box-shadow: 0 1px 3px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.08)'};
        }

        .book-1 { width: 35px; background: ${isDark ? 'rgba(100, 130, 100, 0.8)' : 'rgba(168, 181, 160, 1)'}; }
        .book-2 { width: 30px; background: ${isDark ? 'rgba(160, 100, 80, 0.8)' : 'rgba(196, 164, 132, 1)'}; }
        .book-3 { width: 32px; background: ${isDark ? 'rgba(180, 170, 150, 0.8)' : 'rgba(212, 200, 184, 1)'}; }

        /* Candle */
        .candle {
          width: 14px;
          height: 22px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(250, 248, 245, 0.9) 0%, rgba(232, 224, 212, 1) 100%)'
            : 'linear-gradient(180deg, rgba(250, 248, 245, 1) 0%, rgba(232, 224, 212, 1) 100%)'};
          border-radius: 2px;
          position: relative;
          box-shadow: 0 3px 8px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.08)'};
        }

        .candle-flame {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 12px;
          background: radial-gradient(ellipse at bottom, rgba(255, 200, 100, 0.95) 0%, rgba(255, 150, 50, 0.7) 50%, transparent 100%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          animation: flicker 0.5s ease-in-out infinite alternate;
        }

        .candle-glow {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 50px;
          background: radial-gradient(circle, rgba(255, 179, 71, 0.2) 0%, transparent 70%);
          animation: glowPulse 2s ease-in-out infinite;
        }

        @keyframes flicker {
          0% { transform: translateX(-50%) scale(1) rotate(-2deg); opacity: 1; }
          100% { transform: translateX(-50%) scale(1.1) rotate(2deg); opacity: 0.9; }
        }

        @keyframes glowPulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.5; }
          50% { transform: translateX(-50%) scale(1.2); opacity: 0.3; }
        }

        /* Floor Plant */
        .floor-plant {
          position: absolute;
          bottom: 15%;
          right: 12%;
        }

        .large-pot {
          width: 55px;
          height: 45px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(160, 100, 80, 0.8) 0%, rgba(120, 70, 50, 0.9) 100%)'
            : 'linear-gradient(180deg, rgba(196, 164, 132, 1) 0%, rgba(154, 122, 84, 1) 100%)'};
          border-radius: 4px 4px 12px 12px;
          box-shadow: 0 8px 25px ${isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.08)'};
        }

        .plant-leaves-container {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 90px;
        }

        .plant-leaf {
          position: absolute;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(80, 120, 80, 0.7) 0%, rgba(60, 100, 60, 0.8) 100%)'
            : 'linear-gradient(180deg, rgba(120, 160, 100, 0.9) 0%, rgba(100, 140, 80, 1) 100%)'};
          border-radius: 50% 50% 50% 50% / 80% 80% 20% 20%;
          transform-origin: bottom center;
          animation: plantSway 6s ease-in-out infinite;
        }

        .leaf-1 { width: 20px; height: 50px; left: 30px; bottom: 0; transform: rotate(-15deg); animation-delay: 0s; }
        .leaf-2 { width: 22px; height: 55px; left: 38px; bottom: 0; transform: rotate(5deg); animation-delay: -1s; }
        .leaf-3 { width: 18px; height: 45px; left: 25px; bottom: 5px; transform: rotate(-25deg); animation-delay: -2s; }
        .leaf-4 { width: 20px; height: 48px; left: 45px; bottom: 3px; transform: rotate(20deg); animation-delay: -3s; }
        .leaf-5 { width: 16px; height: 40px; left: 20px; bottom: 10px; transform: rotate(-35deg); animation-delay: -4s; }

        @keyframes plantSway {
          0%, 100% { transform: rotate(var(--base-rotate, 0deg)); }
          50% { transform: rotate(calc(var(--base-rotate, 0deg) + 3deg)); }
        }

        .leaf-1 { --base-rotate: -15deg; }
        .leaf-2 { --base-rotate: 5deg; }
        .leaf-3 { --base-rotate: -25deg; }
        .leaf-4 { --base-rotate: 20deg; }
        .leaf-5 { --base-rotate: -35deg; }

        /* Side Table & Lamp */
        .side-table {
          position: absolute;
          bottom: 18%;
          right: 28%;
        }

        .side-table-top {
          width: 40px;
          height: 40px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(160, 130, 100, 0.8) 0%, rgba(140, 110, 80, 0.9) 100%)'
            : 'linear-gradient(180deg, rgba(196, 164, 132, 1) 0%, rgba(160, 128, 96, 1) 100%)'};
          border-radius: 50%;
          box-shadow: 0 5px 15px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.08)'};
        }

        .side-table-leg {
          width: 6px;
          height: 40px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(140, 110, 80, 0.9) 0%, rgba(100, 80, 60, 1) 100%)'
            : 'linear-gradient(180deg, rgba(160, 128, 96, 1) 0%, rgba(128, 96, 64, 1) 100%)'};
          margin: 0 auto;
          border-radius: 2px;
        }

        .lamp {
          position: absolute;
          bottom: 45px;
          left: 50%;
          transform: translateX(-50%);
        }

        .lamp-shade {
          width: 35px;
          height: 28px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(250, 248, 245, 0.85) 0%, rgba(232, 224, 212, 0.9) 100%)'
            : 'linear-gradient(180deg, rgba(250, 248, 245, 1) 0%, rgba(232, 224, 212, 1) 100%)'};
          border-radius: 4px 4px 12px 12px;
          box-shadow: 
            0 5px 15px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.08)'},
            inset 0 -15px 25px ${isDark ? 'rgba(255, 220, 150, 0.3)' : 'rgba(255, 220, 150, 0.2)'};
        }

        .lamp-base {
          width: 5px;
          height: 20px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(160, 130, 100, 0.9) 0%, rgba(140, 110, 80, 1) 100%)'
            : 'linear-gradient(180deg, rgba(196, 164, 132, 1) 0%, rgba(160, 128, 96, 1) 100%)'};
          margin: 0 auto;
        }

        .lamp-foot {
          width: 20px;
          height: 6px;
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(140, 110, 80, 0.9) 0%, rgba(100, 80, 60, 1) 100%)'
            : 'linear-gradient(180deg, rgba(160, 128, 96, 1) 0%, rgba(128, 96, 64, 1) 100%)'};
          border-radius: 2px;
          margin: 0 auto;
        }

        /* Rug */
        .rug {
          position: absolute;
          bottom: 8%;
          left: 12%;
          width: 45%;
          height: 20%;
          background: ${isDark
            ? `radial-gradient(ellipse at center, rgba(100, 90, 120, 0.3) 0%, rgba(80, 70, 100, 0.15) 70%),
               linear-gradient(90deg, transparent 0%, rgba(90, 80, 110, 0.2) 20%, rgba(90, 80, 110, 0.2) 80%, transparent 100%)`
            : `radial-gradient(ellipse at center, rgba(168, 181, 160, 0.4) 0%, rgba(168, 181, 160, 0.1) 70%),
               linear-gradient(90deg, transparent 0%, rgba(212, 200, 184, 0.3) 20%, rgba(212, 200, 184, 0.3) 80%, transparent 100%)`};
          border-radius: 8px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: bottom center;
        }

        /* Content Wrapper */
        .content-wrapper {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 24px 20px 84px;
          opacity: 1;
          transform: none;
        }

        .orb-section {
          width: 100%;
          min-height: 30vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 6vh;
        }

        .content-section {
          width: 100%;
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 28px;
        }

        /* Time Indicator */
        .time-indicator {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border-radius: 20px;
          background: ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(45, 45, 45, 0.7)'};
          font-size: 0.85rem;
          backdrop-filter: blur(10px);
        }

        .time-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }

        .time-icon-morning {
          background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
          box-shadow: 0 0 10px rgba(255, 200, 0, 0.5);
        }

        .time-icon-afternoon {
          background: radial-gradient(circle at 30% 30%, #fff8dc 0%, #ffd700 100%);
          box-shadow: 0 0 12px rgba(255, 215, 0, 0.6);
        }

        .time-icon-evening {
          background: linear-gradient(180deg, #ff6b6b 0%, #9b59b6 100%);
          box-shadow: 0 0 10px rgba(155, 89, 182, 0.4);
        }

        .time-icon-night {
          background: radial-gradient(circle at 70% 30%, #e8e8f0 30%, #c0c0d8 100%);
          box-shadow: 0 0 10px rgba(200, 210, 255, 0.4);
        }

        /* VERA Orb */
        .orb-container {
          position: relative;
          margin-bottom: 0;
        }

        .vera-orb {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, 
            rgba(200, 180, 240, 0.95) 0%, 
            rgba(150, 130, 200, 0.85) 50%, 
            rgba(120, 100, 180, 0.75) 100%);
          box-shadow: 
            0 0 60px rgba(139, 119, 183, 0.4),
            0 0 100px rgba(139, 119, 183, 0.2),
            inset 0 -20px 40px rgba(0, 0, 0, 0.15);
          animation: breathe 5s ease-in-out infinite;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .vera-orb:hover {
          transform: scale(1.05);
        }

        @keyframes breathe {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 60px rgba(139, 119, 183, 0.4), 0 0 100px rgba(139, 119, 183, 0.2), inset 0 -20px 40px rgba(0, 0, 0, 0.15);
          }
          50% { 
            transform: scale(1.08); 
            box-shadow: 0 0 80px rgba(139, 119, 183, 0.5), 0 0 120px rgba(139, 119, 183, 0.3), inset 0 -20px 40px rgba(0, 0, 0, 0.15);
          }
        }

        .orb-ring {
          position: absolute;
          top: -16px;
          left: -16px;
          right: -16px;
          bottom: -16px;
          border-radius: 50%;
          border: 2px solid rgba(139, 119, 183, 0.35);
          box-shadow: 0 0 24px rgba(139, 119, 183, 0.25);
          animation: pulse-ring 5s ease-in-out infinite;
        }

        @keyframes pulse-ring {
          0%, 100% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.2; }
        }

        /* Greeting */
        .greeting {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 300;
          color: ${isDark ? '#ffffff' : '#2d2d2d'};
          margin-bottom: 0;
          text-align: center;
          letter-spacing: 0.02em;
          text-shadow: ${isDark ? '0 2px 18px rgba(0,0,0,0.35)' : '0 2px 14px rgba(0,0,0,0.12)'};
        }

        .subtitle {
          font-size: 1.1rem;
          color: ${isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(45, 45, 45, 0.6)'};
          margin-bottom: 0;
          text-align: center;
          letter-spacing: 0.08em;
        }

        /* Quick Start Buttons */
        .quick-start {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 0;
        }

        .quick-btn {
          padding: 18px 36px;
          border-radius: 50px;
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(45, 45, 45, 0.2)'};
          background: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'};
          color: ${isDark ? '#ffffff' : '#2d2d2d'};
          font-size: 1.02rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .quick-btn:hover {
          background: ${isDark ? 'rgba(139, 119, 183, 0.2)' : 'rgba(201, 169, 98, 0.15)'};
          border-color: ${isDark ? 'rgba(139, 119, 183, 0.5)' : 'rgba(201, 169, 98, 0.5)'};
          transform: translateY(-2px);
        }

        .quick-btn-primary {
          background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
          border: none;
          color: #ffffff;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
        }

        .quick-btn-primary:hover {
          box-shadow: 0 6px 30px rgba(139, 92, 246, 0.4);
          transform: translateY(-2px);
        }

        /* Rooms Grid */
        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          max-width: 840px;
          width: 100%;
          margin-bottom: 0;
        }

        .room-card {
          background: ${isDark
            ? 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(139,119,183,0.06) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(201,169,98,0.10) 100%)'};
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(45, 45, 45, 0.1)'};
          border-radius: 20px;
          padding: 34px 26px;
          min-height: 160px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .room-card::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.18) 0%, transparent 60%);
          opacity: 0.5;
        }

        .room-card:hover,
        .room-card.highlighted {
          transform: translateY(-6px);
          border-color: ${isDark ? 'rgba(139, 119, 183, 0.5)' : 'rgba(201, 169, 98, 0.5)'};
          box-shadow:
            0 14px 60px ${isDark ? 'rgba(139, 119, 183, 0.22)' : 'rgba(0, 0, 0, 0.12)'},
            0 0 0 1px ${isDark ? 'rgba(139, 119, 183, 0.25)' : 'rgba(201, 169, 98, 0.25)'},
            0 0 28px ${isDark ? 'rgba(139, 119, 183, 0.22)' : 'rgba(201, 169, 98, 0.16)'};
        }

        /* Room Icons - Pure CSS */
        .room-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 14px;
          position: relative;
        }

        /* Therapy - Couch */
        .icon-couch-back {
          position: absolute;
          bottom: 12px;
          left: 4px;
          right: 4px;
          height: 20px;
          background: ${isDark ? 'rgba(180, 160, 200, 0.8)' : 'rgba(180, 160, 140, 0.9)'};
          border-radius: 6px 6px 0 0;
        }

        .icon-couch-seat {
          position: absolute;
          bottom: 6px;
          left: 2px;
          right: 2px;
          height: 10px;
          background: ${isDark ? 'rgba(160, 140, 180, 0.9)' : 'rgba(160, 145, 130, 1)'};
          border-radius: 4px;
        }

        .icon-couch-arm {
          position: absolute;
          bottom: 6px;
          width: 6px;
          height: 16px;
          background: ${isDark ? 'rgba(150, 130, 170, 0.9)' : 'rgba(150, 135, 120, 1)'};
          border-radius: 3px;
        }

        .icon-couch-arm-left { left: 0; }
        .icon-couch-arm-right { right: 0; }

        /* Zen - Candle */
        .icon-candle-glow {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background: radial-gradient(circle, rgba(255, 180, 80, 0.3) 0%, transparent 70%);
        }

        .icon-candle-body {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 14px;
          height: 26px;
          background: linear-gradient(180deg, #faf8f5 0%, #e8e0d4 100%);
          border-radius: 2px;
        }

        .icon-candle-flame {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 14px;
          background: radial-gradient(ellipse at bottom, 
            rgba(255, 200, 100, 0.95) 0%, 
            rgba(255, 150, 50, 0.6) 50%, 
            transparent 100%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          animation: iconFlicker 0.5s ease-in-out infinite alternate;
        }

        @keyframes iconFlicker {
          0% { transform: translateX(-50%) scaleY(1) rotate(-2deg); }
          100% { transform: translateX(-50%) scaleY(1.1) rotate(2deg); }
        }

        /* Library - Books */
        .icon-book {
          position: absolute;
          bottom: 8px;
          border-radius: 2px 2px 0 0;
        }

        .icon-book-1 { left: 8px; width: 8px; height: 26px; background: #8b4513; }
        .icon-book-2 { left: 18px; width: 10px; height: 30px; background: #2f4f4f; }
        .icon-book-3 { left: 30px; width: 8px; height: 24px; background: #8b0000; }

        /* Bedroom - Moon */
        .icon-moon {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #f0f0ff 0%, #c0c0d8 100%);
          box-shadow: 0 0 12px rgba(200, 210, 255, 0.5);
        }

        .icon-star {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
        }

        .icon-star-1 { top: 4px; left: 6px; width: 3px; height: 3px; }
        .icon-star-2 { top: 12px; right: 4px; }
        .icon-star-3 { bottom: 10px; left: 10px; width: 3px; height: 3px; }

        /* Studio - Easel */
        .icon-easel-leg {
          position: absolute;
          bottom: 4px;
          width: 4px;
          height: 28px;
          background: ${isDark ? 'rgba(180, 160, 140, 0.8)' : '#8b7355'};
        }

        .icon-easel-leg-left { left: 10px; transform: rotate(-8deg); }
        .icon-easel-leg-right { right: 10px; transform: rotate(8deg); }

        .icon-easel-canvas {
          position: absolute;
          top: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 26px;
          height: 20px;
          background: ${isDark ? 'rgba(250, 248, 245, 0.9)' : '#faf8f5'};
          border: 2px solid ${isDark ? 'rgba(180, 160, 140, 0.8)' : '#c4a484'};
        }

        /* Journal - Notebook */
        .icon-notebook {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 26px;
          height: 30px;
          background: ${isDark ? 'rgba(100, 80, 60, 0.9)' : '#6b4423'};
          border-radius: 2px 4px 4px 2px;
        }

        .icon-notebook-binding {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: ${isDark ? 'rgba(80, 60, 40, 1)' : '#4a3520'};
          border-radius: 2px 0 0 2px;
        }

        .icon-notebook-line {
          position: absolute;
          left: 7px;
          right: 3px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
        }

        .icon-notebook-line-1 { top: 10px; }
        .icon-notebook-line-2 { top: 16px; }
        .icon-notebook-line-3 { top: 22px; }

        .room-name {
          font-size: 0.95rem;
          font-weight: 500;
          color: ${isDark ? '#ffffff' : '#2d2d2d'};
          margin-bottom: 4px;
        }

        .room-description {
          font-size: 0.75rem;
          color: ${isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(45, 45, 45, 0.5)'};
        }

        /* Trust Line */
        .trust-line {
          font-size: 0.8rem;
          color: ${isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(45, 45, 45, 0.4)'};
          display: flex;
          align-items: center;
          gap: 8px;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 18px;
          justify-content: center;
          padding: 0 18px;
          z-index: 15;
        }

        .lock-icon {
          width: 14px;
          height: 14px;
          position: relative;
        }

        .lock-shackle {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 6px;
          border: 2px solid ${isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(45, 45, 45, 0.4)'};
          border-bottom: none;
          border-radius: 4px 4px 0 0;
        }

        .lock-body {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 8px;
          background: ${isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(45, 45, 45, 0.4)'};
          border-radius: 2px;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 20px 16px 76px;
          }

          .orb-section {
            min-height: 26vh;
            padding-top: 4vh;
          }

          .content-section {
            min-height: auto;
            gap: 22px;
          }

          .rooms-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .room-card {
            padding: 30px 20px;
            min-height: 160px;
          }

          .quick-start {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            max-width: 300px;
          }

          .room-bg { opacity: ${isDark ? 0.35 : 0.45}; }

          .sofa-container,
          .coffee-table,
          .side-table,
          .floor-plant {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .content-wrapper {
            padding: 18px 14px 72px;
          }

          .orb-section {
            min-height: 28vh;
            padding-top: 5vh;
          }

          .rooms-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .room-card {
            padding: 28px 18px;
            min-height: 160px;
          }

          .quick-start {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="sanctuary-container">
        {/* Light Layers */}
        <div className="light-layer sunlight intro-bg" />
        <div className="light-layer ambient-glow intro-bg" />

        <div className="vignette intro-bg" />

        {/* Light Beams */}
        <div className="light-beams intro-bg">
          <div className="beam beam-1" />
          <div className="beam beam-2" />
          <div className="beam beam-3" />
          <div className="beam beam-4" />
          <div className="beam beam-5" />
        </div>

        {/* Dust Particles */}
        <div className="dust-container intro-bg">
          {dustParticles.map((p) => (
            <div
              key={`dust-${p.id}`}
              className="dust"
              style={{
                left: `${p.x}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        {particles.map((p) => (
          <div
            key={`particle-${p.id}`}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Room Background */}
        <div className="room-bg intro-bg">
          {/* Wall */}
          <div className="wall-back" />

          {/* Window */}
          <div className="window-container">
            <div className="window">
              <div className="window-frame-v" />
              <div className="window-frame-h" />
              <div className="moon-window" />
            </div>
            <div className="window-sill" />
          </div>

          {/* Floor */}
          <div className="floor">
            <div className="floor-texture" />
          </div>

          {/* Rug */}
          <div className="rug" />

          {/* Sofa */}
          <div className="sofa-container">
            <div className="sofa">
              <div className="sofa-back" />
              <div className="sofa-cushion cushion-1" />
              <div className="sofa-cushion cushion-2" />
              <div className="sofa-cushion cushion-3" />
              <div className="sofa-seat" />
              <div className="sofa-arm arm-left" />
              <div className="sofa-arm arm-right" />
              <div className="sofa-legs leg-1" />
              <div className="sofa-legs leg-2" />
              <div className="sofa-legs leg-3" />
              <div className="sofa-legs leg-4" />
              <div className="throw-pillow pillow-sage" />
              <div className="throw-pillow pillow-terracotta" />
            </div>
          </div>

          {/* Coffee Table */}
          <div className="coffee-table">
            <div className="table-items">
              <div className="vase">
                <div className="vase-flowers">
                  <div className="flower-stem flower-stem-1" />
                  <div className="flower-stem flower-stem-2" />
                  <div className="flower-stem flower-stem-3" />
                </div>
              </div>
              <div className="book-stack">
                <div className="book book-1" />
                <div className="book book-2" />
                <div className="book book-3" />
              </div>
              <div className="candle">
                <div className="candle-glow" />
                <div className="candle-flame" />
              </div>
            </div>
            <div className="table-top" />
            <div className="table-legs">
              <div className="table-leg" />
              <div className="table-leg" />
            </div>
          </div>

          {/* Side Table & Lamp */}
          <div className="side-table">
            <div className="lamp">
              <div className="lamp-shade" />
              <div className="lamp-base" />
              <div className="lamp-foot" />
            </div>
            <div className="side-table-top" />
            <div className="side-table-leg" />
          </div>

          {/* Floor Plant */}
          <div className="floor-plant">
            <div className="plant-leaves-container">
              <div className="plant-leaf leaf-1" />
              <div className="plant-leaf leaf-2" />
              <div className="plant-leaf leaf-3" />
              <div className="plant-leaf leaf-4" />
              <div className="plant-leaf leaf-5" />
            </div>
            <div className="large-pot" />
          </div>
        </div>

        {/* Time Indicator */}
        <div className="time-indicator">
          <div className={`time-icon time-icon-${timeOfDay}`} />
          <span>
            {timeOfDay === 'morning' && 'Morning'}
            {timeOfDay === 'afternoon' && 'Afternoon'}
            {timeOfDay === 'evening' && 'Evening'}
            {timeOfDay === 'night' && 'Night'}
          </span>
        </div>

        {/* Content */}
        <div className="content-wrapper">
          <div className="orb-section">
            {/* VERA Orb */}
            <div className="orb-container intro-orb">
              <div className="orb-ring" />
              <div className="vera-orb" onClick={handleTalkToVera} />
            </div>
          </div>

          <div className="content-section">
            {/* Greeting */}
            <h1 className="greeting intro-greeting">
              {getGreeting()}{userName ? `, ${userName}` : ''}
            </h1>
            <div className="subtitle intro-greeting">Where would you like to go?</div>

            {/* Quick Actions */}
            <div className="quick-start intro-quick">
              <button className="quick-btn quick-btn-primary" onClick={handleTalkToVera}>
                Talk to VERA
              </button>
              <button className="quick-btn" onClick={() => onRoomSelect('zen')}>
                I need to breathe
              </button>
            </div>

            {/* Rooms Grid */}
            <div className="rooms-grid intro-grid">
              {ROOMS.map((room) => (
                <div
                  key={room.id}
                  className={`room-card ${hoveredRoom === room.id ? 'highlighted' : ''}`}
                  onClick={() => onRoomSelect(room.id)}
                  onMouseEnter={() => setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                >
                  <div className="room-icon">
                    {room.id === 'therapy' && (
                      <>
                        <div className="icon-couch-back" />
                        <div className="icon-couch-seat" />
                        <div className="icon-couch-arm icon-couch-arm-left" />
                        <div className="icon-couch-arm icon-couch-arm-right" />
                      </>
                    )}
                    {room.id === 'zen' && (
                      <>
                        <div className="icon-candle-glow" />
                        <div className="icon-candle-body" />
                        <div className="icon-candle-flame" />
                      </>
                    )}
                    {room.id === 'library' && (
                      <>
                        <div className="icon-book icon-book-1" />
                        <div className="icon-book icon-book-2" />
                        <div className="icon-book icon-book-3" />
                      </>
                    )}
                    {room.id === 'bedroom' && (
                      <>
                        <div className="icon-moon" />
                        <div className="icon-star icon-star-1" />
                        <div className="icon-star icon-star-2" />
                        <div className="icon-star icon-star-3" />
                      </>
                    )}
                    {room.id === 'studio' && (
                      <>
                        <div className="icon-easel-leg icon-easel-leg-left" />
                        <div className="icon-easel-leg icon-easel-leg-right" />
                        <div className="icon-easel-canvas" />
                      </>
                    )}
                    {room.id === 'journal' && (
                      <div className="icon-notebook">
                        <div className="icon-notebook-binding" />
                        <div className="icon-notebook-line icon-notebook-line-1" />
                        <div className="icon-notebook-line icon-notebook-line-2" />
                        <div className="icon-notebook-line icon-notebook-line-3" />
                      </div>
                    )}
                  </div>
                  <div className="room-name">{room.name}</div>
                  <div className="room-description">{room.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Line */}
        <div className="trust-line">
          <div className="lock-icon">
            <div className="lock-shackle" />
            <div className="lock-body" />
          </div>
          Your sanctuary is private and secure
        </div>
      </div>
    </>
  );
}