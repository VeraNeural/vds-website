'use client';

import { useState, useEffect } from 'react';

interface LibraryRoomProps {
  onBack: () => void;
  onStartStory?: (storyId: string) => void;
  onStartLesson?: (lessonId: string) => void;
}

type ContentItem = {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'story' | 'lesson';
};

const STORIES: ContentItem[] = [
  { id: 'calm-forest', title: 'The Calm Forest', description: 'A gentle walk through peaceful woods', duration: '5 min', type: 'story' },
  { id: 'ocean-breath', title: 'Ocean Breath', description: 'Waves that match your breathing', duration: '7 min', type: 'story' },
  { id: 'mountain-stillness', title: 'Mountain Stillness', description: 'Finding peace in ancient stone', duration: '6 min', type: 'story' },
  { id: 'starlight-journey', title: 'Starlight Journey', description: 'Floating through the cosmos', duration: '8 min', type: 'story' },
];

const LESSONS: ContentItem[] = [
  { id: 'nervous-system-101', title: 'Your Nervous System', description: 'Understanding fight, flight, freeze', duration: '10 min', type: 'lesson' },
  { id: 'polyvagal-basics', title: 'Polyvagal Basics', description: 'The science of safety', duration: '12 min', type: 'lesson' },
  { id: 'window-tolerance', title: 'Window of Tolerance', description: 'Finding your regulation zone', duration: '8 min', type: 'lesson' },
  { id: 'somatic-awareness', title: 'Body Awareness', description: 'Listening to your body', duration: '10 min', type: 'lesson' },
];

export default function LibraryRoom({ onBack, onStartStory, onStartLesson }: LibraryRoomProps) {
  const [activeTab, setActiveTab] = useState<'stories' | 'learn'>('stories');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [embers, setEmbers] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate embers
    const newEmbers = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 15,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    }));
    setEmbers(newEmbers);

    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleItemClick = (item: ContentItem) => {
    if (item.type === 'story' && onStartStory) {
      onStartStory(item.id);
    } else if (item.type === 'lesson' && onStartLesson) {
      onStartLesson(item.id);
    }
  };

  return (
    <>
      <style jsx>{`
        .library-room {
          min-height: 100vh;
          min-height: 100dvh;
          background: linear-gradient(180deg, #12100e 0%, #1a1612 30%, #211c16 60%, #1a1612 100%);
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

        .warm-glow {
          background: 
            radial-gradient(ellipse 50% 60% at 12% 85%, rgba(255, 140, 50, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 40% 50% at 15% 90%, rgba(255, 100, 30, 0.15) 0%, transparent 40%),
            radial-gradient(ellipse 30% 30% at 10% 80%, rgba(255, 80, 20, 0.1) 0%, transparent 35%);
          animation: fireGlow 3s ease-in-out infinite;
        }

        @keyframes fireGlow {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }

        .ceiling-shadow {
          background: linear-gradient(180deg, 
            rgba(0, 0, 0, 0.4) 0%,
            transparent 15%);
        }

        /* Floor */
        .floor {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 35%;
          background: linear-gradient(180deg,
            rgba(35, 28, 20, 0.9) 0%,
            rgba(30, 24, 18, 0.95) 50%,
            rgba(25, 20, 15, 1) 100%);
          transform: perspective(800px) rotateX(50deg);
          transform-origin: bottom center;
        }

        .floor-boards {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: repeating-linear-gradient(90deg,
            transparent 0px,
            transparent 80px,
            rgba(0, 0, 0, 0.1) 80px,
            rgba(0, 0, 0, 0.1) 82px);
        }

        /* Rug */
        .rug {
          position: absolute;
          bottom: 5%;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 25%;
          background: radial-gradient(ellipse at center,
            rgba(120, 60, 40, 0.3) 0%,
            rgba(100, 50, 35, 0.2) 40%,
            rgba(80, 40, 30, 0.1) 70%,
            transparent 100%);
          border-radius: 50%;
        }

        .rug-pattern {
          position: absolute;
          top: 20%;
          left: 15%;
          right: 15%;
          bottom: 20%;
          border: 1px solid rgba(150, 80, 50, 0.2);
          border-radius: 50%;
        }

        .rug-inner {
          position: absolute;
          top: 35%;
          left: 30%;
          right: 30%;
          bottom: 35%;
          border: 1px solid rgba(150, 80, 50, 0.15);
          border-radius: 50%;
        }

        /* Bookshelves */
        .bookshelf {
          position: absolute;
          background: linear-gradient(180deg,
            rgba(60, 45, 30, 0.95) 0%,
            rgba(50, 38, 25, 0.9) 50%,
            rgba(45, 32, 20, 0.85) 100%);
          box-shadow: 
            inset 0 3px 15px rgba(0, 0, 0, 0.4),
            5px 0 20px rgba(0, 0, 0, 0.3);
        }

        .bookshelf-left {
          left: 0;
          top: 5%;
          width: 10%;
          height: 70%;
          border-radius: 0 6px 6px 0;
        }

        .bookshelf-right {
          right: 0;
          top: 8%;
          width: 8%;
          height: 60%;
          border-radius: 6px 0 0 6px;
          box-shadow: 
            inset 0 3px 15px rgba(0, 0, 0, 0.4),
            -5px 0 20px rgba(0, 0, 0, 0.3);
        }

        .shelf {
          position: absolute;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(180deg,
            rgba(80, 60, 40, 1) 0%,
            rgba(60, 45, 30, 1) 100%);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
        }

        .books-row {
          position: absolute;
          bottom: 5px;
          left: 5px;
          right: 5px;
          display: flex;
          align-items: flex-end;
          gap: 2px;
        }

        .book {
          border-radius: 1px 1px 0 0;
          box-shadow: inset -2px 0 4px rgba(0, 0, 0, 0.2);
        }

        /* Window */
        .window-container {
          position: absolute;
          top: 8%;
          right: 18%;
          width: 18%;
          height: 40%;
        }

        .window {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg,
            rgba(15, 20, 35, 0.95) 0%,
            rgba(20, 30, 50, 0.9) 50%,
            rgba(15, 25, 40, 0.95) 100%);
          border: 5px solid rgba(60, 45, 30, 0.9);
          border-radius: 4px 4px 0 0;
          position: relative;
          box-shadow:
            inset 0 0 40px rgba(80, 100, 150, 0.1),
            0 8px 30px rgba(0, 0, 0, 0.4);
        }

        .window-frame-v {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 100%;
          background: rgba(60, 45, 30, 0.9);
        }

        .window-frame-h {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 5px;
          background: rgba(60, 45, 30, 0.9);
        }

        .window-sill {
          position: absolute;
          bottom: -12px;
          left: -8px;
          right: -8px;
          height: 12px;
          background: linear-gradient(180deg,
            rgba(70, 55, 35, 1) 0%,
            rgba(55, 42, 28, 1) 100%);
          border-radius: 0 0 4px 4px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .moon {
          position: absolute;
          top: 18%;
          right: 22%;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%,
            rgba(240, 240, 255, 0.95) 0%,
            rgba(200, 205, 220, 0.9) 50%,
            rgba(180, 185, 200, 0.85) 100%);
          box-shadow: 0 0 25px rgba(200, 210, 255, 0.4);
        }

        /* Fireplace */
        .fireplace-container {
          position: absolute;
          bottom: 12%;
          left: 5%;
          width: 150px;
          height: 140px;
        }

        .fireplace {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 110px;
          background: linear-gradient(180deg,
            rgba(50, 38, 25, 1) 0%,
            rgba(40, 30, 20, 1) 50%,
            rgba(35, 26, 18, 1) 100%);
          border-radius: 8px 8px 0 0;
          box-shadow:
            inset 0 -15px 30px rgba(0, 0, 0, 0.5),
            0 5px 25px rgba(0, 0, 0, 0.4);
        }

        .fireplace-mantle {
          position: absolute;
          top: -12px;
          left: -15px;
          right: -15px;
          height: 15px;
          background: linear-gradient(180deg,
            rgba(70, 55, 35, 1) 0%,
            rgba(55, 42, 28, 1) 100%);
          border-radius: 4px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .fireplace-opening {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 75px;
          background: radial-gradient(ellipse at bottom,
            rgba(20, 15, 10, 1) 0%,
            rgba(10, 8, 5, 1) 60%,
            rgba(5, 4, 3, 1) 100%);
          border-radius: 45% 45% 0 0;
          overflow: hidden;
          box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.8);
        }

        /* Fire */
        .fire-container {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 60px;
        }

        .log {
          position: absolute;
          bottom: 0;
          height: 12px;
          background: linear-gradient(90deg,
            rgba(60, 40, 25, 1) 0%,
            rgba(50, 35, 22, 1) 50%,
            rgba(45, 30, 20, 1) 100%);
          border-radius: 6px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        }

        .log-1 {
          left: 5px;
          width: 60px;
          transform: rotate(-8deg);
        }

        .log-2 {
          right: 5px;
          width: 55px;
          transform: rotate(10deg);
        }

        .log-3 {
          left: 15px;
          bottom: 8px;
          width: 50px;
          height: 10px;
          transform: rotate(2deg);
        }

        .flame {
          position: absolute;
          bottom: 15px;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          animation: flameFlicker 0.4s ease-in-out infinite alternate;
        }

        .flame-main {
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 50px;
          background: radial-gradient(ellipse at bottom,
            rgba(255, 255, 220, 1) 0%,
            rgba(255, 220, 120, 0.95) 15%,
            rgba(255, 180, 80, 0.85) 30%,
            rgba(255, 130, 50, 0.7) 50%,
            rgba(255, 80, 20, 0.4) 70%,
            transparent 100%);
          filter: blur(1px);
        }

        .flame-left {
          left: 25%;
          width: 20px;
          height: 38px;
          background: radial-gradient(ellipse at bottom,
            rgba(255, 230, 150, 0.95) 0%,
            rgba(255, 170, 70, 0.8) 40%,
            rgba(255, 100, 30, 0.4) 70%,
            transparent 100%);
          animation-delay: 0.15s;
        }

        .flame-right {
          right: 25%;
          width: 22px;
          height: 42px;
          background: radial-gradient(ellipse at bottom,
            rgba(255, 240, 170, 0.95) 0%,
            rgba(255, 180, 80, 0.8) 40%,
            rgba(255, 110, 40, 0.4) 70%,
            transparent 100%);
          animation-delay: 0.3s;
        }

        .flame-small-1 {
          left: 15%;
          width: 12px;
          height: 25px;
          background: radial-gradient(ellipse at bottom,
            rgba(255, 200, 100, 0.9) 0%,
            rgba(255, 140, 50, 0.5) 60%,
            transparent 100%);
          animation-delay: 0.1s;
        }

        .flame-small-2 {
          right: 15%;
          width: 14px;
          height: 28px;
          background: radial-gradient(ellipse at bottom,
            rgba(255, 210, 110, 0.9) 0%,
            rgba(255, 150, 60, 0.5) 60%,
            transparent 100%);
          animation-delay: 0.25s;
        }

        @keyframes flameFlicker {
          0% { 
            transform: translateX(-50%) scaleY(1) scaleX(1) rotate(-1deg);
            opacity: 1;
          }
          100% { 
            transform: translateX(-50%) scaleY(1.06) scaleX(0.97) rotate(1deg);
            opacity: 0.95;
          }
        }

        .flame-left, .flame-right, .flame-small-1, .flame-small-2 {
          transform: translateX(-50%);
        }

        .fire-glow {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 120px;
          background: radial-gradient(ellipse,
            rgba(255, 150, 50, 0.3) 0%,
            rgba(255, 120, 30, 0.2) 30%,
            rgba(255, 100, 20, 0.1) 50%,
            transparent 70%);
          animation: glowPulse 2s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.8; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.08); }
        }

        /* Embers */
        .ember {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 150, 50, 0.9);
          box-shadow: 0 0 6px rgba(255, 150, 50, 0.6);
          animation: emberFloat linear infinite;
        }

        @keyframes emberFloat {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-80px) scale(0.3);
            opacity: 0;
          }
        }

        /* Reading Chair */
        .chair-container {
          position: absolute;
          bottom: 14%;
          right: 25%;
          width: 110px;
          height: 120px;
        }

        .chair-back {
          position: absolute;
          bottom: 45px;
          left: 10px;
          width: 90px;
          height: 75px;
          background: linear-gradient(135deg,
            rgba(100, 70, 45, 0.95) 0%,
            rgba(85, 60, 40, 0.9) 50%,
            rgba(75, 52, 35, 0.85) 100%);
          border-radius: 12px 12px 0 0;
          box-shadow:
            inset 0 8px 20px rgba(130, 100, 70, 0.3),
            inset 0 -5px 15px rgba(0, 0, 0, 0.2),
            0 -3px 15px rgba(0, 0, 0, 0.2);
        }

        .chair-back-cushion {
          position: absolute;
          top: 10px;
          left: 10%;
          right: 10%;
          height: 50%;
          background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.08) 0%,
            transparent 100%);
          border-radius: 8px 8px 0 0;
        }

        .chair-seat {
          position: absolute;
          bottom: 30px;
          left: 5px;
          width: 100px;
          height: 25px;
          background: linear-gradient(180deg,
            rgba(110, 80, 55, 1) 0%,
            rgba(95, 68, 45, 1) 100%);
          border-radius: 8px;
          box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.25),
            inset 0 3px 10px rgba(150, 120, 90, 0.2);
        }

        .chair-arm {
          position: absolute;
          bottom: 35px;
          width: 18px;
          height: 55px;
          background: linear-gradient(180deg,
            rgba(95, 68, 45, 1) 0%,
            rgba(80, 55, 38, 1) 100%);
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .chair-arm-left { left: 0; }
        .chair-arm-right { right: 0; }

        .chair-leg {
          position: absolute;
          bottom: 0;
          width: 8px;
          height: 30px;
          background: linear-gradient(180deg,
            rgba(70, 50, 35, 1) 0%,
            rgba(55, 40, 28, 1) 100%);
          border-radius: 3px;
        }

        .chair-leg-1 { left: 12px; }
        .chair-leg-2 { right: 12px; }

        /* Side Table */
        .side-table {
          position: absolute;
          bottom: 14%;
          right: 15%;
        }

        .table-top {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg,
            rgba(80, 60, 40, 1) 0%,
            rgba(65, 48, 32, 1) 100%);
          border-radius: 50%;
          box-shadow:
            0 5px 20px rgba(0, 0, 0, 0.3),
            inset 0 2px 8px rgba(120, 100, 80, 0.15);
        }

        .table-leg {
          width: 8px;
          height: 40px;
          background: linear-gradient(180deg,
            rgba(65, 48, 32, 1) 0%,
            rgba(50, 38, 25, 1) 100%);
          margin: 0 auto;
          border-radius: 2px;
        }

        .table-base {
          width: 30px;
          height: 6px;
          background: linear-gradient(180deg,
            rgba(55, 42, 28, 1) 0%,
            rgba(45, 35, 24, 1) 100%);
          margin: 0 auto;
          border-radius: 3px;
        }

        /* Book on table */
        .table-book {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%) rotate(-5deg);
          width: 30px;
          height: 22px;
          background: linear-gradient(135deg,
            rgba(140, 60, 50, 1) 0%,
            rgba(120, 50, 40, 1) 100%);
          border-radius: 2px 3px 3px 2px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .book-spine {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: rgba(100, 40, 30, 1);
          border-radius: 2px 0 0 2px;
        }

        /* Lamp */
        .table-lamp {
          position: absolute;
          top: -55px;
          left: 50%;
          transform: translateX(-50%);
        }

        .lamp-shade {
          width: 32px;
          height: 25px;
          background: linear-gradient(180deg,
            rgba(255, 250, 240, 0.95) 0%,
            rgba(245, 238, 225, 0.9) 100%);
          border-radius: 4px 4px 12px 12px;
          box-shadow:
            0 4px 15px rgba(0, 0, 0, 0.15),
            inset 0 -15px 25px rgba(255, 200, 120, 0.2);
        }

        .lamp-light {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 50px;
          background: radial-gradient(ellipse,
            rgba(255, 230, 180, 0.15) 0%,
            rgba(255, 200, 120, 0.08) 50%,
            transparent 70%);
        }

        .lamp-stem {
          width: 5px;
          height: 18px;
          background: linear-gradient(180deg,
            rgba(150, 120, 90, 1) 0%,
            rgba(130, 100, 70, 1) 100%);
          margin: 0 auto;
        }

        .lamp-base {
          width: 18px;
          height: 5px;
          background: linear-gradient(180deg,
            rgba(130, 100, 70, 1) 0%,
            rgba(110, 80, 55, 1) 100%);
          margin: 0 auto;
          border-radius: 2px;
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
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: calc(env(safe-area-inset-top, 0px) + 80px) 20px 40px;
          opacity: ${isLoaded ? 1 : 0};
          transform: translateY(${isLoaded ? '0' : '20px'});
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .header {
          text-align: center;
          margin-bottom: 36px;
        }

        .title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.2rem;
          font-weight: 300;
          color: #f5e6d3;
          margin-bottom: 10px;
          letter-spacing: 0.02em;
        }

        .subtitle {
          font-size: 1rem;
          color: rgba(245, 230, 211, 0.6);
        }

        /* Tabs */
        .tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 36px;
        }

        .tab {
          padding: 14px 32px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab:hover {
          border-color: rgba(255, 180, 100, 0.4);
          color: rgba(255, 255, 255, 0.9);
        }

        .tab.active {
          background: rgba(255, 180, 100, 0.15);
          border-color: rgba(255, 180, 100, 0.5);
          color: #f5e6d3;
          box-shadow: 0 0 20px rgba(255, 150, 50, 0.1);
        }

        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 18px;
          max-width: 750px;
          width: 100%;
        }

        .content-card {
          background: rgba(50, 38, 28, 0.5);
          border: 1px solid rgba(255, 200, 150, 0.1);
          border-radius: 18px;
          padding: 26px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .content-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 180, 100, 0.4);
          background: rgba(70, 52, 38, 0.6);
          box-shadow: 0 12px 45px rgba(255, 150, 50, 0.12);
        }

        .card-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.25rem;
          font-weight: 400;
          color: #f5e6d3;
          margin-bottom: 10px;
        }

        .card-description {
          font-size: 0.95rem;
          color: rgba(245, 230, 211, 0.6);
          margin-bottom: 14px;
          line-height: 1.55;
        }

        .card-duration {
          font-size: 0.85rem;
          color: rgba(255, 180, 100, 0.8);
          letter-spacing: 0.03em;
        }

        /* VERA Orb */
        .vera-presence {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 50;
        }

        .vera-orb {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%,
            rgba(200, 180, 240, 0.9) 0%,
            rgba(150, 130, 200, 0.75) 50%,
            rgba(120, 100, 180, 0.6) 100%);
          box-shadow: 0 0 35px rgba(139, 119, 183, 0.4);
          animation: orbBreathe 5s ease-in-out infinite;
          cursor: pointer;
        }

        @keyframes orbBreathe {
          0%, 100% { transform: scale(1); box-shadow: 0 0 35px rgba(139, 119, 183, 0.4); }
          50% { transform: scale(1.06); box-shadow: 0 0 50px rgba(139, 119, 183, 0.5); }
        }

        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .bookshelf-left,
          .bookshelf-right,
          .chair-container,
          .side-table {
            opacity: 0.3;
          }

          .window-container {
            width: 25%;
            right: 10%;
          }

          .fireplace-container {
            width: 120px;
            left: 3%;
          }
        }
      `}</style>

      <div className="library-room">
        {/* Ambient Layers */}
        <div className="ambient-layer warm-glow" />
        <div className="ambient-layer ceiling-shadow" />

        {/* Floor */}
        <div className="floor">
          <div className="floor-boards" />
        </div>

        {/* Rug */}
        <div className="rug">
          <div className="rug-pattern" />
          <div className="rug-inner" />
        </div>

        {/* Bookshelves */}
        <div className="bookshelf bookshelf-left">
          <div className="shelf" style={{ top: '15%' }}>
            <div className="books-row">
              <div className="book" style={{ width: '10px', height: '30px', background: '#8b4513' }} />
              <div className="book" style={{ width: '12px', height: '35px', background: '#2f4f4f' }} />
              <div className="book" style={{ width: '8px', height: '28px', background: '#800020' }} />
              <div className="book" style={{ width: '10px', height: '32px', background: '#4a4a2f' }} />
              <div className="book" style={{ width: '9px', height: '26px', background: '#654321' }} />
            </div>
          </div>
          <div className="shelf" style={{ top: '38%' }}>
            <div className="books-row">
              <div className="book" style={{ width: '11px', height: '32px', background: '#483d8b' }} />
              <div className="book" style={{ width: '9px', height: '28px', background: '#6b4423' }} />
              <div className="book" style={{ width: '12px', height: '35px', background: '#3d3d3d' }} />
              <div className="book" style={{ width: '8px', height: '25px', background: '#8b0000' }} />
            </div>
          </div>
          <div className="shelf" style={{ top: '61%' }}>
            <div className="books-row">
              <div className="book" style={{ width: '10px', height: '30px', background: '#5c4033' }} />
              <div className="book" style={{ width: '12px', height: '34px', background: '#704214' }} />
              <div className="book" style={{ width: '9px', height: '27px', background: '#4a3728' }} />
              <div className="book" style={{ width: '11px', height: '31px', background: '#2f4f4f' }} />
            </div>
          </div>
          <div className="shelf" style={{ top: '84%' }}>
            <div className="books-row">
              <div className="book" style={{ width: '10px', height: '29px', background: '#654321' }} />
              <div className="book" style={{ width: '8px', height: '25px', background: '#800020' }} />
              <div className="book" style={{ width: '11px', height: '33px', background: '#3d3d3d' }} />
            </div>
          </div>
        </div>

        <div className="bookshelf bookshelf-right">
          <div className="shelf" style={{ top: '20%' }}>
            <div className="books-row">
              <div className="book" style={{ width: '9px', height: '28px', background: '#704214' }} />
              <div className="book" style={{ width: '11px', height: '32px', background: '#2f4f4f' }} />
              <div className="book" style={{ width: '8px', height: '25px', background: '#483d8b' }} />
            </div>
          </div>
          <div className="shelf" style={{ top: '48%' }}>
            <div className="books-row">
              <div className="book" style={{ width: '10px', height: '30px', background: '#5c4033' }} />
              <div className="book" style={{ width: '9px', height: '27px', background: '#8b4513' }} />
              <div className="book" style={{ width: '11px', height: '33px', background: '#654321' }} />
            </div>
          </div>
          <div className="shelf" style={{ top: '76%' }}>
            <div className="books-row">
              <div className="book" style={{ width: '8px', height: '26px', background: '#800020' }} />
              <div className="book" style={{ width: '10px', height: '30px', background: '#4a4a2f' }} />
            </div>
          </div>
        </div>

        {/* Window */}
        <div className="window-container">
          <div className="window">
            <div className="window-frame-v" />
            <div className="window-frame-h" />
            <div className="moon" />
          </div>
          <div className="window-sill" />
        </div>

        {/* Fireplace */}
        <div className="fireplace-container">
          <div className="fire-glow" />
          <div className="fireplace">
            <div className="fireplace-mantle" />
            <div className="fireplace-opening">
              <div className="fire-container">
                <div className="log log-1" />
                <div className="log log-2" />
                <div className="log log-3" />
                <div className="flame flame-main" />
                <div className="flame flame-left" />
                <div className="flame flame-right" />
                <div className="flame flame-small-1" />
                <div className="flame flame-small-2" />
              </div>
            </div>
          </div>

          {/* Embers */}
          {embers.map((ember) => (
            <div
              key={ember.id}
              className="ember"
              style={{
                left: `${ember.x}%`,
                bottom: '35%',
                animationDuration: `${ember.duration}s`,
                animationDelay: `${ember.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Reading Chair */}
        <div className="chair-container">
          <div className="chair-back">
            <div className="chair-back-cushion" />
          </div>
          <div className="chair-seat" />
          <div className="chair-arm chair-arm-left" />
          <div className="chair-arm chair-arm-right" />
          <div className="chair-leg chair-leg-1" />
          <div className="chair-leg chair-leg-2" />
        </div>

        {/* Side Table with Lamp */}
        <div className="side-table">
          <div className="table-lamp">
            <div className="lamp-shade" />
            <div className="lamp-light" />
            <div className="lamp-stem" />
            <div className="lamp-base" />
          </div>
          <div className="table-book">
            <div className="book-spine" />
          </div>
          <div className="table-top" />
          <div className="table-leg" />
          <div className="table-base" />
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={onBack}>
          <span>←</span>
          <span>Back</span>
        </button>

        {/* Content */}
        <div className="content">
          <div className="header">
            <h1 className="title">The Library</h1>
            <div className="subtitle">Stories to calm, lessons to grow</div>
          </div>

          <div className="tabs">
            <button
              className={`tab ${activeTab === 'stories' ? 'active' : ''}`}
              onClick={() => setActiveTab('stories')}
            >
              Stories
            </button>
            <button
              className={`tab ${activeTab === 'learn' ? 'active' : ''}`}
              onClick={() => setActiveTab('learn')}
            >
              Learn
            </button>
          </div>

          <div className="content-grid">
            {(activeTab === 'stories' ? STORIES : LESSONS).map((item) => (
              <div
                key={item.id}
                className="content-card"
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
                <span className="card-duration">{item.duration}</span>
              </div>
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