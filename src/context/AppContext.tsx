import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Conversation, Tutor, UpcomingLesson } from '../types';
import { mockTutors } from '../data/mockData';

interface AppContextType {
  tutors: Tutor[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  upcomingLessons: UpcomingLesson[];
  addLesson: (lesson: UpcomingLesson) => void;
  updateTutorAvailability: (tutorId: string, availability: Record<string, string[]>) => void;
  updateTutorProfile: (tutorId: string, profile: Partial<Tutor>) => void;
  favoriteTutors: string[];
  toggleFavorite: (tutorId: string) => void;
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string, senderId: 'student' | 'tutor') => void;
  createOrGetConversation: (tutorId: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tutors, setTutors] = useState<Tutor[]>(mockTutors);
  const [searchQuery, setSearchQuery] = useState('');
  const [upcomingLessons, setUpcomingLessons] = useState<UpcomingLesson[]>([]);
  const [favoriteTutors, setFavoriteTutors] = useState<string[]>(['tutor-2', 'tutor-3']);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv-1',
      tutorId: 'tutor-2',
      tutorName: 'Emily Chen',
      avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Emily',
      unread: 1,
      messages: [
        { id: '1', text: 'Hi! I saw you booked a trial.', timestamp: '10:00 AM', senderId: 'tutor' },
        { id: '2', text: 'What specific topics do you want to cover?', timestamp: '10:05 AM', senderId: 'tutor' }
      ]
    }
  ]);

  const toggleFavorite = (tutorId: string) => {
    setFavoriteTutors(prev => 
      prev.includes(tutorId) ? prev.filter(id => id !== tutorId) : [...prev, tutorId]
    );
  };

  const addLesson = (lesson: UpcomingLesson) => {
    setUpcomingLessons(prev => [...prev, lesson]);
  };

  const updateTutorAvailability = (tutorId: string, availability: Record<string, string[]>) => {
    setTutors(prev => prev.map(t => t.id === tutorId ? { ...t, availability } : t));
  };

  const updateTutorProfile = (tutorId: string, profile: Partial<Tutor>) => {
    setTutors(prev => prev.map(t => t.id === tutorId ? { ...t, ...profile } : t));
  };

  const createOrGetConversation = (tutorId: string) => {
    const existing = conversations.find(c => c.tutorId === tutorId);
    if (existing) return existing.id;

    const tutor = tutors.find(t => t.id === tutorId);
    if (!tutor) return '';

    const newId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      tutorId,
      tutorName: tutor.name,
      avatar: tutor.avatar,
      messages: [],
      unread: 0
    };
    
    setConversations(prev => [...prev, newConv]);
    return newId;
  };

  const sendMessage = (conversationId: string, text: string, senderId: 'student' | 'tutor') => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: [...conv.messages, {
            id: Date.now().toString(),
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            senderId
          }]
        };
      }
      return conv;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        tutors,
        searchQuery,
        setSearchQuery,
        upcomingLessons,
        addLesson,
        updateTutorAvailability,
        updateTutorProfile,
        favoriteTutors,
        toggleFavorite,
        conversations,
        sendMessage,
        createOrGetConversation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
