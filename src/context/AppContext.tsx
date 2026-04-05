import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Conversation, Tutor, UpcomingLesson, Message } from '../types';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface AppContextType {
  tutors: Tutor[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  upcomingLessons: any[]; // Using raw output for now
  addLesson: (tutorId: string, subject: string, date_time: Date) => Promise<void>;
  updateTutorAvailability: (tutorId: string, availability: Record<string, string[]>) => void;
  updateTutorProfile: (tutorId: string, profile: Partial<Tutor>) => void;
  favoriteTutors: string[];
  toggleFavorite: (tutorId: string) => void;
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string) => Promise<void>;
  createOrGetConversation: (tutorId: string) => Promise<string | null>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [upcomingLessons, setUpcomingLessons] = useState<any[]>([]);
  const [favoriteTutors, setFavoriteTutors] = useState<string[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // 1. Fetch Tutors
  useEffect(() => {
    async function fetchTutors() {
      const { data, error } = await supabase.from('tutors').select('*, profiles (name, avatar, country_code)');
      if (data && !error) {
        const formattedTutors: Tutor[] = data.map((t: any) => ({
          id: t.id,
          name: t.profiles?.name || 'Unknown',
          avatar: t.profiles?.avatar || '',
          country_code: t.profiles?.country_code || 'us',
          price: t.price,
          bio: t.bio || '',
          about: t.about || '',
          philosophy: t.philosophy || '',
          experience_years: t.experience_years || 0,
          teaching_style: t.teaching_style || '',
          response_time: t.response_time || '',
          is_online: t.is_online || false,
          specialties: Array.isArray(t.specialties) ? t.specialties : JSON.parse(t.specialties || '[]'),
          qualifications: Array.isArray(t.qualifications) ? t.qualifications : JSON.parse(t.qualifications || '[]'),
          languages: Array.isArray(t.languages) ? t.languages : JSON.parse(t.languages || '[]'),
          availability: typeof t.availability === 'object' ? t.availability : JSON.parse(t.availability || '{}'),
          education: Array.isArray(t.education) ? t.education : JSON.parse(t.education || '[]'),
          lesson_structure: Array.isArray(t.lesson_structure) ? t.lesson_structure : JSON.parse(t.lesson_structure || '[]'),
          certifications: Array.isArray(t.certifications) ? t.certifications : JSON.parse(t.certifications || '[]'),
          fun_facts: Array.isArray(t.fun_facts) ? t.fun_facts : JSON.parse(t.fun_facts || '[]'),
          hourly_packages: Array.isArray(t.hourly_packages) ? t.hourly_packages : JSON.parse(t.hourly_packages || '[]'),
          topics_taught: Array.isArray(t.topics_taught) ? t.topics_taught : JSON.parse(t.topics_taught || '[]'),
          rating: t.rating || 0,
          lessons_taught: t.lessons_taught || 0,
          total_students: t.total_students || 0,
          completion_rate: t.completion_rate || 100,
          reviews: [] 
        }));
        setTutors(formattedTutors);
      }
    }
    fetchTutors();
  }, []);

  // 2. Fetch User Data (Lessons & Conversations)
  useEffect(() => {
    if (!user) {
      setConversations([]);
      setUpcomingLessons([]);
      return;
    }

    const fetchData = async () => {
      // Fetch Lessons
      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*, tutors(profiles(name, avatar))')
        .eq('student_id', user.id);
        
      if (lessonsData) {
        setUpcomingLessons(lessonsData.map(l => ({
          id: l.id,
          tutor_name: l.tutors?.profiles?.name,
          avatar: l.tutors?.profiles?.avatar,
          date_time: new Date(l.date_time).toLocaleString(),
          subject: l.subject
        })));
      }

      // Fetch Conversations
      const { data: convData } = await supabase
        .from('conversations')
        .select(`
          id, tutor_id,
          tutors (profiles (name, avatar)),
          messages (*)
        `)
        .eq('student_id', user.id);
        
      if (convData) {
        const formattedConvs = convData.map(c => {
          // Sort messages ascending by time
          const msgs = (c.messages || []).sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
          
          return {
            id: c.id,
            tutorId: c.tutor_id,
            tutorName: c.tutors?.profiles?.name || 'Tutor',
            avatar: c.tutors?.profiles?.avatar || '',
            unread: 0,
            messages: msgs.map((m: any) => ({
              id: m.id,
              text: m.text,
              timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              senderId: m.sender_id === user.id ? 'student' : 'tutor'
            }))
          };
        });
        setConversations(formattedConvs as Conversation[]);
      }
    };
    
    fetchData();

    // 3. Set up REAL-TIME subscription for Messages!
    const channel = supabase.channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMsg = payload.new;
          // Refresh the data! We could inject smartly, but a re-fetch is safest for MVP.
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const addLesson = async (tutorId: string, subject: string, date_time: Date) => {
    if (!user) return;
    const { data } = await supabase.from('lessons').insert({
      student_id: user.id,
      tutor_id: tutorId,
      subject,
      date_time: date_time.toISOString(),
      duration_minutes: 60
    }).select('*, tutors(profiles(name, avatar))').single();
    
    if (data) {
      setUpcomingLessons(prev => [...prev, {
        id: data.id,
        tutor_name: data.tutors?.profiles?.name,
        avatar: data.tutors?.profiles?.avatar,
        date_time: new Date(data.date_time).toLocaleString(),
        subject: data.subject
      }]);
    }
  };

  const createOrGetConversation = async (tutorId: string): Promise<string | null> => {
    if (!user) return null;
    const existing = conversations.find(c => c.tutorId === tutorId);
    if (existing) return existing.id;

    // Doesn't exist locally, try to UPSERT or INSERT on db
    const { data, error } = await supabase.from('conversations').insert({
      student_id: user.id,
      tutor_id: tutorId
    }).select().single();

    if (error) {
       console.error("Conversation creation error", error);
       return null;
    }

    if (data) {
      // Re-fetch or add locally
      const tutorProfile = tutors.find(t => t.id === tutorId);
      const newConv: Conversation = {
        id: data.id,
        tutorId,
        tutorName: tutorProfile?.name || 'Tutor',
        avatar: tutorProfile?.avatar || '',
        unread: 0,
        messages: []
      };
      setConversations(prev => [...prev, newConv]);
      return data.id;
    }
    return null;
  };

  const sendMessage = async (conversationId: string, text: string) => {
    if (!user) return;
    // Optimistic UI updates could go here
    
    const { error } = await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_id: user.id,
      text: text
    });

    if (error) {
      console.error('Error sending message:', error);
    }
  };

  const toggleFavorite = (tutorId: string) => {
    setFavoriteTutors(prev => prev.includes(tutorId) ? prev.filter(id => id !== tutorId) : [...prev, tutorId]);
  };
  const updateTutorAvailability = () => {};
  const updateTutorProfile = () => {};

  return (
    <AppContext.Provider
      value={{
        tutors, searchQuery, setSearchQuery, upcomingLessons, addLesson,
        updateTutorAvailability, updateTutorProfile, favoriteTutors, toggleFavorite,
        conversations, sendMessage, createOrGetConversation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) { throw new Error('useAppContext must be used within an AppProvider'); }
  return context;
};
