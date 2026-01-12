'use client';

import { useState, useEffect } from 'react';

interface StudioRoomProps {
  onBack: () => void;
  onLaunchVDS?: () => void;
  onOpenProject?: (projectId: string) => void;
  onSelectTemplate?: (templateId: string) => void;
  savedProjects?: Array<{
    id: string;
    name: string;
    thumbnail?: string;
    lastEdited: string;
  }>;
}

const TEMPLATE_CATEGORIES = [
  { id: 'spaces', title: 'Sanctuary Spaces', description: 'Calming environments to design', count: 6 },
  { id: 'elements', title: 'Healing Elements', description: 'Objects for your sanctuary', count: 4 },
  { id: 'moods', title: 'Mood Palettes', description: 'Color schemes for emotions', count: 5 },
];

const TEMPLATES = {
  spaces: [
    { id: 'blank', name: 'Blank Canvas', description: 'Start from scratch' },
    { id: 'cozy-corner', name: 'Cozy Corner', description: 'Warm, intimate space' },
    { id: 'zen-garden', name: 'Zen Garden', description: 'Peaceful outdoor retreat' },
    { id: 'cloud-room', name: 'Cloud Room', description: 'Floating among the sky' },
    { id: 'forest-clearing', name: 'Forest Clearing', description: 'Nature sanctuary' },
    { id: 'ocean-view', name: 'Ocean View', description: 'Seaside tranquility' },
  ],
  elements: [
    { id: 'water-features', name: 'Water Features', description: 'Fountains, streams, rain' },
    { id: 'living-plants', name: 'Living Plants', description: 'Greenery and gardens' },
    { id: 'soft-lighting', name: 'Soft Lighting', description: 'Candles, lamps, moonlight' },
    { id: 'comfort-items', name: 'Comfort Items', description: 'Blankets, cushions, rugs' },
  ],
  moods: [
    { id: 'calm-blue', name: 'Calm Waters', description: 'Blues and soft grays' },
    { id: 'warm-earth', name: 'Earth Embrace', description: 'Browns and warm tones' },
    { id: 'forest-green', name: 'Forest Heart', description: 'Greens and natural hues' },
    { id: 'sunset-glow', name: 'Sunset Glow', description: 'Oranges and soft pinks' },
    { id: 'night-sky', name: 'Night Sky', description: 'Deep purples and stars' },
  ],
};

export default function StudioRoom({ onBack, onLaunchVDS, onOpenProject, onSelectTemplate, savedProjects = [] }: StudioRoomProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'projects'>('create');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Floating particles - deterministic
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 5 + (i * 17) % 90,
      y: 60 + (i * 13) % 35,
      size: 3 + (i % 4),
      duration: 18 + (i * 2) % 10,
      delay: (i * 0.8) % 8,
      color: i % 3,
    }))
  );

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleTemplateClick = (templateId: string) => {
    if (onSelectTemplate) {
      onSelectTemplate(templateId);
    } else if (onLaunchVDS) {
      onLaunchVDS();
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const templatesInCategory = selectedCategory ? TEMPLATES[selectedCategory as keyof typeof TEMPLATES] || [] : [];

  return (
    <>
      <style jsx>{`
        .studio-room {
          min-height: 100vh;
          min-height: 100dvh;
          background: linear-gradient(180deg, #1a1625 0%, #231f35 30%, #2a2545 60%, #1e1a30 100%);
          position: relative;
          overflow-x: hidden;
          overflow-y: auto;
        }

        /* ============ AMBIENT LAYERS ============ */
        .ambient-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
        }

        .creative-glow {
          background: 
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 80% 70%, rgba(236, 72, 153, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 60%);
          animation: creativeShift 15s ease-in-out infinite;
        }

        @keyframes creativeShift {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .grid-overlay {
          background-image: 
            linear-gradient(rgba(139, 119, 183, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 119, 183, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        /* ============ ROOM ELEMENTS ============ */
        .room-elements {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: ${isLoaded ? 0.4 : 0};
          transition: opacity 1s ease;
        }

        /* ============ FLOATING PARTICLES ============ */
        .particle {
          position: absolute;
          border-radius: 50%;
          animation: floatParticle linear infinite;
        }

        .particle-purple {
          background: rgba(139, 92, 246, 0.5);
          box-shadow: 0 0 12px rgba(139, 92, 246, 0.3);
        }

        .particle-pink {
          background: rgba(236, 72, 153, 0.4);
          box-shadow: 0 0 12px rgba(236, 72, 153, 0.25);
        }

        .particle-blue {
          background: rgba(99, 102, 241, 0.4);
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.25);
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% { opacity: 0.6; }
          50% {
            transform: translateY(-25vh) translateX(15px) scale(1.1);
            opacity: 0.4;
          }
          90% { opacity: 0.2; }
          100% {
            transform: translateY(-50vh) translateX(-10px) scale(0.7);
            opacity: 0;
          }
        }

        /* ============ FLOOR ============ */
        .floor {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30%;
          background: linear-gradient(180deg,
            rgba(30, 26, 48, 0.85) 0%,
            rgba(25, 22, 40, 0.9) 50%,
            rgba(20, 18, 32, 0.95) 100%);
          transform: perspective(800px) rotateX(50deg);
          transform-origin: bottom center;
        }

        .floor-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(139, 119, 183, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 119, 183, 0.06) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* ============ WINDOW ============ */
        .window-container {
          position: absolute;
          top: 6%;
          right: 8%;
          width: 14%;
          max-width: 140px;
          height: 34%;
        }

        .window {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg,
            rgba(35, 30, 55, 0.8) 0%,
            rgba(45, 40, 68, 0.7) 50%,
            rgba(35, 30, 55, 0.8) 100%);
          border: 4px solid rgba(60, 52, 80, 0.85);
          border-radius: 4px;
          box-shadow:
            inset 0 0 35px rgba(139, 92, 246, 0.06),
            0 0 25px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .window-star {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.8);
          animation: twinkle 4s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }

        .window-frame-v {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 100%;
          background: rgba(60, 52, 80, 0.85);
        }

        .window-frame-h {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 3px;
          background: rgba(60, 52, 80, 0.85);
        }

        /* ============ EASEL ============ */
        .easel-container {
          position: absolute;
          bottom: 12%;
          left: 6%;
          width: 110px;
          height: 150px;
        }

        .easel-leg {
          position: absolute;
          bottom: 0;
          width: 5px;
          height: 110px;
          background: linear-gradient(180deg,
            rgba(120, 100, 80, 0.85) 0%,
            rgba(90, 75, 60, 0.9) 100%);
          border-radius: 2px;
        }

        .easel-leg-left {
          left: 20px;
          transform: rotate(-12deg);
          transform-origin: bottom center;
        }

        .easel-leg-right {
          right: 20px;
          transform: rotate(12deg);
          transform-origin: bottom center;
        }

        .easel-leg-back {
          left: 50%;
          transform: translateX(-50%);
          height: 100px;
        }

        .easel-support {
          position: absolute;
          bottom: 50px;
          left: 18px;
          right: 18px;
          height: 4px;
          background: rgba(110, 90, 70, 0.85);
          border-radius: 2px;
        }

        .easel-tray {
          position: absolute;
          bottom: 46px;
          left: 14px;
          right: 14px;
          height: 6px;
          background: linear-gradient(180deg,
            rgba(110, 90, 70, 0.9) 0%,
            rgba(90, 75, 60, 0.85) 100%);
          border-radius: 2px 2px 0 0;
        }

        .easel-canvas {
          position: absolute;
          bottom: 54px;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: 85px;
          background: linear-gradient(180deg,
            rgba(255, 252, 248, 0.92) 0%,
            rgba(250, 248, 242, 0.88) 100%);
          border: 3px solid rgba(180, 160, 130, 0.7);
          border-radius: 2px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.15);
        }

        .canvas-content {
          position: absolute;
          top: 15%;
          left: 15%;
          right: 15%;
          bottom: 15%;
          background: linear-gradient(135deg,
            rgba(139, 92, 246, 0.12) 0%,
            rgba(236, 72, 153, 0.08) 50%,
            rgba(99, 102, 241, 0.12) 100%);
          border-radius: 3px;
          animation: canvasShimmer 5s ease-in-out infinite;
        }

        @keyframes canvasShimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }

        /* ============ BRUSHES ============ */
        .brushes-container {
          position: absolute;
          bottom: 52px;
          left: 18px;
          display: flex;
          gap: 3px;
        }

        .brush {
          width: 3px;
          border-radius: 1px 1px 3px 3px;
        }

        .brush-1 {
          height: 20px;
          background: linear-gradient(180deg, #8B5CF6 0%, #1e1a30 55%);
          transform: rotate(-5deg);
        }

        .brush-2 {
          height: 22px;
          background: linear-gradient(180deg, #EC4899 0%, #1e1a30 55%);
          transform: rotate(3deg);
        }

        .brush-3 {
          height: 18px;
          background: linear-gradient(180deg, #6366F1 0%, #1e1a30 55%);
          transform: rotate(-2deg);
        }

        /* ============ PALETTE ============ */
        .palette {
          position: absolute;
          bottom: 10%;
          left: 20%;
          width: 55px;
          height: 40px;
          background: linear-gradient(135deg,
            rgba(200, 180, 150, 0.85) 0%,
            rgba(180, 160, 130, 0.8) 100%);
          border-radius: 28px 28px 20px 28px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          transform: rotate(-15deg);
        }

        .palette-hole {
          position: absolute;
          top: 35%;
          left: 15%;
          width: 10px;
          height: 10px;
          background: rgba(30, 26, 48, 0.7);
          border-radius: 50%;
        }

        .paint-blob {
          position: absolute;
          border-radius: 50%;
        }

        .blob-purple { top: 8px; right: 10px; width: 11px; height: 9px; background: rgba(139, 92, 246, 0.8); }
        .blob-pink { top: 20px; right: 6px; width: 9px; height: 8px; background: rgba(236, 72, 153, 0.8); }
        .blob-blue { bottom: 10px; right: 15px; width: 8px; height: 8px; background: rgba(99, 102, 241, 0.8); }
        .blob-teal { bottom: 6px; left: 35%; width: 9px; height: 7px; background: rgba(20, 184, 166, 0.8); }

        /* ============ DESK - ARCHITECTURAL PERSPECTIVE ============ */
        .desk-container {
          position: absolute;
          bottom: 5%;
          right: 3%;
          width: 280px;
          height: 180px;
          transform: perspective(800px) rotateY(-8deg);
          transform-style: preserve-3d;
        }

        /* Desk Surface */
        .desk-surface {
          position: absolute;
          bottom: 85px;
          left: 0;
          width: 100%;
          height: 12px;
          background: linear-gradient(180deg,
            rgba(95, 80, 70, 0.95) 0%,
            rgba(75, 62, 55, 0.98) 50%,
            rgba(65, 52, 45, 0.95) 100%);
          border-radius: 3px;
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.4),
            0 -1px 0 rgba(120, 100, 85, 0.3);
          transform: rotateX(75deg);
          transform-origin: bottom center;
        }

        /* Desk Top Surface (the actual top you see) */
        .desk-top-surface {
          position: absolute;
          bottom: 85px;
          left: 0;
          width: 100%;
          height: 55px;
          background: linear-gradient(180deg,
            rgba(85, 70, 62, 0.92) 0%,
            rgba(75, 60, 52, 0.95) 100%);
          border-radius: 2px;
          transform: perspective(400px) rotateX(70deg);
          transform-origin: bottom center;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.15);
        }

        /* Desk Front Panel */
        .desk-front-panel {
          position: absolute;
          bottom: 12px;
          left: 5px;
          right: 5px;
          height: 72px;
          background: linear-gradient(180deg,
            rgba(70, 58, 50, 0.98) 0%,
            rgba(58, 48, 42, 0.95) 100%);
          border-radius: 2px;
          box-shadow: 
            inset 2px 0 8px rgba(0, 0, 0, 0.2),
            inset -2px 0 8px rgba(0, 0, 0, 0.2),
            0 2px 8px rgba(0, 0, 0, 0.3);
        }

        /* Desk Legs */
        .desk-leg {
          position: absolute;
          bottom: 0;
          width: 8px;
          height: 12px;
          background: linear-gradient(90deg,
            rgba(55, 45, 40, 0.95) 0%,
            rgba(70, 58, 50, 0.98) 50%,
            rgba(55, 45, 40, 0.95) 100%);
          border-radius: 1px;
        }

        .desk-leg-left { left: 15px; }
        .desk-leg-right { right: 15px; }

        /* Drawer Unit (under desk, right side) */
        .drawer-unit {
          position: absolute;
          bottom: 12px;
          right: 15px;
          width: 90px;
          height: 70px;
          background: linear-gradient(180deg,
            rgba(65, 55, 48, 0.98) 0%,
            rgba(55, 45, 40, 0.95) 100%);
          border-radius: 2px;
          box-shadow: 
            inset 1px 0 4px rgba(0, 0, 0, 0.15),
            -2px 0 6px rgba(0, 0, 0, 0.2);
        }

        .drawer {
          position: absolute;
          left: 4px;
          right: 4px;
          height: 20px;
          background: linear-gradient(180deg,
            rgba(75, 62, 55, 0.7) 0%,
            rgba(65, 52, 45, 0.6) 100%);
          border-radius: 2px;
          box-shadow: 
            inset 0 1px 3px rgba(0, 0, 0, 0.2),
            0 1px 0 rgba(100, 85, 75, 0.2);
        }

        .drawer-1 { top: 6px; }
        .drawer-2 { top: 30px; }
        .drawer-3 { bottom: 6px; }

        .drawer-handle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 25px;
          height: 4px;
          background: linear-gradient(180deg,
            rgba(160, 140, 120, 0.8) 0%,
            rgba(130, 110, 95, 0.7) 100%);
          border-radius: 2px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        /* ============ MONITOR - REALISTIC ============ */
        .monitor {
          position: absolute;
          bottom: 100px;
          left: 75px;
        }

        .monitor-frame {
          width: 130px;
          height: 80px;
          background: linear-gradient(180deg,
            rgba(25, 25, 30, 0.99) 0%,
            rgba(35, 35, 42, 0.98) 100%);
          border-radius: 4px;
          padding: 4px;
          box-shadow: 
            0 0 0 2px rgba(45, 45, 55, 0.9),
            0 8px 25px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(139, 92, 246, 0.1);
        }

        .monitor-screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg,
            rgba(15, 12, 25, 1) 0%,
            rgba(20, 18, 32, 1) 100%);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .screen-content {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 30% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            linear-gradient(180deg, rgba(139, 92, 246, 0.08) 0%, rgba(99, 102, 241, 0.05) 100%);
          animation: screenGlow 4s ease-in-out infinite;
        }

        @keyframes screenGlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .screen-reflection {
          position: absolute;
          top: 0;
          left: 0;
          right: 50%;
          bottom: 60%;
          background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.03) 0%,
            transparent 100%);
          border-radius: 2px 0 0 0;
        }

        .monitor-chin {
          width: 130px;
          height: 8px;
          background: linear-gradient(180deg,
            rgba(30, 30, 38, 0.98) 0%,
            rgba(25, 25, 32, 0.99) 100%);
          border-radius: 0 0 4px 4px;
        }

        .monitor-stand-neck {
          width: 18px;
          height: 35px;
          background: linear-gradient(90deg,
            rgba(50, 50, 60, 0.95) 0%,
            rgba(65, 65, 75, 0.98) 50%,
            rgba(50, 50, 60, 0.95) 100%);
          margin: 0 auto;
          border-radius: 2px;
        }

        .monitor-stand-base {
          width: 55px;
          height: 6px;
          background: linear-gradient(180deg,
            rgba(55, 55, 65, 0.98) 0%,
            rgba(45, 45, 55, 0.95) 100%);
          margin: 0 auto;
          border-radius: 3px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        /* ============ KEYBOARD ============ */
        .keyboard {
          position: absolute;
          bottom: 92px;
          left: 85px;
          width: 70px;
          height: 22px;
          background: linear-gradient(180deg,
            rgba(45, 45, 55, 0.95) 0%,
            rgba(35, 35, 45, 0.98) 100%);
          border-radius: 3px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transform: perspective(200px) rotateX(15deg);
        }

        .keyboard-keys {
          position: absolute;
          inset: 3px;
          background: repeating-linear-gradient(
            90deg,
            rgba(60, 60, 70, 0.6) 0px,
            rgba(60, 60, 70, 0.6) 4px,
            rgba(40, 40, 50, 0.4) 4px,
            rgba(40, 40, 50, 0.4) 5px
          );
          border-radius: 2px;
        }

        /* ============ MOUSE ============ */
        .mouse {
          position: absolute;
          bottom: 92px;
          left: 165px;
          width: 14px;
          height: 22px;
          background: linear-gradient(180deg,
            rgba(50, 50, 60, 0.98) 0%,
            rgba(40, 40, 50, 0.95) 100%);
          border-radius: 7px 7px 10px 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }

        .mouse-wheel {
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 6px;
          background: rgba(80, 80, 95, 0.8);
          border-radius: 2px;
        }

        /* ============ COFFEE CUP ============ */
        .coffee-cup {
          position: absolute;
          bottom: 92px;
          left: 195px;
        }

        .cup-body {
          width: 16px;
          height: 18px;
          background: linear-gradient(135deg,
            rgba(220, 200, 180, 0.95) 0%,
            rgba(200, 180, 160, 0.9) 100%);
          border-radius: 2px 2px 4px 4px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .cup-handle {
          position: absolute;
          top: 4px;
          right: -6px;
          width: 8px;
          height: 10px;
          border: 2px solid rgba(200, 180, 160, 0.9);
          border-left: none;
          border-radius: 0 5px 5px 0;
        }

        .cup-steam {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 10px;
          opacity: 0.4;
        }

        .steam-wisp {
          position: absolute;
          width: 2px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          animation: steamRise 2s ease-out infinite;
        }

        .steam-1 { left: 1px; height: 8px; animation-delay: 0s; }
        .steam-2 { left: 4px; height: 6px; animation-delay: 0.5s; }

        @keyframes steamRise {
          0% { transform: translateY(0) scaleY(1); opacity: 0.4; }
          100% { transform: translateY(-8px) scaleY(0.5); opacity: 0; }
        }

        /* ============ DESK LAMP - ARCHITECTURAL ============ */
        .desk-lamp {
          position: absolute;
          bottom: 92px;
          right: 25px;
        }

        .lamp-shade {
          width: 45px;
          height: 30px;
          background: linear-gradient(180deg,
            rgba(60, 55, 75, 0.95) 0%,
            rgba(50, 45, 65, 0.9) 100%);
          border-radius: 50% 50% 5% 5% / 30% 30% 10% 10%;
          transform: rotate(-20deg);
          box-shadow: 
            0 4px 15px rgba(0, 0, 0, 0.25),
            inset 0 -15px 25px rgba(139, 92, 246, 0.08);
          position: relative;
        }

        .lamp-inner {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 35px;
          height: 10px;
          background: rgba(139, 92, 246, 0.15);
          border-radius: 50%;
          filter: blur(3px);
        }

        .lamp-light-cone {
          position: absolute;
          bottom: -45px;
          left: 50%;
          transform: translateX(-50%) rotate(20deg);
          width: 0;
          height: 0;
          border-left: 30px solid transparent;
          border-right: 30px solid transparent;
          border-top: 50px solid rgba(139, 92, 246, 0.08);
          filter: blur(8px);
        }

        .lamp-arm-upper {
          width: 4px;
          height: 40px;
          background: linear-gradient(90deg,
            rgba(70, 65, 85, 0.95) 0%,
            rgba(85, 80, 100, 0.98) 50%,
            rgba(70, 65, 85, 0.95) 100%);
          margin: 0 auto;
          transform: rotate(15deg);
          transform-origin: bottom center;
          border-radius: 2px;
        }

        .lamp-arm-joint {
          width: 8px;
          height: 8px;
          background: rgba(90, 85, 105, 0.95);
          border-radius: 50%;
          margin: -2px auto;
        }

        .lamp-arm-lower {
          width: 4px;
          height: 30px;
          background: linear-gradient(90deg,
            rgba(70, 65, 85, 0.95) 0%,
            rgba(85, 80, 100, 0.98) 50%,
            rgba(70, 65, 85, 0.95) 100%);
          margin: 0 auto;
          border-radius: 2px;
        }

        .lamp-base {
          width: 35px;
          height: 8px;
          background: linear-gradient(180deg,
            rgba(65, 60, 80, 0.98) 0%,
            rgba(55, 50, 70, 0.95) 100%);
          margin: 0 auto;
          border-radius: 4px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        }

        /* ============ PLANT ============ */
        .floor-plant {
          position: absolute;
          bottom: 10%;
          right: 28%;
        }

        .plant-pot {
          width: 32px;
          height: 28px;
          background: linear-gradient(180deg,
            rgba(100, 80, 120, 0.85) 0%,
            rgba(80, 65, 100, 0.9) 100%);
          border-radius: 3px 3px 8px 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .plant-leaves {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
        }

        .plant-leaf {
          position: absolute;
          background: linear-gradient(180deg,
            rgba(100, 180, 130, 0.85) 0%,
            rgba(70, 150, 100, 0.9) 100%);
          border-radius: 50% 50% 50% 50% / 80% 80% 20% 20%;
        }

        .leaf-1 { width: 11px; height: 32px; left: -8px; bottom: 0; transform: rotate(-15deg); }
        .leaf-2 { width: 13px; height: 40px; left: -2px; bottom: 0; transform: rotate(5deg); }
        .leaf-3 { width: 10px; height: 28px; left: 5px; bottom: 3px; transform: rotate(20deg); }

        /* ============ BACK BUTTON ============ */
        .back-button {
          position: fixed;
          top: calc(env(safe-area-inset-top, 0px) + 16px);
          left: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.65);
          font-size: 0.85rem;
          cursor: pointer;
          z-index: 100;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          font-family: inherit;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(-2px);
        }

        /* ============ CONTENT ============ */
        .content {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: calc(env(safe-area-inset-top, 0px) + 70px) 20px 40px;
          opacity: ${isLoaded ? 1 : 0};
          transform: translateY(${isLoaded ? '0' : '20px'});
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .header {
          text-align: center;
          margin-bottom: 24px;
        }

        .title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem;
          font-weight: 300;
          color: #ffffff;
          margin-bottom: 8px;
          letter-spacing: 0.02em;
        }

        .subtitle {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.5);
        }

        /* ============ LAUNCH VDS BUTTON ============ */
        .launch-vds {
          padding: 16px 40px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #EC4899 100%);
          color: #fff;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 32px;
          box-shadow: 
            0 5px 30px rgba(139, 92, 246, 0.35),
            0 0 50px rgba(139, 92, 246, 0.1);
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .launch-vds:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 8px 40px rgba(139, 92, 246, 0.45),
            0 0 70px rgba(139, 92, 246, 0.15);
        }

        /* ============ TABS ============ */
        .tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }

        .tab {
          padding: 10px 24px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .tab:hover {
          border-color: rgba(139, 92, 246, 0.4);
          color: rgba(255, 255, 255, 0.85);
        }

        .tab.active {
          background: rgba(139, 92, 246, 0.18);
          border-color: rgba(139, 92, 246, 0.45);
          color: #fff;
        }

        /* ============ CATEGORY GRID ============ */
        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          max-width: 420px;
          width: 100%;
        }

        .category-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 20px 14px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .category-card:hover {
          transform: translateY(-3px);
          border-color: rgba(139, 92, 246, 0.4);
          background: rgba(139, 92, 246, 0.08);
          box-shadow: 0 10px 35px rgba(139, 92, 246, 0.12);
        }

        .category-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 0.95rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 6px;
        }

        .category-description {
          font-size: 0.68rem;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .category-count {
          font-size: 0.62rem;
          color: rgba(139, 92, 246, 0.6);
        }

        /* ============ TEMPLATE LIST ============ */
        .template-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          max-width: 380px;
          width: 100%;
        }

        .template-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 18px 14px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .template-card:hover {
          transform: translateY(-2px);
          border-color: rgba(139, 92, 246, 0.4);
          background: rgba(139, 92, 246, 0.1);
          box-shadow: 0 8px 30px rgba(139, 92, 246, 0.12);
        }

        .template-icon {
          width: 40px;
          height: 40px;
          margin: 0 auto 12px;
          border-radius: 10px;
          background: linear-gradient(135deg,
            rgba(139, 92, 246, 0.25) 0%,
            rgba(99, 102, 241, 0.15) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .template-name {
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 4px;
        }

        .template-description {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.45);
        }

        .back-to-categories {
          background: none;
          border: none;
          color: rgba(139, 92, 246, 0.6);
          font-size: 0.8rem;
          cursor: pointer;
          margin-bottom: 20px;
          font-family: inherit;
          transition: color 0.3s ease;
        }

        .back-to-categories:hover {
          color: rgba(139, 92, 246, 0.9);
        }

        .section-header {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 20px;
          text-align: center;
        }

        /* ============ PROJECTS ============ */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          max-width: 380px;
          width: 100%;
        }

        .project-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-2px);
          border-color: rgba(139, 92, 246, 0.35);
          background: rgba(139, 92, 246, 0.06);
        }

        .project-thumbnail {
          width: 100%;
          height: 70px;
          background: linear-gradient(135deg,
            rgba(139, 92, 246, 0.15) 0%,
            rgba(99, 102, 241, 0.1) 100%);
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .project-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 4px;
        }

        .project-date {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.35);
        }

        .empty-projects {
          text-align: center;
          padding: 50px 20px;
          color: rgba(255, 255, 255, 0.35);
        }

        .empty-icon {
          width: 50px;
          height: 50px;
          margin: 0 auto 16px;
          border: 2px dashed rgba(255, 255, 255, 0.15);
          border-radius: 10px;
        }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 768px) {
          .room-elements { opacity: ${isLoaded ? 0.3 : 0}; }
          .category-grid { max-width: 360px; gap: 10px; }
          .template-list { max-width: 340px; }
          .easel-container { left: 3%; transform: scale(0.7); }
          .palette { left: 10%; transform: scale(0.7) rotate(-15deg); }
          .desk-container { right: 2%; transform: perspective(800px) rotateY(-8deg) scale(0.65); transform-origin: bottom right; }
          .floor-plant { right: 42%; transform: scale(0.75); }
          .window-container { width: 14%; right: 5%; }
        }

        @media (max-width: 480px) {
          .room-elements { opacity: ${isLoaded ? 0.2 : 0}; }
          .content { padding: calc(env(safe-area-inset-top, 0px) + 60px) 16px 30px; }
          .title { font-size: 1.6rem; }
          .launch-vds { padding: 14px 32px; font-size: 0.9rem; }
          .category-grid { grid-template-columns: 1fr; max-width: 280px; }
          .template-list { grid-template-columns: 1fr; max-width: 280px; }
          .projects-grid { grid-template-columns: 1fr; max-width: 280px; }
          .easel-container, .palette { display: none; }
          .desk-container { right: 1%; transform: perspective(800px) rotateY(-8deg) scale(0.45); transform-origin: bottom right; }
          .floor-plant { right: 55%; transform: scale(0.6); }
          .window-container { width: 16%; right: 4%; top: 5%; height: 26%; }
        }
      `}</style>

      <div className="studio-room">
        {/* Ambient Layers */}
        <div className="ambient-layer creative-glow" />
        <div className="ambient-layer grid-overlay" />

        {/* Room Elements */}
        <div className="room-elements">
          {/* Floating Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className={`particle ${p.color === 0 ? 'particle-purple' : p.color === 1 ? 'particle-pink' : 'particle-blue'}`}
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

          <div className="floor"><div className="floor-grid" /></div>

          {/* Window */}
          <div className="window-container">
            <div className="window">
              <div className="window-star" style={{ top: '15%', left: '20%', width: '2px', height: '2px' }} />
              <div className="window-star" style={{ top: '30%', right: '25%', width: '1.5px', height: '1.5px', animationDelay: '1s' }} />
              <div className="window-star" style={{ top: '55%', left: '35%', width: '2px', height: '2px', animationDelay: '2s' }} />
              <div className="window-star" style={{ bottom: '25%', right: '35%', width: '1.5px', height: '1.5px', animationDelay: '0.5s' }} />
              <div className="window-frame-v" />
              <div className="window-frame-h" />
            </div>
          </div>

          {/* Easel */}
          <div className="easel-container">
            <div className="easel-leg easel-leg-left" />
            <div className="easel-leg easel-leg-right" />
            <div className="easel-leg easel-leg-back" />
            <div className="easel-support" />
            <div className="easel-tray">
              <div className="brushes-container">
                <div className="brush brush-1" />
                <div className="brush brush-2" />
                <div className="brush brush-3" />
              </div>
            </div>
            <div className="easel-canvas">
              <div className="canvas-content" />
            </div>
          </div>

          {/* Palette */}
          <div className="palette">
            <div className="palette-hole" />
            <div className="paint-blob blob-purple" />
            <div className="paint-blob blob-pink" />
            <div className="paint-blob blob-blue" />
            <div className="paint-blob blob-teal" />
          </div>

          {/* Plant */}
          <div className="floor-plant">
            <div className="plant-leaves">
              <div className="plant-leaf leaf-1" />
              <div className="plant-leaf leaf-2" />
              <div className="plant-leaf leaf-3" />
            </div>
            <div className="plant-pot" />
          </div>

          {/* Desk - Architectural */}
          <div className="desk-container">
            {/* Monitor */}
            <div className="monitor">
              <div className="monitor-frame">
                <div className="monitor-screen">
                  <div className="screen-content" />
                  <div className="screen-reflection" />
                </div>
              </div>
              <div className="monitor-chin" />
              <div className="monitor-stand-neck" />
              <div className="monitor-stand-base" />
            </div>

            {/* Keyboard */}
            <div className="keyboard">
              <div className="keyboard-keys" />
            </div>

            {/* Mouse */}
            <div className="mouse">
              <div className="mouse-wheel" />
            </div>

            {/* Coffee Cup */}
            <div className="coffee-cup">
              <div className="cup-body" />
              <div className="cup-handle" />
              <div className="cup-steam">
                <div className="steam-wisp steam-1" />
                <div className="steam-wisp steam-2" />
              </div>
            </div>

            {/* Lamp */}
            <div className="desk-lamp">
              <div className="lamp-shade">
                <div className="lamp-inner" />
                <div className="lamp-light-cone" />
              </div>
              <div className="lamp-arm-upper" />
              <div className="lamp-arm-joint" />
              <div className="lamp-arm-lower" />
              <div className="lamp-base" />
            </div>

            {/* Desk Structure */}
            <div className="desk-top-surface" />
            <div className="desk-surface" />
            <div className="desk-front-panel" />
            <div className="drawer-unit">
              <div className="drawer drawer-1"><div className="drawer-handle" /></div>
              <div className="drawer drawer-2"><div className="drawer-handle" /></div>
              <div className="drawer drawer-3"><div className="drawer-handle" /></div>
            </div>
            <div className="desk-leg desk-leg-left" />
            <div className="desk-leg desk-leg-right" />
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
            <h1 className="title">Design Studio</h1>
            <p className="subtitle">Create your perfect sanctuary</p>
          </div>

          <button className="launch-vds" onClick={onLaunchVDS}>
            Open Virtual Design Studio
          </button>

          <div className="tabs">
            <button className={`tab ${activeTab === 'create' ? 'active' : ''}`} onClick={() => setActiveTab('create')}>
              Templates
            </button>
            <button className={`tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
              My Projects
            </button>
          </div>

          {/* Templates - Categories */}
          {activeTab === 'create' && !selectedCategory && (
            <div className="category-grid">
              {TEMPLATE_CATEGORIES.map((category) => (
                <div key={category.id} className="category-card" onClick={() => handleCategoryClick(category.id)}>
                  <h3 className="category-title">{category.title}</h3>
                  <p className="category-description">{category.description}</p>
                  <span className="category-count">{category.count} options</span>
                </div>
              ))}
            </div>
          )}

          {/* Templates - List */}
          {activeTab === 'create' && selectedCategory && (
            <>
              <button className="back-to-categories" onClick={handleBackToCategories}>
                ← Back
              </button>
              <h2 className="section-header">
                {TEMPLATE_CATEGORIES.find(c => c.id === selectedCategory)?.title}
              </h2>
              <div className="template-list">
                {templatesInCategory.map((template) => (
                  <div key={template.id} className="template-card" onClick={() => handleTemplateClick(template.id)}>
                    <div className="template-icon" />
                    <div className="template-name">{template.name}</div>
                    <div className="template-description">{template.description}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Projects */}
          {activeTab === 'projects' && (
            <>
              {savedProjects.length > 0 ? (
                <div className="projects-grid">
                  {savedProjects.map((project) => (
                    <div key={project.id} className="project-card" onClick={() => onOpenProject?.(project.id)}>
                      <div className="project-thumbnail" />
                      <div className="project-name">{project.name}</div>
                      <div className="project-date">{project.lastEdited}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-projects">
                  <div className="empty-icon" />
                  <div>No sanctuaries created yet</div>
                  <div style={{ marginTop: '8px', fontSize: '0.8rem' }}>
                    Start with a template above
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}