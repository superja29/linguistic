export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface HourlyPackage {
  name: string;
  hours: number;
  price: number;
  description: string;
  savings?: string;
}

export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  country_code: string;
  rating: number;
  price: number;
  specialties: string[];
  lessons_taught: number;
  bio: string;
  about: string;
  philosophy: string;
  qualifications: string[];
  experience_years: number;
  languages: string[];
  response_time: string;
  is_online: boolean;
  video_url?: string;
  availability: Record<string, string[]>;
  education: Education[];
  teaching_style: string;
  lesson_structure: string[];
  certifications: Certification[];
  fun_facts: string[];
  hourly_packages: HourlyPackage[];
  total_students: number;
  completion_rate: number;
  intro_video_url?: string;
  topics_taught: string[];
  reviews: Review[];
}

export interface UpcomingLesson {
  id: string;
  tutor_name: string;
  avatar: string;
  date_time: string;
  subject: string;
}

export interface PastLesson {
  id: string;
  tutor_name: string;
  date: string;
  subject: string;
  duration: number;
  rating: number;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  senderId: 'student' | 'tutor';
}

export interface Conversation {
  id: string;
  tutorId: string;
  tutorName: string;
  avatar: string;
  messages: Message[];
  unread: number;
}
