'use client';

import { useState } from 'react';
import VeraSanctuary from '@/components/sanctuary/VeraSanctuary';
import TherapyRoom from '@/components/sanctuary/TherapyRoom';
import ZenRoom from '@/components/sanctuary/ZenRoom';
import LibraryRoom from '@/components/sanctuary/LibraryRoom';
import BedroomRoom from '@/components/sanctuary/BedroomRoom';
import StudioRoom from '@/components/sanctuary/StudioRoom';
import JournalRoom from '@/components/sanctuary/JournalRoom';

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

  if (currentRoom === 'therapy') {
    return (
      <TherapyRoom
        onBack={handleBack}
        onSendMessage={handleSendMessage}
        messages={messages}
        isGenerating={false}
      />
    );
  }

  if (currentRoom === 'zen') {
    return <ZenRoom onBack={handleBack} />;
  }

  if (currentRoom === 'library') {
    return <LibraryRoom onBack={handleBack} />;
  }

  if (currentRoom === 'bedroom') {
    return <BedroomRoom onBack={handleBack} />;
  }

  if (currentRoom === 'studio') {
    return <StudioRoom onBack={handleBack} onLaunchVDS={handleLaunchVDS} savedProjects={savedProjects} />;
  }

  if (currentRoom === 'journal') {
    return <JournalRoom onBack={handleBack} onSaveEntry={handleSaveJournalEntry} savedEntries={journalEntries} />;
  }

  return (
    <VeraSanctuary onRoomSelect={handleRoomSelect} />
  );
}
