'use client';

import { useState, useEffect, useRef } from 'react';

interface JournalRoomProps {
  onBack: () => void;
  onSaveEntry?: (entry: { title: string; content: string; mood?: string; date: string }) => void;
  savedEntries?: Array<{
    id: string;
    title: string;
    preview: string;
    date: string;
    mood?: string;
  }>;
}

const PROMPTS = [
  "What's weighing on your mind right now?",
  "Describe a moment today that made you feel something.",
  "What would you tell your younger self?",
  "What are you grateful for in this moment?",
  "What's something you need to let go of?",
  "How does your body feel right now?",
  "What would make tomorrow better than today?",
  "Write a letter to someone you can't talk to.",
];

const MOODS = [
  { id: 'calm', label: 'Calm', color: '#6EE7B7' },
  { id: 'anxious', label: 'Anxious', color: '#FCD34D' },
  { id: 'sad', label: 'Sad', color: '#93C5FD' },
  { id: 'grateful', label: 'Grateful', color: '#C4B5FD' },
  { id: 'hopeful', label: 'Hopeful', color: '#FDA4AF' },
  { id: 'tired', label: 'Tired', color: '#D1D5DB' },
];

export default function JournalRoom({ onBack, onSaveEntry, savedEntries = [] }: JournalRoomProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'entries'>('write');
  const [journalContent, setJournalContent] = useState('');
  const [journalTitle, setJournalTitle] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; size: number; duration: number; delay: number }>>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Floating dust particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 8,
    }));
    setParticles(newParticles);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleNewPrompt = () => {
    setCurrentPrompt((prev) => (prev + 1) % PROMPTS.length);
  };

  const handleUsePrompt = () => {
    if (journalContent) {
      setJournalContent(journalContent + '\n\n' + PROMPTS[currentPrompt] + '\n');
    } else {
      setJournalContent(PROMPTS[currentPrompt] + '\n\n');
    }
    textareaRef.current?.focus();
  };

  const handleSave = async () => {
    if (!journalContent.trim()) return;
    
    setIsSaving(true);
    
    const entry = {
      title: journalTitle || new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      content: journalContent,
      mood: selectedMood || undefined,
      date: new Date().toISOString(),
    };

    if (onSaveEntry) {
      await onSaveEntry(entry);
    }

    setIsSaving(false);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
    
    // Clear for new entry
    setJournalContent('');
    setJournalTitle('');
    setSelectedMood(null);
  };

  const wordCount = journalContent.trim() ? journalContent.trim().split(/\s+/).length : 0;

  return (
    <>
      <style jsx>{`
        .journal-room {
          min-height: 100vh;
          min-height: 100dvh;
          background: linear-gradient(180deg, #1a1815 0%, #242018 30%, #2a251d 60%, #1f1c17 100%);
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
            radial-gradient(ellipse 50% 50% at 25% 75%, rgba(255, 180, 100, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(255, 150, 80, 0.08) 0%, transparent 40%);
          animation: candleFlicker 4s ease-in-out infinite;
        }

        @keyframes candleFlicker {
          0%, 100% { opacity: 0.9; }
          25% { opacity: 1; }
          50% { opacity: 0.85; }
          75% { opacity: 0.95; }
        }

        .moonlight {
          background: radial-gradient(ellipse 60% 50% at 85% 15%, rgba(180, 190, 220, 0.08) 0%, transparent 50%);
        }

        /* Dust Particles */
        .dust {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 240, 220, 0.6);
          box-shadow: 0 0 6px rgba(255, 240, 220, 0.3);
          animation: dustFloat linear infinite;
        }

        @keyframes dustFloat {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
            transform: translateY(80vh) scale(1);
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-10vh) scale(0.5);
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
            rgba(40, 35, 28, 0.95) 0%,
            rgba(32, 28, 22, 1) 50%,
            rgba(26, 23, 18, 1) 100%);
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
            transparent 80px,
            rgba(0, 0, 0, 0.1) 80px,
            rgba(0, 0, 0, 0.1) 82px);
        }

        /* Writing Desk */
        .desk-container {
          position: absolute;
          bottom: 12%;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
        }

        .desk-top {
          width: 100%;
          height: 15px;
          background: linear-gradient(180deg,
            rgba(90, 70, 50, 1) 0%,
            rgba(75, 58, 42, 1) 100%);
          border-radius: 4px 4px 0 0;
          box-shadow:
            0 -3px 15px rgba(0, 0, 0, 0.2),
            0 8px 30px rgba(0, 0, 0, 0.3),
            inset 0 2px 5px rgba(120, 100, 80, 0.2);
        }

        .desk-front {
          width: 100%;
          height: 60px;
          background: linear-gradient(180deg,
            rgba(80, 62, 45, 1) 0%,
            rgba(65, 50, 38, 1) 100%);
          border-radius: 0 0 4px 4px;
        }

        .desk-drawer {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 35px;
          background: linear-gradient(180deg,
            rgba(90, 72, 55, 0.7) 0%,
            rgba(75, 58, 45, 0.6) 100%);
          border-radius: 3px;
          box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .drawer-handle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 6px;
          background: rgba(140, 120, 95, 0.8);
          border-radius: 3px;
        }

        .desk-leg {
          position: absolute;
          bottom: -50px;
          width: 12px;
          height: 50px;
          background: linear-gradient(180deg,
            rgba(70, 55, 40, 1) 0%,
            rgba(55, 42, 32, 1) 100%);
          border-radius: 2px;
        }

        .desk-leg-left { left: 20px; }
        .desk-leg-right { right: 20px; }

        /* Items on desk */
        .desk-items {
          position: absolute;
          bottom: 18px;
          left: 0;
          right: 0;
        }

        /* Open Journal */
        .journal-book {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 140px;
          height: 100px;
          perspective: 500px;
        }

        .journal-page-left {
          position: absolute;
          left: 0;
          top: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg,
            rgba(255, 252, 245, 0.95) 0%,
            rgba(250, 248, 240, 0.98) 100%);
          border-radius: 3px 0 0 3px;
          box-shadow: 
            inset 5px 0 15px rgba(0, 0, 0, 0.05),
            -2px 0 8px rgba(0, 0, 0, 0.1);
          transform: rotateY(5deg);
          transform-origin: right center;
        }

        .journal-page-right {
          position: absolute;
          right: 0;
          top: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg,
            rgba(250, 248, 240, 0.98) 0%,
            rgba(255, 252, 245, 0.95) 100%);
          border-radius: 0 3px 3px 0;
          box-shadow: 
            inset -5px 0 15px rgba(0, 0, 0, 0.05),
            2px 0 8px rgba(0, 0, 0, 0.1);
          transform: rotateY(-5deg);
          transform-origin: left center;
        }

        .page-lines {
          position: absolute;
          top: 15%;
          left: 10%;
          right: 10%;
          bottom: 15%;
        }

        .page-line {
          height: 1px;
          background: rgba(180, 170, 155, 0.3);
          margin-bottom: 8px;
        }

        .journal-spine {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -2px;
          bottom: -2px;
          width: 8px;
          background: linear-gradient(90deg,
            rgba(100, 75, 55, 0.9) 0%,
            rgba(120, 90, 65, 1) 50%,
            rgba(100, 75, 55, 0.9) 100%);
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }

        /* Ink Pot */
        .ink-pot {
          position: absolute;
          bottom: 5px;
          right: 25px;
          width: 22px;
          height: 28px;
          background: linear-gradient(180deg,
            rgba(25, 25, 35, 1) 0%,
            rgba(15, 15, 22, 1) 100%);
          border-radius: 4px 4px 6px 6px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .ink-pot-neck {
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 14px;
          height: 6px;
          background: linear-gradient(180deg,
            rgba(35, 35, 45, 1) 0%,
            rgba(25, 25, 35, 1) 100%);
          border-radius: 2px 2px 0 0;
        }

        .ink-shine {
          position: absolute;
          top: 8px;
          left: 4px;
          width: 6px;
          height: 10px;
          background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.15) 0%,
            transparent 100%);
          border-radius: 2px;
        }

        /* Quill */
        .quill {
          position: absolute;
          bottom: 20px;
          right: 15px;
          width: 50px;
          height: 8px;
          transform: rotate(-35deg);
        }

        .quill-feather {
          position: absolute;
          right: 0;
          width: 35px;
          height: 100%;
          background: linear-gradient(180deg,
            rgba(245, 240, 230, 0.95) 0%,
            rgba(220, 210, 195, 0.9) 50%,
            rgba(200, 190, 175, 0.85) 100%);
          border-radius: 0 50% 50% 0;
          clip-path: polygon(0 50%, 100% 0, 100% 100%);
        }

        .quill-shaft {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 3px;
          background: linear-gradient(90deg,
            rgba(60, 50, 40, 1) 0%,
            rgba(80, 65, 50, 1) 100%);
          border-radius: 1px;
        }

        .quill-tip {
          position: absolute;
          left: -5px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 2px;
          background: linear-gradient(90deg,
            rgba(40, 35, 30, 1) 0%,
            rgba(60, 50, 40, 1) 100%);
          clip-path: polygon(0 50%, 100% 0, 100% 100%);
        }

        /* Candle */
        .candle-container {
          position: absolute;
          bottom: 0;
          left: 20px;
        }

        .candle-holder {
          width: 35px;
          height: 12px;
          background: linear-gradient(180deg,
            rgba(160, 140, 110, 1) 0%,
            rgba(130, 110, 85, 1) 100%);
          border-radius: 4px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
        }

        .candle {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 14px;
          height: 40px;
          background: linear-gradient(180deg,
            rgba(255, 252, 245, 0.95) 0%,
            rgba(245, 238, 225, 0.9) 100%);
          border-radius: 2px 2px 4px 4px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
        }

        .candle-drip {
          position: absolute;
          top: 5px;
          width: 5px;
          height: 12px;
          background: linear-gradient(180deg,
            rgba(255, 252, 245, 0.95) 0%,
            rgba(245, 238, 225, 0.9) 100%);
          border-radius: 0 0 3px 3px;
        }

        .drip-1 { left: 2px; height: 10px; }
        .drip-2 { right: 2px; height: 15px; }

        .wick {
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 6px;
          background: #2d2d2d;
          border-radius: 1px;
        }

        .flame-container {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 25px;
          height: 30px;
        }

        .flame {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 20px;
          background: radial-gradient(ellipse at bottom,
            rgba(255, 255, 230, 1) 0%,
            rgba(255, 220, 120, 0.95) 20%,
            rgba(255, 180, 80, 0.8) 40%,
            rgba(255, 130, 50, 0.5) 60%,
            transparent 100%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          animation: flameFlicker 0.4s ease-in-out infinite alternate;
        }

        .flame-inner {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 10px;
          background: radial-gradient(ellipse at bottom,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 200, 0.8) 50%,
            transparent 100%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        }

        @keyframes flameFlicker {
          0% { transform: translateX(-50%) scaleY(1) rotate(-1deg); }
          100% { transform: translateX(-50%) scaleY(1.08) rotate(1deg); }
        }

        .candle-glow {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 80px;
          background: radial-gradient(ellipse,
            rgba(255, 180, 100, 0.2) 0%,
            rgba(255, 150, 80, 0.1) 40%,
            transparent 70%);
          animation: glowPulse 3s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.8; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
        }

        /* Window */
        .window-container {
          position: absolute;
          top: 8%;
          right: 8%;
          width: 18%;
          height: 40%;
        }

        .window {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg,
            rgba(15, 20, 40, 0.9) 0%,
            rgba(20, 28, 50, 0.85) 50%,
            rgba(15, 20, 40, 0.9) 100%);
          border: 4px solid rgba(70, 55, 40, 0.9);
          border-radius: 4px;
          box-shadow:
            inset 0 0 40px rgba(100, 120, 180, 0.08),
            0 0 25px rgba(0, 0, 0, 0.4);
        }

        .window-frame-v {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background: rgba(70, 55, 40, 0.9);
        }

        .window-frame-h {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 4px;
          background: rgba(70, 55, 40, 0.9);
        }

        .moon-small {
          position: absolute;
          top: 20%;
          right: 25%;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%,
            rgba(240, 240, 255, 0.95) 0%,
            rgba(200, 205, 220, 0.9) 100%);
          box-shadow: 0 0 20px rgba(200, 210, 255, 0.4);
        }

        /* Bookshelf */
        .bookshelf {
          position: absolute;
          left: 0;
          top: 10%;
          width: 8%;
          height: 55%;
          background: linear-gradient(90deg,
            rgba(60, 48, 35, 0.95) 0%,
            rgba(70, 55, 40, 0.9) 100%);
          border-radius: 0 4px 4px 0;
          box-shadow: 3px 0 15px rgba(0, 0, 0, 0.3);
        }

        .shelf {
          position: absolute;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(180deg,
            rgba(80, 65, 48, 1) 0%,
            rgba(65, 52, 38, 1) 100%);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
        }

        .books-row {
          position: absolute;
          bottom: 5px;
          left: 5px;
          right: 5px;
          display: flex;
          gap: 2px;
          align-items: flex-end;
        }

        .book {
          border-radius: 1px 1px 0 0;
        }

        /* Chair */
        .chair-container {
          position: absolute;
          bottom: 5%;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 90px;
        }

        .chair-back {
          position: absolute;
          bottom: 40px;
          left: 15px;
          width: 70px;
          height: 50px;
          background: linear-gradient(180deg,
            rgba(85, 65, 50, 0.95) 0%,
            rgba(70, 55, 42, 0.9) 100%);
          border-radius: 8px 8px 0 0;
          box-shadow:
            inset 0 5px 15px rgba(110, 90, 70, 0.2),
            0 -3px 10px rgba(0, 0, 0, 0.15);
        }

        .chair-seat {
          position: absolute;
          bottom: 25px;
          left: 10px;
          width: 80px;
          height: 20px;
          background: linear-gradient(180deg,
            rgba(90, 72, 55, 1) 0%,
            rgba(75, 60, 45, 1) 100%);
          border-radius: 5px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .chair-leg {
          position: absolute;
          bottom: 0;
          width: 8px;
          height: 25px;
          background: linear-gradient(180deg,
            rgba(70, 55, 42, 1) 0%,
            rgba(55, 42, 32, 1) 100%);
          border-radius: 2px;
        }

        .chair-leg-1 { left: 18px; }
        .chair-leg-2 { right: 18px; }

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
          color: rgba(255, 250, 240, 0.95);
          margin-bottom: 8px;
          letter-spacing: 0.02em;
        }

        .subtitle {
          font-size: 0.95rem;
          color: rgba(255, 250, 240, 0.5);
        }

        /* Tabs */
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
        }

        .tab {
          padding: 12px 28px;
          border-radius: 50px;
          border: 1px solid rgba(255, 250, 240, 0.12);
          background: transparent;
          color: rgba(255, 250, 240, 0.6);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab:hover {
          border-color: rgba(255, 200, 150, 0.4);
          color: rgba(255, 250, 240, 0.9);
        }

        .tab.active {
          background: rgba(255, 200, 150, 0.15);
          border-color: rgba(255, 200, 150, 0.4);
          color: rgba(255, 250, 240, 0.95);
        }

        /* Writing Area */
        .writing-container {
          width: 100%;
          max-width: 600px;
        }

        /* Prompt Card */
        .prompt-card {
          background: rgba(255, 250, 240, 0.05);
          border: 1px solid rgba(255, 250, 240, 0.1);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
          text-align: center;
        }

        .prompt-label {
          font-size: 0.75rem;
          color: rgba(255, 200, 150, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
        }

        .prompt-text {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.2rem;
          font-style: italic;
          color: rgba(255, 250, 240, 0.85);
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .prompt-actions {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .prompt-btn {
          padding: 10px 20px;
          border-radius: 50px;
          border: 1px solid rgba(255, 250, 240, 0.15);
          background: transparent;
          color: rgba(255, 250, 240, 0.6);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .prompt-btn:hover {
          background: rgba(255, 250, 240, 0.08);
          color: rgba(255, 250, 240, 0.9);
        }

        .prompt-btn-use {
          background: rgba(255, 200, 150, 0.15);
          border-color: rgba(255, 200, 150, 0.3);
          color: rgba(255, 220, 180, 0.9);
        }

        .prompt-btn-use:hover {
          background: rgba(255, 200, 150, 0.25);
        }

        /* Title Input */
        .title-input {
          width: 100%;
          padding: 14px 20px;
          border-radius: 12px;
          border: 1px solid rgba(255, 250, 240, 0.1);
          background: rgba(255, 250, 240, 0.03);
          color: rgba(255, 250, 240, 0.9);
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem;
          margin-bottom: 12px;
          transition: all 0.3s ease;
        }

        .title-input::placeholder {
          color: rgba(255, 250, 240, 0.3);
        }

        .title-input:focus {
          outline: none;
          border-color: rgba(255, 200, 150, 0.3);
          background: rgba(255, 250, 240, 0.05);
        }

        /* Journal Textarea */
        .journal-textarea {
          width: 100%;
          min-height: 280px;
          padding: 20px;
          border-radius: 16px;
          border: 1px solid rgba(255, 250, 240, 0.1);
          background: rgba(255, 250, 240, 0.03);
          color: rgba(255, 250, 240, 0.9);
          font-family: 'Georgia', serif;
          font-size: 1rem;
          line-height: 1.8;
          resize: vertical;
          transition: all 0.3s ease;
        }

        .journal-textarea::placeholder {
          color: rgba(255, 250, 240, 0.3);
          font-style: italic;
        }

        .journal-textarea:focus {
          outline: none;
          border-color: rgba(255, 200, 150, 0.3);
          background: rgba(255, 250, 240, 0.05);
          box-shadow: 0 0 40px rgba(255, 180, 100, 0.08);
        }

        /* Mood Selector */
        .mood-section {
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .mood-label {
          font-size: 0.85rem;
          color: rgba(255, 250, 240, 0.5);
          margin-bottom: 12px;
        }

        .mood-options {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .mood-btn {
          padding: 10px 18px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mood-btn:hover {
          border-color: rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.05);
        }

        .mood-btn.selected {
          border-color: var(--mood-color);
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.95);
        }

        .mood-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--mood-color);
        }

        /* Footer */
        .writing-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
        }

        .word-count {
          font-size: 0.85rem;
          color: rgba(255, 250, 240, 0.4);
        }

        .save-btn {
          padding: 14px 36px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, rgba(255, 200, 150, 0.9) 0%, rgba(255, 170, 120, 0.85) 100%);
          color: rgba(30, 25, 20, 0.95);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 25px rgba(255, 180, 120, 0.25);
        }

        .save-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 35px rgba(255, 180, 120, 0.35);
        }

        .save-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .save-btn.saving {
          pointer-events: none;
        }

        .saved-indicator {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 20px 40px;
          background: rgba(30, 25, 20, 0.95);
          border: 1px solid rgba(255, 200, 150, 0.3);
          border-radius: 16px;
          color: rgba(255, 250, 240, 0.95);
          font-size: 1.1rem;
          box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
          z-index: 200;
          animation: savedPop 0.3s ease;
        }

        @keyframes savedPop {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }

        /* Entries List */
        .entries-container {
          width: 100%;
          max-width: 600px;
        }

        .entries-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .entry-card {
          background: rgba(255, 250, 240, 0.04);
          border: 1px solid rgba(255, 250, 240, 0.08);
          border-radius: 16px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .entry-card:hover {
          background: rgba(255, 250, 240, 0.06);
          border-color: rgba(255, 200, 150, 0.2);
          transform: translateX(5px);
        }

        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }

        .entry-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.15rem;
          color: rgba(255, 250, 240, 0.9);
        }

        .entry-date {
          font-size: 0.8rem;
          color: rgba(255, 250, 240, 0.4);
        }

        .entry-preview {
          font-size: 0.9rem;
          color: rgba(255, 250, 240, 0.5);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .entry-mood {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          padding: 6px 12px;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.05);
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .empty-entries {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255, 250, 240, 0.4);
        }

        .empty-icon {
          width: 60px;
          height: 70px;
          margin: 0 auto 20px;
          position: relative;
        }

        .empty-book {
          width: 50px;
          height: 60px;
          background: rgba(255, 250, 240, 0.1);
          border-radius: 2px 4px 4px 2px;
          margin: 0 auto;
        }

        .empty-book-spine {
          position: absolute;
          left: 5px;
          top: 5px;
          bottom: 5px;
          width: 6px;
          background: rgba(255, 200, 150, 0.2);
          border-radius: 2px 0 0 2px;
        }

        /* VERA Orb */
        .vera-presence {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 50;
        }

        .vera-orb {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%,
            rgba(200, 180, 240, 0.85) 0%,
            rgba(150, 130, 200, 0.65) 50%,
            rgba(120, 100, 180, 0.45) 100%);
          box-shadow: 0 0 35px rgba(139, 119, 183, 0.35);
          animation: orbBreathe 5s ease-in-out infinite;
          cursor: pointer;
        }

        @keyframes orbBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @media (max-width: 768px) {
          .desk-container {
            width: 220px;
          }

          .bookshelf {
            display: none;
          }

          .window-container {
            width: 25%;
            right: 5%;
          }

          .chair-container {
            display: none;
          }

          .journal-textarea {
            min-height: 220px;
          }
        }
      `}</style>

      <div className="journal-room">
        {/* Ambient Layers */}
        <div className="ambient-layer warm-glow" />
        <div className="ambient-layer moonlight" />

        {/* Dust Particles */}
        {particles.map((p) => (
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

        {/* Floor */}
        <div className="floor">
          <div className="floor-boards" />
        </div>

        {/* Bookshelf */}
        <div className="bookshelf">
          <div className="shelf" style={{ top: '18%' }}>
            <div className="books-row">
              <div className="book" style={{ width: '8px', height: '25px', background: '#654321' }} />
              <div className="book" style={{ width: '10px', height: '30px', background: '#8b4513' }} />
              <div className="book" style={{ width: '7px', height: '22px', background: '#2f4f4f' }} />
            </div>
          </div>
          <div className="shelf" style={{ top: '42%' }}>
            <div className="books-row">
              <div className="book" style={{ width: '9px', height: '27px', background: '#800020' }} />
              <div className="book" style={{ width: '8px', height: '24px', background: '#483d8b' }} />
              <div className="book" style={{ width: '10px', height: '28px', background: '#5c4033' }} />
            </div>
          </div>
          <div className="shelf" style={{ top: '66%' }}>
            <div className="books-row">
              <div className="book" style={{ width: '8px', height: '26px', background: '#704214' }} />
              <div className="book" style={{ width: '9px', height: '23px', background: '#4a3728' }} />
            </div>
          </div>
          <div className="shelf" style={{ top: '90%' }} />
        </div>

        {/* Window */}
        <div className="window-container">
          <div className="window">
            <div className="window-frame-v" />
            <div className="window-frame-h" />
            <div className="moon-small" />
          </div>
        </div>

        {/* Writing Desk */}
        <div className="desk-container">
          <div className="desk-items">
            {/* Candle */}
            <div className="candle-container">
              <div className="candle-glow" />
              <div className="candle">
                <div className="candle-drip drip-1" />
                <div className="candle-drip drip-2" />
                <div className="wick" />
                <div className="flame-container">
                  <div className="flame" />
                  <div className="flame-inner" />
                </div>
              </div>
              <div className="candle-holder" />
            </div>

            {/* Open Journal */}
            <div className="journal-book">
              <div className="journal-page-left">
                <div className="page-lines">
                  <div className="page-line" />
                  <div className="page-line" />
                  <div className="page-line" />
                  <div className="page-line" />
                  <div className="page-line" />
                </div>
              </div>
              <div className="journal-page-right">
                <div className="page-lines">
                  <div className="page-line" />
                  <div className="page-line" />
                  <div className="page-line" />
                  <div className="page-line" />
                  <div className="page-line" />
                </div>
              </div>
              <div className="journal-spine" />
            </div>

            {/* Ink Pot */}
            <div className="ink-pot">
              <div className="ink-pot-neck" />
              <div className="ink-shine" />
            </div>

            {/* Quill */}
            <div className="quill">
              <div className="quill-tip" />
              <div className="quill-shaft" />
              <div className="quill-feather" />
            </div>
          </div>

          <div className="desk-top" />
          <div className="desk-front">
            <div className="desk-drawer">
              <div className="drawer-handle" />
            </div>
          </div>
          <div className="desk-leg desk-leg-left" />
          <div className="desk-leg desk-leg-right" />
        </div>

        {/* Chair */}
        <div className="chair-container">
          <div className="chair-back" />
          <div className="chair-seat" />
          <div className="chair-leg chair-leg-1" />
          <div className="chair-leg chair-leg-2" />
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={onBack}>
          <span>←</span>
          <span>Back</span>
        </button>

        {/* Content */}
        <div className="content">
          <div className="header">
            <h1 className="title">Journal Nook</h1>
            <div className="subtitle">A quiet space for reflection</div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'write' ? 'active' : ''}`}
              onClick={() => setActiveTab('write')}
            >
              Write
            </button>
            <button
              className={`tab ${activeTab === 'entries' ? 'active' : ''}`}
              onClick={() => setActiveTab('entries')}
            >
              Past Entries
            </button>
          </div>

          {/* Writing Tab */}
          {activeTab === 'write' && (
            <div className="writing-container">
              {/* Prompt Card */}
              <div className="prompt-card">
                <div className="prompt-label">Writing Prompt</div>
                <div className="prompt-text">"{PROMPTS[currentPrompt]}"</div>
                <div className="prompt-actions">
                  <button className="prompt-btn" onClick={handleNewPrompt}>
                    Different prompt
                  </button>
                  <button className="prompt-btn prompt-btn-use" onClick={handleUsePrompt}>
                    Use this
                  </button>
                </div>
              </div>

              {/* Title */}
              <input
                type="text"
                className="title-input"
                placeholder="Give this entry a title..."
                value={journalTitle}
                onChange={(e) => setJournalTitle(e.target.value)}
              />

              {/* Journal Text */}
              <textarea
                ref={textareaRef}
                className="journal-textarea"
                placeholder="Begin writing... let your thoughts flow freely."
                value={journalContent}
                onChange={(e) => setJournalContent(e.target.value)}
              />

              {/* Mood Selector */}
              <div className="mood-section">
                <div className="mood-label">How are you feeling?</div>
                <div className="mood-options">
                  {MOODS.map((mood) => (
                    <button
                      key={mood.id}
                      className={`mood-btn ${selectedMood === mood.id ? 'selected' : ''}`}
                      style={{ '--mood-color': mood.color } as React.CSSProperties}
                      onClick={() => setSelectedMood(selectedMood === mood.id ? null : mood.id)}
                    >
                      <span className="mood-dot" style={{ background: mood.color }} />
                      {mood.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="writing-footer">
                <span className="word-count">{wordCount} words</span>
                <button
                  className={`save-btn ${isSaving ? 'saving' : ''}`}
                  onClick={handleSave}
                  disabled={!journalContent.trim() || isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Entry'}
                </button>
              </div>
            </div>
          )}

          {/* Entries Tab */}
          {activeTab === 'entries' && (
            <div className="entries-container">
              {savedEntries.length > 0 ? (
                <div className="entries-list">
                  {savedEntries.map((entry) => (
                    <div key={entry.id} className="entry-card">
                      <div className="entry-header">
                        <div className="entry-title">{entry.title}</div>
                        <div className="entry-date">{entry.date}</div>
                      </div>
                      <div className="entry-preview">{entry.preview}</div>
                      {entry.mood && (
                        <div className="entry-mood">
                          <span
                            className="mood-dot"
                            style={{ background: MOODS.find(m => m.id === entry.mood)?.color }}
                          />
                          {MOODS.find(m => m.id === entry.mood)?.label}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-entries">
                  <div className="empty-icon">
                    <div className="empty-book">
                      <div className="empty-book-spine" />
                    </div>
                  </div>
                  <div>No entries yet</div>
                  <div style={{ marginTop: '8px', fontSize: '0.85rem' }}>
                    Start writing to fill these pages
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Saved Indicator */}
        {showSaved && (
          <div className="saved-indicator">
            Entry saved
          </div>
        )}

        {/* VERA Presence */}
        <div className="vera-presence">
          <div className="vera-orb" />
        </div>
      </div>
    </>
  );
}