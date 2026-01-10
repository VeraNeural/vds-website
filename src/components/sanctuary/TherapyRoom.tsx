'use client';

import { useState, useEffect, useRef } from 'react';

interface TherapyRoomProps {
  onBack: () => void;
  onSendMessage: (message: string) => void;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  isGenerating?: boolean;
  userName?: string;
}

export default function TherapyRoom({ 
  onBack, 
  onSendMessage, 
  messages, 
  isGenerating = false,
  userName 
}: TherapyRoomProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [dustParticles, setDustParticles] = useState<Array<{ id: number; x: number; size: number; duration: number; delay: number }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Generate dust particles in light beams
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 55 + Math.random() * 35,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 8,
    }));
    setDustParticles(particles);

    setTimeout(() => setIsLoaded(true), 100);
    setTimeout(() => setShowChat(true), 800);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isGenerating) return;
    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const starterPrompts = [
    "I'm feeling anxious right now",
    "I just need someone to talk to",
    "Help me understand what I'm feeling",
  ];

  return (
    <>
      <style jsx>{`
        .therapy-room {
          min-height: 100vh;
          min-height: 100dvh;
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #faf8f5 0%, #f5f0e8 60%, #ebe5db 100%);
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
          background: 
            radial-gradient(ellipse 80% 100% at 75% 20%, rgba(255, 248, 235, 0.9) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 30%, rgba(255, 245, 225, 0.6) 0%, transparent 40%);
          animation: sunPulse 8s ease-in-out infinite;
        }

        @keyframes sunPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }

        .ambient-glow {
          background: 
            radial-gradient(ellipse 100% 60% at 50% 100%, rgba(212, 200, 184, 0.3) 0%, transparent 60%),
            radial-gradient(ellipse 80% 40% at 20% 80%, rgba(168, 181, 160, 0.15) 0%, transparent 50%);
        }

        /* Light Beams */
        .light-beams {
          position: absolute;
          top: 0;
          right: 5%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .beam {
          position: absolute;
          background: linear-gradient(180deg, 
            rgba(255, 250, 240, 0.5) 0%, 
            rgba(255, 248, 235, 0.3) 30%,
            rgba(255, 245, 225, 0.1) 60%,
            transparent 100%);
          transform-origin: top center;
          animation: beamSway 15s ease-in-out infinite;
        }

        .beam-1 {
          width: 150px;
          height: 120%;
          top: -10%;
          left: 15%;
          transform: rotate(-12deg) skewX(-8deg);
          animation-delay: 0s;
        }

        .beam-2 {
          width: 100px;
          height: 115%;
          top: -10%;
          left: 40%;
          transform: rotate(-8deg) skewX(-5deg);
          animation-delay: -4s;
          opacity: 0.7;
        }

        .beam-3 {
          width: 120px;
          height: 118%;
          top: -10%;
          left: 60%;
          transform: rotate(-15deg) skewX(-6deg);
          animation-delay: -8s;
          opacity: 0.5;
        }

        @keyframes beamSway {
          0%, 100% { 
            transform: rotate(-12deg) skewX(-8deg) translateX(0); 
            opacity: 1; 
          }
          50% { 
            transform: rotate(-10deg) skewX(-6deg) translateX(15px); 
            opacity: 0.8; 
          }
        }

        /* Dust Particles in Light */
        .dust-container {
          position: absolute;
          top: 0;
          right: 0;
          width: 60%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .dust {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 250, 240, 0.9);
          box-shadow: 0 0 8px rgba(255, 250, 240, 0.6);
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
          50% {
            transform: translateY(40vh) translateX(-15px) scale(1);
            opacity: 0.9;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-10vh) translateX(20px) scale(0.6);
            opacity: 0;
          }
        }

        /* Room Elements */
        .room-elements {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70%;
          pointer-events: none;
          opacity: ${isLoaded ? 0.35 : 0};
          transition: opacity 1.5s ease;
        }

        /* Floor */
        .floor {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40%;
          background: linear-gradient(180deg, 
            rgba(232, 224, 212, 0.95) 0%,
            rgba(221, 213, 200, 1) 50%,
            rgba(210, 202, 189, 1) 100%);
          transform: perspective(800px) rotateX(55deg);
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
            transparent 100px,
            rgba(0, 0, 0, 0.03) 100px,
            rgba(0, 0, 0, 0.03) 102px);
        }

        /* Wall */
        .wall {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 75%;
          background: linear-gradient(180deg, 
            rgba(250, 248, 245, 1) 0%,
            rgba(245, 240, 232, 1) 50%,
            rgba(240, 235, 227, 1) 100%);
        }

        /* Window */
        .window-container {
          position: absolute;
          top: 8%;
          right: 6%;
          width: 25%;
          height: 50%;
        }

        .window {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, 
            rgba(200, 220, 240, 0.7) 0%,
            rgba(180, 210, 235, 0.6) 30%,
            rgba(200, 225, 245, 0.7) 60%,
            rgba(220, 235, 250, 0.8) 100%);
          border: 5px solid rgba(212, 200, 184, 0.95);
          box-shadow: 
            inset 0 0 80px rgba(255, 255, 255, 0.9),
            0 10px 50px rgba(0, 0, 0, 0.08);
          position: relative;
          border-radius: 3px;
        }

        .window-frame-v {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 100%;
          background: rgba(212, 200, 184, 0.95);
        }

        .window-frame-h {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 5px;
          background: rgba(212, 200, 184, 0.95);
        }

        .window-sill {
          position: absolute;
          bottom: -15px;
          left: -10px;
          right: -10px;
          height: 15px;
          background: linear-gradient(180deg, 
            rgba(212, 200, 184, 1) 0%,
            rgba(196, 184, 168, 1) 100%);
          border-radius: 0 0 4px 4px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        /* Curtains */
        .curtain {
          position: absolute;
          top: -5%;
          width: 18%;
          height: 110%;
          background: linear-gradient(180deg,
            rgba(245, 240, 232, 0.95) 0%,
            rgba(235, 228, 218, 0.9) 50%,
            rgba(225, 218, 208, 0.85) 100%);
          box-shadow: 2px 0 15px rgba(0, 0, 0, 0.05);
        }

        .curtain-left {
          left: -12%;
          border-radius: 0 8px 0 0;
        }

        .curtain-right {
          right: -12%;
          border-radius: 8px 0 0 0;
          box-shadow: -2px 0 15px rgba(0, 0, 0, 0.05);
        }

        .curtain-fold {
          position: absolute;
          top: 0;
          width: 30%;
          height: 100%;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0, 0, 0, 0.03) 50%,
            transparent 100%);
        }

        .curtain-left .curtain-fold { right: 10%; }
        .curtain-right .curtain-fold { left: 10%; }

        /* Couch */
        .couch-container {
          position: absolute;
          bottom: 16%;
          left: 5%;
          width: 40%;
        }

        .couch {
          position: relative;
          height: 140px;
        }

        .couch-back {
          position: absolute;
          bottom: 45px;
          left: 0;
          width: 100%;
          height: 95px;
          background: linear-gradient(180deg, 
            rgba(232, 224, 212, 0.98) 0%,
            rgba(220, 212, 198, 0.95) 50%,
            rgba(208, 200, 186, 0.92) 100%);
          border-radius: 20px 20px 0 0;
          box-shadow: 
            inset 0 15px 40px rgba(255, 255, 255, 0.6),
            inset 0 -10px 30px rgba(0, 0, 0, 0.05),
            0 -5px 25px rgba(0, 0, 0, 0.05);
        }

        .couch-back-detail {
          position: absolute;
          top: 15px;
          left: 10%;
          right: 10%;
          height: 60%;
          background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 100%);
          border-radius: 12px 12px 0 0;
        }

        .couch-seat {
          position: absolute;
          bottom: 22px;
          left: 4%;
          width: 92%;
          height: 38px;
          background: linear-gradient(180deg, 
            rgba(240, 235, 225, 1) 0%,
            rgba(228, 220, 208, 1) 100%);
          border-radius: 12px;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.08),
            inset 0 5px 15px rgba(255, 255, 255, 0.7);
        }

        .couch-cushion {
          position: absolute;
          bottom: 50px;
          width: 28%;
          height: 55px;
          background: linear-gradient(145deg, 
            rgba(238, 232, 222, 1) 0%,
            rgba(226, 218, 206, 1) 100%);
          border-radius: 12px;
          box-shadow: 
            inset 0 5px 20px rgba(255, 255, 255, 0.6),
            inset 0 -5px 15px rgba(0, 0, 0, 0.03),
            3px 5px 15px rgba(0, 0, 0, 0.06);
        }

        .cushion-1 { left: 6%; }
        .cushion-2 { left: 36%; }
        .cushion-3 { left: 66%; }

        .cushion-line {
          position: absolute;
          top: 50%;
          left: 15%;
          right: 15%;
          height: 2px;
          background: rgba(0, 0, 0, 0.04);
          border-radius: 1px;
        }

        .couch-arm {
          position: absolute;
          bottom: 22px;
          width: 8%;
          height: 75px;
          background: linear-gradient(180deg, 
            rgba(228, 220, 208, 1) 0%,
            rgba(216, 208, 196, 1) 100%);
          box-shadow: 
            inset 0 5px 20px rgba(255, 255, 255, 0.5),
            0 5px 20px rgba(0, 0, 0, 0.06);
        }

        .arm-left { 
          left: 0; 
          border-radius: 15px 6px 6px 15px; 
        }
        
        .arm-right { 
          right: 0; 
          border-radius: 6px 15px 15px 6px; 
        }

        .couch-leg {
          position: absolute;
          bottom: 0;
          width: 6px;
          height: 22px;
          background: linear-gradient(180deg, 
            rgba(139, 115, 85, 1) 0%,
            rgba(107, 85, 65, 1) 100%);
          border-radius: 2px;
        }

        .leg-1 { left: 8%; }
        .leg-2 { left: 32%; }
        .leg-3 { right: 32%; }
        .leg-4 { right: 8%; }

        /* Throw Pillows */
        .throw-pillow {
          position: absolute;
          border-radius: 10px;
          box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
        }

        .pillow-sage {
          bottom: 75px;
          left: 10%;
          width: 50px;
          height: 42px;
          background: linear-gradient(145deg, 
            rgba(168, 181, 160, 1) 0%,
            rgba(148, 165, 140, 1) 100%);
          transform: rotate(-12deg);
        }

        .pillow-terracotta {
          bottom: 70px;
          right: 12%;
          width: 45px;
          height: 38px;
          background: linear-gradient(145deg, 
            rgba(196, 164, 132, 1) 0%,
            rgba(180, 148, 116, 1) 100%);
          transform: rotate(8deg);
        }

        .pillow-cream {
          bottom: 80px;
          left: 40%;
          width: 40px;
          height: 35px;
          background: linear-gradient(145deg, 
            rgba(245, 240, 230, 1) 0%,
            rgba(232, 225, 215, 1) 100%);
          transform: rotate(-5deg);
        }

        /* Side Table */
        .side-table {
          position: absolute;
          bottom: 14%;
          right: 30%;
        }

        .table-surface {
          width: 50px;
          height: 50px;
          background: linear-gradient(180deg, 
            rgba(180, 150, 115, 1) 0%,
            rgba(160, 130, 95, 1) 100%);
          border-radius: 50%;
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.12),
            inset 0 2px 8px rgba(255, 255, 255, 0.15);
        }

        .table-stem {
          width: 8px;
          height: 45px;
          background: linear-gradient(180deg, 
            rgba(160, 130, 95, 1) 0%,
            rgba(130, 100, 70, 1) 100%);
          margin: 0 auto;
          border-radius: 2px;
        }

        .table-base {
          width: 35px;
          height: 8px;
          background: linear-gradient(180deg, 
            rgba(140, 110, 80, 1) 0%,
            rgba(110, 85, 60, 1) 100%);
          margin: 0 auto;
          border-radius: 4px;
        }

        /* Lamp on side table */
        .lamp {
          position: absolute;
          bottom: 55px;
          left: 50%;
          transform: translateX(-50%);
        }

        .lamp-shade {
          width: 40px;
          height: 32px;
          background: linear-gradient(180deg, 
            rgba(252, 250, 248, 1) 0%,
            rgba(245, 240, 232, 1) 100%);
          border-radius: 6px 6px 16px 16px;
          box-shadow: 
            0 5px 20px rgba(0, 0, 0, 0.08),
            inset 0 -20px 35px rgba(255, 230, 180, 0.25);
        }

        .lamp-neck {
          width: 6px;
          height: 25px;
          background: linear-gradient(180deg, 
            rgba(180, 160, 130, 1) 0%,
            rgba(160, 140, 110, 1) 100%);
          margin: 0 auto;
        }

        .lamp-base {
          width: 25px;
          height: 8px;
          background: linear-gradient(180deg, 
            rgba(160, 140, 110, 1) 0%,
            rgba(130, 110, 85, 1) 100%);
          margin: 0 auto;
          border-radius: 3px;
        }

        /* Floor Plant */
        .floor-plant {
          position: absolute;
          bottom: 12%;
          right: 8%;
        }

        .plant-pot {
          width: 60px;
          height: 50px;
          background: linear-gradient(180deg, 
            rgba(180, 145, 110, 1) 0%,
            rgba(150, 115, 80, 1) 100%);
          border-radius: 6px 6px 15px 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .plant-pot-rim {
          position: absolute;
          top: -5px;
          left: -3px;
          right: -3px;
          height: 10px;
          background: linear-gradient(180deg, 
            rgba(190, 155, 120, 1) 0%,
            rgba(170, 135, 100, 1) 100%);
          border-radius: 4px;
        }

        .plant-leaves-container {
          position: absolute;
          bottom: 45px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 120px;
        }

        .plant-leaf {
          position: absolute;
          background: linear-gradient(180deg, 
            rgba(110, 150, 90, 0.95) 0%,
            rgba(90, 130, 70, 1) 100%);
          border-radius: 50% 50% 50% 50% / 80% 80% 20% 20%;
          transform-origin: bottom center;
          animation: leafSway 8s ease-in-out infinite;
        }

        .leaf-1 { 
          width: 22px; 
          height: 60px; 
          left: 40px; 
          bottom: 0; 
          transform: rotate(-12deg);
          --sway-amount: 3deg;
          animation-delay: 0s;
        }
        .leaf-2 { 
          width: 25px; 
          height: 70px; 
          left: 48px; 
          bottom: 0; 
          transform: rotate(5deg);
          --sway-amount: -2deg;
          animation-delay: -1.5s;
        }
        .leaf-3 { 
          width: 20px; 
          height: 55px; 
          left: 30px; 
          bottom: 5px; 
          transform: rotate(-22deg);
          --sway-amount: 4deg;
          animation-delay: -3s;
        }
        .leaf-4 { 
          width: 23px; 
          height: 65px; 
          left: 55px; 
          bottom: 3px; 
          transform: rotate(18deg);
          --sway-amount: -3deg;
          animation-delay: -4.5s;
        }
        .leaf-5 { 
          width: 18px; 
          height: 50px; 
          left: 25px; 
          bottom: 10px; 
          transform: rotate(-32deg);
          --sway-amount: 2deg;
          animation-delay: -6s;
        }
        .leaf-6 { 
          width: 20px; 
          height: 55px; 
          left: 60px; 
          bottom: 8px; 
          transform: rotate(28deg);
          --sway-amount: -2deg;
          animation-delay: -2s;
        }

        @keyframes leafSway {
          0%, 100% { transform: rotate(var(--base-rotate, 0deg)); }
          50% { transform: rotate(calc(var(--base-rotate, 0deg) + var(--sway-amount, 3deg))); }
        }

        .leaf-1 { --base-rotate: -12deg; }
        .leaf-2 { --base-rotate: 5deg; }
        .leaf-3 { --base-rotate: -22deg; }
        .leaf-4 { --base-rotate: 18deg; }
        .leaf-5 { --base-rotate: -32deg; }
        .leaf-6 { --base-rotate: 28deg; }

        /* Rug */
        .rug {
          position: absolute;
          bottom: 6%;
          left: 10%;
          width: 50%;
          height: 22%;
          background: 
            radial-gradient(ellipse at center, 
              rgba(168, 181, 160, 0.5) 0%, 
              rgba(168, 181, 160, 0.2) 50%,
              transparent 80%);
          border-radius: 50%;
          transform: perspective(600px) rotateX(65deg);
          transform-origin: bottom center;
        }

        .rug-pattern {
          position: absolute;
          top: 20%;
          left: 20%;
          right: 20%;
          bottom: 20%;
          border: 2px solid rgba(168, 181, 160, 0.3);
          border-radius: 50%;
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
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(45, 45, 45, 0.1);
          color: #2d2d2d;
          font-size: 0.85rem;
          cursor: pointer;
          z-index: 100;
          transition: all 0.3s ease;
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateX(-2px);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
        }

        .back-arrow {
          font-size: 1.1rem;
          transition: transform 0.3s ease;
        }

        .back-button:hover .back-arrow {
          transform: translateX(-3px);
        }

        /* Chat Container */
        .chat-container {
          position: relative;
          z-index: 50;
          height: 100vh;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          padding-top: calc(env(safe-area-inset-top, 0px) + 70px);
          padding-bottom: env(safe-area-inset-bottom, 0px);
          opacity: ${showChat ? 1 : 0};
          transform: translateY(${showChat ? '0' : '20px'});
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        /* VERA Presence Indicator */
        .vera-presence {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px;
          margin-bottom: 8px;
        }

        .vera-mini-orb {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, 
            rgba(200, 180, 240, 0.95) 0%, 
            rgba(150, 130, 200, 0.85) 50%, 
            rgba(120, 100, 180, 0.75) 100%);
          box-shadow: 0 0 25px rgba(139, 119, 183, 0.4);
          animation: miniBreathe 4s ease-in-out infinite;
        }

        @keyframes miniBreathe {
          0%, 100% { transform: scale(1); box-shadow: 0 0 25px rgba(139, 119, 183, 0.4); }
          50% { transform: scale(1.06); box-shadow: 0 0 35px rgba(139, 119, 183, 0.5); }
        }

        .vera-status {
          font-size: 0.9rem;
          color: #2d2d2d;
        }

        .vera-status-room {
          color: rgba(45, 45, 45, 0.5);
          font-size: 0.8rem;
        }

        /* Messages Area */
        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          -webkit-overflow-scrolling: touch;
        }

        .message {
          max-width: 85%;
          padding: 16px 20px;
          border-radius: 20px;
          font-size: 0.95rem;
          line-height: 1.6;
          animation: messageIn 0.3s ease;
        }

        @keyframes messageIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message-user {
          align-self: flex-end;
          background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
          color: #ffffff;
          border-bottom-right-radius: 6px;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.25);
        }

        .message-assistant {
          align-self: flex-start;
          background: rgba(255, 255, 255, 0.92);
          color: #2d2d2d;
          border: 1px solid rgba(45, 45, 45, 0.08);
          border-bottom-left-radius: 6px;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.04);
        }

        /* Typing Indicator */
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 18px 22px;
          background: rgba(255, 255, 255, 0.92);
          border-radius: 20px;
          border-bottom-left-radius: 6px;
          max-width: 85px;
          animation: messageIn 0.3s ease;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.04);
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(139, 119, 183, 0.6);
          animation: typingBounce 1.4s ease-in-out infinite;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
        }

        /* Empty State */
        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px;
        }

        .empty-orb {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, 
            rgba(200, 180, 240, 0.95) 0%, 
            rgba(150, 130, 200, 0.85) 50%, 
            rgba(120, 100, 180, 0.75) 100%);
          box-shadow: 0 0 50px rgba(139, 119, 183, 0.4);
          animation: miniBreathe 4s ease-in-out infinite;
          margin-bottom: 28px;
        }

        .empty-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.7rem;
          font-weight: 300;
          color: #2d2d2d;
          margin-bottom: 10px;
        }

        .empty-subtitle {
          font-size: 1rem;
          color: rgba(45, 45, 45, 0.6);
          margin-bottom: 36px;
        }

        /* Starter Prompts */
        .starter-prompts {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 340px;
        }

        .starter-btn {
          padding: 16px 22px;
          border-radius: 18px;
          border: 1px solid rgba(45, 45, 45, 0.1);
          background: rgba(255, 255, 255, 0.85);
          color: #2d2d2d;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          backdrop-filter: blur(8px);
        }

        .starter-btn:hover {
          background: rgba(139, 119, 183, 0.1);
          border-color: rgba(139, 119, 183, 0.3);
          transform: translateX(6px);
          box-shadow: 0 4px 20px rgba(139, 119, 183, 0.1);
        }

        /* Input Area */
        .input-area {
          padding: 16px 20px;
          padding-bottom: calc(16px + env(safe-area-inset-bottom, 0px));
          background: linear-gradient(180deg, transparent 0%, rgba(250, 248, 245, 0.98) 25%);
        }

        .input-container {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(45, 45, 45, 0.1);
          border-radius: 26px;
          padding: 8px 8px 8px 22px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.06);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .input-container:focus-within {
          border-color: rgba(139, 119, 183, 0.3);
          box-shadow: 0 5px 30px rgba(139, 119, 183, 0.1);
        }

        .input-field {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 0.95rem;
          color: #2d2d2d;
          resize: none;
          max-height: 120px;
          line-height: 1.5;
          padding: 10px 0;
          font-family: inherit;
        }

        .input-field::placeholder {
          color: rgba(45, 45, 45, 0.4);
        }

        .input-field:focus {
          outline: none;
        }

        .send-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%);
          color: #ffffff;
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }

        .send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 6px 25px rgba(139, 92, 246, 0.4);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .send-arrow {
          transform: rotate(-90deg);
        }

        @media (max-width: 768px) {
          .message {
            max-width: 90%;
          }

          .room-elements {
            opacity: ${isLoaded ? 0.2 : 0};
          }

          .couch-container,
          .side-table,
          .floor-plant {
            display: none;
          }

          .window-container {
            width: 35%;
            right: 3%;
          }
        }
      `}</style>

      <div className="therapy-room">
        {/* Ambient Lighting */}
        <div className="light-layer sunlight" />
        <div className="light-layer ambient-glow" />
        
        {/* Light Beams */}
        <div className="light-beams">
          <div className="beam beam-1" />
          <div className="beam beam-2" />
          <div className="beam beam-3" />
        </div>

        {/* Dust Particles */}
        <div className="dust-container">
          {dustParticles.map((p) => (
            <div
              key={p.id}
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

        {/* Room Elements */}
        <div className="room-elements">
          {/* Wall */}
          <div className="wall" />

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

          {/* Floor */}
          <div className="floor">
            <div className="floor-boards" />
          </div>

          {/* Rug */}
          <div className="rug">
            <div className="rug-pattern" />
          </div>

          {/* Couch */}
          <div className="couch-container">
            <div className="couch">
              <div className="couch-back">
                <div className="couch-back-detail" />
              </div>
              <div className="couch-cushion cushion-1">
                <div className="cushion-line" />
              </div>
              <div className="couch-cushion cushion-2">
                <div className="cushion-line" />
              </div>
              <div className="couch-cushion cushion-3">
                <div className="cushion-line" />
              </div>
              <div className="couch-seat" />
              <div className="couch-arm arm-left" />
              <div className="couch-arm arm-right" />
              <div className="couch-leg leg-1" />
              <div className="couch-leg leg-2" />
              <div className="couch-leg leg-3" />
              <div className="couch-leg leg-4" />
              <div className="throw-pillow pillow-sage" />
              <div className="throw-pillow pillow-terracotta" />
              <div className="throw-pillow pillow-cream" />
            </div>
          </div>

          {/* Side Table with Lamp */}
          <div className="side-table">
            <div className="lamp">
              <div className="lamp-shade" />
              <div className="lamp-neck" />
              <div className="lamp-base" />
            </div>
            <div className="table-surface" />
            <div className="table-stem" />
            <div className="table-base" />
          </div>

          {/* Floor Plant */}
          <div className="floor-plant">
            <div className="plant-leaves-container">
              <div className="plant-leaf leaf-1" />
              <div className="plant-leaf leaf-2" />
              <div className="plant-leaf leaf-3" />
              <div className="plant-leaf leaf-4" />
              <div className="plant-leaf leaf-5" />
              <div className="plant-leaf leaf-6" />
            </div>
            <div className="plant-pot">
              <div className="plant-pot-rim" />
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={onBack}>
          <span className="back-arrow">←</span>
          <span>Back to Sanctuary</span>
        </button>

        {/* Chat Container */}
        <div className="chat-container">
          {/* VERA Presence */}
          <div className="vera-presence">
            <div className="vera-mini-orb" />
            <div className="vera-status">
              VERA is here
              <span className="vera-status-room"> • Therapy Room</span>
            </div>
          </div>

          {/* Messages or Empty State */}
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-orb" />
              <h2 className="empty-title">Have a seat</h2>
              <div className="empty-subtitle">I'm here to listen. What's on your mind?</div>
              
              <div className="starter-prompts">
                {starterPrompts.map((prompt, i) => (
                  <button 
                    key={i}
                    className="starter-btn"
                    onClick={() => onSendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="messages-area">
              {messages.map((msg, i) => (
                <div key={i} className={`message message-${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              
              {isGenerating && (
                <div className="typing-indicator">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input Area */}
          <div className="input-area">
            <form onSubmit={handleSubmit} className="input-container">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share what's on your mind..."
                className="input-field"
                rows={1}
                disabled={isGenerating}
              />
              <button 
                type="submit" 
                className="send-btn"
                disabled={!inputValue.trim() || isGenerating}
              >
                <span className="send-arrow">➤</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}