'use client';

import { useState, useEffect } from 'react';

interface StudioRoomProps {
  onBack: () => void;
  onLaunchVDS?: () => void;
  onOpenProject?: (projectId: string) => void;
  savedProjects?: Array<{
    id: string;
    name: string;
    thumbnail?: string;
    lastEdited: string;
  }>;
}

const TEMPLATES = [
  { id: 'blank', name: 'Blank Canvas', description: 'Start from scratch' },
  { id: 'cozy-corner', name: 'Cozy Corner', description: 'Warm, intimate space' },
  { id: 'zen-garden', name: 'Zen Garden', description: 'Peaceful outdoor retreat' },
  { id: 'cloud-room', name: 'Cloud Room', description: 'Floating among the sky' },
  { id: 'forest-clearing', name: 'Forest Clearing', description: 'Nature sanctuary' },
  { id: 'ocean-view', name: 'Ocean View', description: 'Seaside tranquility' },
];

export default function StudioRoom({ onBack, onLaunchVDS, onOpenProject, savedProjects = [] }: StudioRoomProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'projects'>('create');
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating creative particles
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleTemplateClick = (templateId: string) => {
    if (onLaunchVDS) {
      onLaunchVDS();
    }
  };

  return (
    <>
      <style jsx>{`
        .studio-room {
          min-height: 100vh;
          min-height: 100dvh;
          background: linear-gradient(180deg, #1a1625 0%, #231f35 30%, #2a2545 60%, #1e1a30 100%);
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

        .creative-glow {
          background: 
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 80% 70%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99, 102, 241, 0.06) 0%, transparent 60%);
          animation: creativeShift 15s ease-in-out infinite;
        }

        @keyframes creativeShift {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        .grid-overlay {
          background-image: 
            linear-gradient(rgba(139, 119, 183, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 119, 183, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridPulse 10s ease-in-out infinite;
        }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        /* Floating Particles */
        .particle {
          position: absolute;
          border-radius: 50%;
          animation: floatParticle linear infinite;
        }

        .particle-purple {
          background: rgba(139, 92, 246, 0.6);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
        }

        .particle-pink {
          background: rgba(236, 72, 153, 0.5);
          box-shadow: 0 0 15px rgba(236, 72, 153, 0.3);
        }

        .particle-blue {
          background: rgba(99, 102, 241, 0.5);
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(-30vh) translateX(20px) scale(1.2);
            opacity: 0.6;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-60vh) translateX(-10px) scale(0.8);
            opacity: 0;
          }
        }

        /* Floor */
        .floor {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 35%;
          background: linear-gradient(180deg,
            rgba(30, 26, 48, 0.9) 0%,
            rgba(25, 22, 40, 0.95) 50%,
            rgba(20, 18, 32, 1) 100%);
          transform: perspective(800px) rotateX(55deg);
          transform-origin: bottom center;
        }

        .floor-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(139, 119, 183, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 119, 183, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Easel */
        .easel-container {
          position: absolute;
          bottom: 18%;
          left: 8%;
          width: 140px;
          height: 180px;
        }

        .easel-leg {
          position: absolute;
          bottom: 0;
          width: 6px;
          height: 140px;
          background: linear-gradient(180deg,
            rgba(120, 100, 80, 0.9) 0%,
            rgba(90, 75, 60, 1) 100%);
          border-radius: 3px;
        }

        .easel-leg-left {
          left: 25px;
          transform: rotate(-12deg);
          transform-origin: bottom center;
        }

        .easel-leg-right {
          right: 25px;
          transform: rotate(12deg);
          transform-origin: bottom center;
        }

        .easel-leg-back {
          left: 50%;
          transform: translateX(-50%) rotate(0deg);
          height: 130px;
        }

        .easel-support {
          position: absolute;
          bottom: 60px;
          left: 20px;
          right: 20px;
          height: 5px;
          background: linear-gradient(90deg,
            rgba(100, 85, 65, 0.9) 0%,
            rgba(120, 100, 80, 1) 50%,
            rgba(100, 85, 65, 0.9) 100%);
          border-radius: 2px;
        }

        .easel-tray {
          position: absolute;
          bottom: 55px;
          left: 15px;
          right: 15px;
          height: 8px;
          background: linear-gradient(180deg,
            rgba(110, 90, 70, 1) 0%,
            rgba(90, 75, 60, 1) 100%);
          border-radius: 2px 2px 0 0;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        }

        /* Canvas on easel */
        .easel-canvas {
          position: absolute;
          bottom: 65px;
          left: 50%;
          transform: translateX(-50%);
          width: 90px;
          height: 110px;
          background: linear-gradient(180deg,
            rgba(255, 252, 248, 0.98) 0%,
            rgba(250, 248, 242, 0.95) 100%);
          border: 3px solid rgba(180, 160, 130, 0.8);
          box-shadow:
            0 5px 25px rgba(0, 0, 0, 0.2),
            inset 0 0 30px rgba(0, 0, 0, 0.03);
          border-radius: 2px;
        }

        .canvas-content {
          position: absolute;
          top: 15%;
          left: 15%;
          right: 15%;
          bottom: 15%;
          background: 
            linear-gradient(135deg, 
              rgba(139, 92, 246, 0.15) 0%, 
              rgba(236, 72, 153, 0.1) 50%,
              rgba(99, 102, 241, 0.15) 100%);
          border-radius: 4px;
          animation: canvasShimmer 5s ease-in-out infinite;
        }

        @keyframes canvasShimmer {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        /* Paint Brushes */
        .brushes-container {
          position: absolute;
          bottom: 63px;
          left: 20px;
          display: flex;
          gap: 4px;
        }

        .brush {
          width: 4px;
          border-radius: 2px 2px 4px 4px;
        }

        .brush-1 {
          height: 25px;
          background: linear-gradient(180deg, #8B5CF6 0%, #1e1a30 60%);
          transform: rotate(-5deg);
        }

        .brush-2 {
          height: 28px;
          background: linear-gradient(180deg, #EC4899 0%, #1e1a30 60%);
          transform: rotate(3deg);
        }

        .brush-3 {
          height: 22px;
          background: linear-gradient(180deg, #6366F1 0%, #1e1a30 60%);
          transform: rotate(-2deg);
        }

        /* Palette */
        .palette {
          position: absolute;
          bottom: 14%;
          left: 25%;
          width: 70px;
          height: 50px;
          background: linear-gradient(135deg,
            rgba(200, 180, 150, 0.95) 0%,
            rgba(180, 160, 130, 0.9) 100%);
          border-radius: 35px 35px 25px 35px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          transform: rotate(-15deg);
        }

        .palette-hole {
          position: absolute;
          top: 35%;
          left: 15%;
          width: 12px;
          height: 12px;
          background: rgba(30, 26, 48, 0.8);
          border-radius: 50%;
        }

        .paint-blob {
          position: absolute;
          border-radius: 50%;
          box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3);
        }

        .blob-purple {
          top: 10px;
          right: 12px;
          width: 14px;
          height: 12px;
          background: #8B5CF6;
        }

        .blob-pink {
          top: 25px;
          right: 8px;
          width: 12px;
          height: 10px;
          background: #EC4899;
        }

        .blob-blue {
          bottom: 12px;
          right: 18px;
          width: 10px;
          height: 10px;
          background: #6366F1;
        }

        .blob-teal {
          bottom: 8px;
          left: 35%;
          width: 11px;
          height: 9px;
          background: #14B8A6;
        }

        /* Desk */
        .desk-container {
          position: absolute;
          bottom: 10%;
          right: 8%;
          width: 180px;
        }

        .desk-top {
          width: 100%;
          height: 12px;
          background: linear-gradient(180deg,
            rgba(80, 70, 90, 1) 0%,
            rgba(65, 55, 75, 1) 100%);
          border-radius: 4px 4px 0 0;
          box-shadow:
            0 -3px 15px rgba(139, 119, 183, 0.1),
            0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .desk-front {
          width: 100%;
          height: 50px;
          background: linear-gradient(180deg,
            rgba(70, 60, 80, 1) 0%,
            rgba(55, 48, 65, 1) 100%);
          border-radius: 0 0 4px 4px;
        }

        .desk-drawer {
          position: absolute;
          top: 10px;
          height: 30px;
          background: linear-gradient(180deg,
            rgba(80, 70, 90, 0.6) 0%,
            rgba(65, 55, 75, 0.5) 100%);
          border-radius: 2px;
          box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2);
        }

        .drawer-1 {
          left: 8%;
          width: 35%;
        }

        .drawer-2 {
          right: 8%;
          width: 35%;
        }

        .drawer-handle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 4px;
          background: rgba(139, 119, 183, 0.5);
          border-radius: 2px;
        }

        /* Monitor on desk */
        .monitor {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
        }

        .monitor-screen {
          width: 80px;
          height: 55px;
          background: linear-gradient(180deg,
            rgba(20, 18, 32, 1) 0%,
            rgba(30, 26, 48, 1) 100%);
          border: 3px solid rgba(60, 52, 75, 0.9);
          border-radius: 4px;
          box-shadow:
            0 0 20px rgba(139, 92, 246, 0.15),
            inset 0 0 30px rgba(139, 92, 246, 0.05);
          overflow: hidden;
        }

        .screen-content {
          position: absolute;
          top: 10%;
          left: 10%;
          right: 10%;
          bottom: 10%;
          background: linear-gradient(135deg,
            rgba(139, 92, 246, 0.2) 0%,
            rgba(99, 102, 241, 0.15) 100%);
          border-radius: 2px;
          animation: screenGlow 3s ease-in-out infinite;
        }

        @keyframes screenGlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .screen-lines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 2px,
            rgba(139, 119, 183, 0.05) 2px,
            rgba(139, 119, 183, 0.05) 4px
          );
        }

        .monitor-stand {
          width: 12px;
          height: 15px;
          background: linear-gradient(180deg,
            rgba(60, 52, 75, 1) 0%,
            rgba(50, 44, 65, 1) 100%);
          margin: 0 auto;
        }

        .monitor-base {
          width: 35px;
          height: 5px;
          background: linear-gradient(180deg,
            rgba(55, 48, 65, 1) 0%,
            rgba(45, 40, 55, 1) 100%);
          margin: 0 auto;
          border-radius: 2px;
        }

        /* Lamp */
        .desk-lamp {
          position: absolute;
          bottom: 15px;
          right: 15px;
        }

        .lamp-head {
          width: 30px;
          height: 20px;
          background: linear-gradient(180deg,
            rgba(80, 70, 100, 1) 0%,
            rgba(60, 52, 80, 1) 100%);
          border-radius: 15px 15px 5px 5px;
          transform: rotate(-20deg);
          box-shadow:
            0 4px 15px rgba(0, 0, 0, 0.2),
            inset 0 -8px 15px rgba(139, 92, 246, 0.15);
        }

        .lamp-light {
          position: absolute;
          bottom: -25px;
          left: 50%;
          transform: translateX(-50%) rotate(20deg);
          width: 50px;
          height: 40px;
          background: radial-gradient(ellipse at top,
            rgba(139, 92, 246, 0.15) 0%,
            rgba(139, 92, 246, 0.05) 50%,
            transparent 70%);
        }

        .lamp-arm {
          width: 4px;
          height: 35px;
          background: linear-gradient(180deg,
            rgba(70, 62, 90, 1) 0%,
            rgba(55, 48, 70, 1) 100%);
          margin: 0 auto;
          transform: rotate(10deg);
        }

        .lamp-base {
          width: 20px;
          height: 6px;
          background: linear-gradient(180deg,
            rgba(60, 52, 75, 1) 0%,
            rgba(50, 44, 65, 1) 100%);
          margin: 0 auto;
          border-radius: 3px;
        }

        /* Window */
        .window-container {
          position: absolute;
          top: 8%;
          right: 20%;
          width: 18%;
          height: 40%;
        }

        .window {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg,
            rgba(40, 35, 60, 0.7) 0%,
            rgba(50, 45, 75, 0.6) 50%,
            rgba(40, 35, 60, 0.7) 100%);
          border: 4px solid rgba(60, 52, 80, 0.9);
          border-radius: 4px;
          box-shadow:
            inset 0 0 40px rgba(139, 92, 246, 0.08),
            0 0 30px rgba(0, 0, 0, 0.3);
        }

        .window-frame-v {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background: rgba(60, 52, 80, 0.9);
        }

        .window-frame-h {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 4px;
          background: rgba(60, 52, 80, 0.9);
        }

        .window-stars {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .window-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
        }

        /* Plant */
        .floor-plant {
          position: absolute;
          bottom: 12%;
          right: 35%;
        }

        .plant-pot {
          width: 40px;
          height: 35px;
          background: linear-gradient(180deg,
            rgba(100, 80, 120, 0.9) 0%,
            rgba(80, 65, 100, 1) 100%);
          border-radius: 4px 4px 10px 10px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
        }

        .plant-leaves {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 70px;
        }

        .plant-leaf {
          position: absolute;
          background: linear-gradient(180deg,
            rgba(100, 180, 130, 0.9) 0%,
            rgba(70, 150, 100, 1) 100%);
          border-radius: 50% 50% 50% 50% / 80% 80% 20% 20%;
          transform-origin: bottom center;
          animation: leafSway 6s ease-in-out infinite;
        }

        .leaf-1 { width: 14px; height: 40px; left: 22px; bottom: 0; transform: rotate(-10deg); --sway: 3deg; }
        .leaf-2 { width: 16px; height: 50px; left: 26px; bottom: 0; transform: rotate(5deg); --sway: -2deg; animation-delay: -1s; }
        .leaf-3 { width: 12px; height: 35px; left: 18px; bottom: 5px; transform: rotate(-20deg); --sway: 4deg; animation-delay: -2s; }
        .leaf-4 { width: 14px; height: 42px; left: 32px; bottom: 3px; transform: rotate(15deg); --sway: -3deg; animation-delay: -3s; }

        @keyframes leafSway {
          0%, 100% { transform: rotate(var(--base-rotate, 0deg)); }
          50% { transform: rotate(calc(var(--base-rotate, 0deg) + var(--sway, 3deg))); }
        }

        .leaf-1 { --base-rotate: -10deg; }
        .leaf-2 { --base-rotate: 5deg; }
        .leaf-3 { --base-rotate: -20deg; }
        .leaf-4 { --base-rotate: 15deg; }

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
          color: #ffffff;
          margin-bottom: 10px;
          letter-spacing: 0.02em;
        }

        .subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.55);
        }

        /* Launch VDS Button */
        .launch-vds {
          padding: 18px 48px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #EC4899 100%);
          color: #fff;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 40px;
          box-shadow: 
            0 6px 35px rgba(139, 92, 246, 0.4),
            0 0 60px rgba(139, 92, 246, 0.15);
          transition: all 0.3s ease;
          letter-spacing: 0.02em;
        }

        .launch-vds:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 
            0 10px 50px rgba(139, 92, 246, 0.5),
            0 0 80px rgba(139, 92, 246, 0.2);
        }

        /* Tabs */
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 28px;
        }

        .tab {
          padding: 12px 28px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab:hover {
          border-color: rgba(139, 92, 246, 0.4);
          color: rgba(255, 255, 255, 0.9);
        }

        .tab.active {
          background: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.5);
          color: #fff;
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.15);
        }

        /* Templates Grid */
        .templates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 16px;
          max-width: 700px;
          width: 100%;
        }

        .template-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 28px 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .template-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 92, 246, 0.5);
          background: rgba(139, 92, 246, 0.1);
          box-shadow: 0 12px 45px rgba(139, 92, 246, 0.15);
        }

        .template-icon {
          width: 50px;
          height: 50px;
          margin: 0 auto 14px;
          border-radius: 12px;
          background: linear-gradient(135deg,
            rgba(139, 92, 246, 0.3) 0%,
            rgba(99, 102, 241, 0.2) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* CSS Icons for templates */
        .icon-blank {
          width: 24px;
          height: 24px;
          border: 2px dashed rgba(255, 255, 255, 0.4);
          border-radius: 4px;
        }

        .icon-cozy {
          position: relative;
          width: 26px;
          height: 16px;
        }

        .icon-cozy-back {
          position: absolute;
          bottom: 4px;
          left: 2px;
          right: 2px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 4px 4px 0 0;
        }

        .icon-cozy-seat {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 3px;
        }

        .icon-zen {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(255, 255, 255, 0.5) 30%,
            transparent 70%);
          position: relative;
        }

        .icon-zen::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.8);
        }

        .icon-cloud {
          width: 28px;
          height: 16px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
          position: relative;
        }

        .icon-cloud::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 6px;
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
        }

        .icon-forest {
          position: relative;
          width: 24px;
          height: 24px;
        }

        .icon-tree {
          position: absolute;
          bottom: 0;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 16px solid rgba(255, 255, 255, 0.5);
        }

        .icon-tree-1 { left: 0; }
        .icon-tree-2 { left: 6px; border-bottom-width: 20px; }
        .icon-tree-3 { right: 0; border-bottom-width: 14px; }

        .icon-ocean {
          width: 26px;
          height: 18px;
          position: relative;
          overflow: hidden;
        }

        .icon-wave {
          position: absolute;
          left: 0;
          right: 0;
          height: 8px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50% 50% 0 0;
        }

        .icon-wave-1 { bottom: 0; }
        .icon-wave-2 { bottom: 6px; opacity: 0.6; }

        .template-name {
          font-size: 0.95rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 6px;
        }

        .template-description {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Projects Grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 18px;
          max-width: 700px;
          width: 100%;
        }

        .project-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-4px);
          border-color: rgba(139, 92, 246, 0.4);
          background: rgba(139, 92, 246, 0.08);
        }

        .project-thumbnail {
          width: 100%;
          height: 100px;
          background: linear-gradient(135deg,
            rgba(139, 92, 246, 0.2) 0%,
            rgba(99, 102, 241, 0.15) 100%);
          border-radius: 10px;
          margin-bottom: 14px;
        }

        .project-name {
          font-size: 1rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 6px;
        }

        .project-date {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .empty-projects {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255, 255, 255, 0.4);
        }

        .empty-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 20px;
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
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
            rgba(150, 130, 200, 0.7) 50%,
            rgba(120, 100, 180, 0.5) 100%);
          box-shadow: 0 0 40px rgba(139, 119, 183, 0.4);
          animation: orbBreathe 5s ease-in-out infinite;
          cursor: pointer;
        }

        @keyframes orbBreathe {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(139, 119, 183, 0.4); }
          50% { transform: scale(1.06); box-shadow: 0 0 55px rgba(139, 119, 183, 0.5); }
        }

        @media (max-width: 768px) {
          .templates-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .easel-container,
          .palette,
          .desk-container,
          .floor-plant {
            opacity: 0.3;
          }

          .window-container {
            width: 25%;
            right: 10%;
          }
        }
      `}</style>

      <div className="studio-room">
        {/* Ambient Layers */}
        <div className="ambient-layer creative-glow" />
        <div className="ambient-layer grid-overlay" />

        {/* Floating Particles */}
        {particles.map((p, i) => (
          <div
            key={p.id}
            className={`particle ${i % 3 === 0 ? 'particle-purple' : i % 3 === 1 ? 'particle-pink' : 'particle-blue'}`}
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

        {/* Floor */}
        <div className="floor">
          <div className="floor-grid" />
        </div>

        {/* Window */}
        <div className="window-container">
          <div className="window">
            <div className="window-frame-v" />
            <div className="window-frame-h" />
            <div className="window-stars">
              <div className="window-star" style={{ top: '15%', left: '20%' }} />
              <div className="window-star" style={{ top: '30%', right: '25%' }} />
              <div className="window-star" style={{ top: '60%', left: '35%' }} />
              <div className="window-star" style={{ bottom: '25%', right: '40%' }} />
            </div>
          </div>
        </div>

        {/* Easel with Canvas */}
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

        {/* Desk with Monitor */}
        <div className="desk-container">
          <div className="monitor">
            <div className="monitor-screen">
              <div className="screen-content" />
              <div className="screen-lines" />
            </div>
            <div className="monitor-stand" />
            <div className="monitor-base" />
          </div>
          <div className="desk-lamp">
            <div className="lamp-head">
              <div className="lamp-light" />
            </div>
            <div className="lamp-arm" />
            <div className="lamp-base" />
          </div>
          <div className="desk-top" />
          <div className="desk-front">
            <div className="desk-drawer drawer-1">
              <div className="drawer-handle" />
            </div>
            <div className="desk-drawer drawer-2">
              <div className="drawer-handle" />
            </div>
          </div>
        </div>

        {/* Floor Plant */}
        <div className="floor-plant">
          <div className="plant-leaves">
            <div className="plant-leaf leaf-1" />
            <div className="plant-leaf leaf-2" />
            <div className="plant-leaf leaf-3" />
            <div className="plant-leaf leaf-4" />
          </div>
          <div className="plant-pot" />
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
            <div className="subtitle">Create your perfect sanctuary</div>
          </div>

          {/* Launch VDS Button */}
          <button className="launch-vds" onClick={onLaunchVDS}>
            Open Virtual Design Studio
          </button>

          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'create' ? 'active' : ''}`}
              onClick={() => setActiveTab('create')}
            >
              Templates
            </button>
            <button
              className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              My Projects
            </button>
          </div>

          {/* Templates */}
          {activeTab === 'create' && (
            <div className="templates-grid">
              {TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  className="template-card"
                  onClick={() => handleTemplateClick(template.id)}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                >
                  <div className="template-icon">
                    {template.id === 'blank' && <div className="icon-blank" />}
                    {template.id === 'cozy-corner' && (
                      <div className="icon-cozy">
                        <div className="icon-cozy-back" />
                        <div className="icon-cozy-seat" />
                      </div>
                    )}
                    {template.id === 'zen-garden' && <div className="icon-zen" />}
                    {template.id === 'cloud-room' && <div className="icon-cloud" />}
                    {template.id === 'forest-clearing' && (
                      <div className="icon-forest">
                        <div className="icon-tree icon-tree-1" />
                        <div className="icon-tree icon-tree-2" />
                        <div className="icon-tree icon-tree-3" />
                      </div>
                    )}
                    {template.id === 'ocean-view' && (
                      <div className="icon-ocean">
                        <div className="icon-wave icon-wave-1" />
                        <div className="icon-wave icon-wave-2" />
                      </div>
                    )}
                  </div>
                  <div className="template-name">{template.name}</div>
                  <div className="template-description">{template.description}</div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {activeTab === 'projects' && (
            <>
              {savedProjects.length > 0 ? (
                <div className="projects-grid">
                  {savedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="project-card"
                      onClick={() => onOpenProject?.(project.id)}
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
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
                  <div style={{ marginTop: '8px', fontSize: '0.85rem' }}>
                    Start with a template above
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* VERA Presence */}
        <div className="vera-presence">
          <div className="vera-orb" />
        </div>
      </div>
    </>
  );
}