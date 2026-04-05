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
  conversations: Conversation[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tutors, setTutors] = useState<Tutor[]>(mockTutors);
  const [searchQuery, setSearchQuery] = useState('');
  const [upcomingLessons, setUpcomingLessons] = useState<UpcomingLesson[]>([]);
  const [conversations] = useState<Conversation[]>([]);

  const addLesson = (lesson: UpcomingLesson) => {
    setUpcomingLessons(prev => [...prev, lesson]);
  };

  const updateTutorAvailability = (tutorId: string, availability: Record<string, string[]>) => {
    setTutors(prev => prev.map(t => t.id === tutorId ? { ...t, availability } : t));
  };

  const updateTutorProfile = (tutorId: string, profile: Partial<Tutor>) => {
    setTutors(prev => prev.map(t => t.id === tutorId ? { ...t, ...profile } : t));
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
        conversations
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
