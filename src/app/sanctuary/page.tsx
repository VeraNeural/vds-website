'use client';

import { useState } from 'react';
import { AnimatePresence, motion, cubicBezier } from 'framer-motion';
import VeraSanctuary from '@/components/sanctuary/VeraSanctuary';
import TherapyRoom from '@/components/sanctuary/TherapyRoom';
import ZenRoom from '@/components/sanctuary/ZenRoom';
import LibraryRoom from '@/components/sanctuary/LibraryRoom';
import BedroomRoom from '@/components/sanctuary/BedroomRoom';
import StudioRoom from '@/components/sanctuary/StudioRoom';
import JournalRoom from '@/components/sanctuary/JournalRoom';
import Pulse from '@/components/sanctuary/Pulse';

export default function SanctuaryPage() {
  const [currentRoom, setCurrentRoom] = useState<string>('lobby');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [journalEntries, setJournalEntries] = useState<
    Array<{ id: string; title: string; preview: string; date: string; mood?: string }>
  >([]);
  const [savedProjects] = useState<
    Array<{ id: string; name: string; thumbnail?: string; lastEdited: string }>
  >([]);

  const handleBack = () => setCurrentRoom('lobby');
  const handleRoomSelect = (room: string) => setCurrentRoom(room);

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
  };

  const handleSaveJournalEntry = (entry: { title: string; content: string; mood?: string; date: string }) => {
    setJournalEntries(prev => [
      ...prev,
      {
        id: `${Date.now()}`,
        title: entry.title,
        preview: entry.content.trim().slice(0, 120),
        date: entry.date,
        mood: entry.mood,
      },
    ]);
  };

  const handleLaunchVDS = () => {
    window.location.href = '/vds';
  };

  const motionConfig = {
    initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -15, filter: 'blur(4px)' },
    transition: { duration: 0.4, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
  };

  const divStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute' as const,
    top: 0,
    left: 0,
  };

  return (
    <AnimatePresence mode="wait">
      {currentRoom === 'therapy' && (
        <motion.div
          key="therapy"
          style={divStyle}
          {...motionConfig}
        >
          <TherapyRoom
            onBack={handleBack}
            onSendMessage={handleSendMessage}
            messages={messages}
            isGenerating={false}
          />
        </motion.div>
      )}

      {currentRoom === 'zen' && (
        <motion.div
          key="zen"
          style={divStyle}
          {...motionConfig}
        >
          <ZenRoom onBack={handleBack} />
        </motion.div>
      )}

      {currentRoom === 'library' && (
        <motion.div
          key="library"
          style={divStyle}
          {...motionConfig}
        >
          <LibraryRoom onBack={handleBack} />
        </motion.div>
      )}

      {currentRoom === 'bedroom' && (
        <motion.div
          key="bedroom"
          style={divStyle}
          {...motionConfig}
        >
          <BedroomRoom onBack={handleBack} />
        </motion.div>
      )}

      {currentRoom === 'studio' && (
        <motion.div
          key="studio"
          style={divStyle}
          {...motionConfig}
        >
          <StudioRoom onBack={handleBack} onLaunchVDS={handleLaunchVDS} savedProjects={savedProjects} />
        </motion.div>
      )}

      {currentRoom === 'journal' && (
        <motion.div
          key="journal"
          style={divStyle}
          {...motionConfig}
        >
          <JournalRoom onBack={handleBack} onSaveEntry={handleSaveJournalEntry} savedEntries={journalEntries} />
        </motion.div>
      )}

      {currentRoom === 'pulse' && (
        <motion.div
          key="pulse"
          style={divStyle}
          {...motionConfig}
        >
          <Pulse onBack={handleBack} />
        </motion.div>
      )}

      {currentRoom === 'lobby' && (
        <motion.div
          key="lobby"
          style={divStyle}
          {...motionConfig}
        >
          <VeraSanctuary onRoomSelect={handleRoomSelect} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
