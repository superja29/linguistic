import { Tutor, Review } from '../types';

function createAvatar(seed: string) {
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${seed}`;
}

export const mockTutors: Tutor[] = [
  {
    id: "tutor-1",
    name: "Sarah Jenkins",
    avatar: createAvatar("sarah"),
    country_code: "gb",
    rating: 4.9,
    price: 25,
    specialties: ["IELTS", "Business English", "Conversation"],
    lessons_taught: 1205,
    bio: "Certified CELTA teacher specializing in IELTS preparation and formal Business English.",
    about: "Hello! I am Sarah from London. I have been teaching English for over 8 years, focusing on helping professionals and students achieve their goals...",
    philosophy: "I believe in practical, immersive learning where mistakes are celebrated as part of the journey.",
    qualifications: ["CELTA (Cambridge)", "BA in English Literature"],
    experience_years: 8,
    languages: ["English (Native)", "Spanish (B2)"],
    response_time: "Within 2 hours",
    is_online: true,
    availability: {
      "Monday": ["09:00", "10:00", "14:00", "15:00"],
      "Wednesday": ["10:00", "11:00", "16:00"],
      "Friday": ["09:00", "14:00", "15:00", "17:00"]
    },
    education: [
      { degree: "BA English Literature", institution: "University of Edinburgh", year: "2015" }
    ],
    teaching_style: "Structured but adaptable, heavily driven by student goals.",
    lesson_structure: ["Warm up (5m)", "Review (10m)", "Core material & speaking (35m)", "Feedback (10m)"],
    certifications: [
      { name: "CELTA", issuer: "Cambridge Assessment English", year: "2016" }
    ],
    fun_facts: ["I've lived in 4 different countries.", "I perform stand-up comedy.", "I can solve a Rubik's cube in 2 minutes."],
    hourly_packages: [
      { name: "Trial", hours: 0.5, price: 10, description: "30-min intro session" },
      { name: "Standard", hours: 1, price: 25, description: "Full 1 hour lesson" },
      { name: "Pack of 5", hours: 5, price: 115, description: "5 hours", savings: "Save $10" }
    ],
    total_students: 450,
    completion_rate: 98,
    topics_taught: ["IELTS Speaking", "Interview Prep", "Business Idioms"],
    reviews: [
      { id: "r1", name: "Hiroshi", avatar: createAvatar("hiroshi"), rating: 5, date: "2 weeks ago", comment: "Sarah is very patient and clearly explains difficult grammar." }
    ]
  },
  {
    id: "tutor-2",
    name: "James Miller",
    avatar: createAvatar("james"),
    country_code: "us",
    rating: 4.7,
    price: 18,
    specialties: ["Kids", "Conversation", "Pronunciation"],
    lessons_taught: 850,
    bio: "Fun and engaging lessons for children and adults looking to improve their speaking confidence.",
    about: "Hi! I'm James, born and raised in California. I specialize in making English learning fun, especially for kids...",
    philosophy: "Learning should never be boring!",
    qualifications: ["TEFL Certificate"],
    experience_years: 4,
    languages: ["English (Native)", "Japanese (A2)"],
    response_time: "Within 1 hour",
    is_online: false,
    availability: {
      "Tuesday": ["08:00", "09:00", "10:00"],
      "Thursday": ["08:00", "09:00", "10:00"],
      "Saturday": ["10:00", "11:00", "14:00"]
    },
    education: [
      { degree: "BSc Psychology", institution: "UCLA", year: "2018" }
    ],
    teaching_style: "Interactive, game-based learning.",
    lesson_structure: ["Icebreaker games", "Vocabulary building", "Roleplay", "Review"],
    certifications: [
      { name: "120-Hour TEFL", issuer: "TEFL Org", year: "2019" }
    ],
    fun_facts: ["I have a pet iguana.", "I love surfing.", "I know how to juggle."],
    hourly_packages: [
      { name: "Trial", hours: 0.5, price: 10, description: "30-min intro session" },
      { name: "Standard", hours: 1, price: 18, description: "Full 1 hour lesson" }
    ],
    total_students: 310,
    completion_rate: 94,
    topics_taught: ["Phonics", "Everyday Conversation", "American Slang"],
    reviews: [
      { id: "r2", name: "Maria", avatar: createAvatar("maria"), rating: 4, date: "1 month ago", comment: "My son loves classes with James!" }
    ]
  },
  {
    id: "tutor-3",
    name: "Elena Rossi",
    avatar: createAvatar("elena"),
    country_code: "ca",
    rating: 5.0,
    price: 35,
    specialties: ["TOEFL", "Academic Writing"],
    lessons_taught: 2200,
    bio: "Ex-university professor helping students with university applications and academic writing.",
    about: "I'm a former university lecturer with 15 years of experience in academic English.",
    philosophy: "Precision and deep understanding of language structure lead to fluency.",
    qualifications: ["MA Applied Linguistics"],
    experience_years: 15,
    languages: ["English (Native)", "French (C1)", "Italian (C1)"],
    response_time: "Within 6 hours",
    is_online: true,
    availability: {
      "Monday": ["17:00", "18:00", "19:00"],
      "Wednesday": ["17:00", "18:00", "19:00"]
    },
    education: [
      { degree: "MA Applied Linguistics", institution: "University of Toronto", year: "2008" }
    ],
    teaching_style: "Rigorous, feedback-focused.",
    lesson_structure: ["Review assigned writing", "Grammar deep dive", "New assignments"],
    certifications: [],
    fun_facts: ["I have published a book.", "I love knitting.", "I used to sing opera."],
    hourly_packages: [
      { name: "Standard", hours: 1, price: 35, description: "Full 1 hour lesson" },
      { name: "Pack of 10", hours: 10, price: 310, description: "10 hours", savings: "Save $40" }
    ],
    total_students: 800,
    completion_rate: 99,
    topics_taught: ["TOEFL Prep", "Essay Writing", "Research Papers"],
    reviews: [
      { id: "r3", name: "Chen", avatar: createAvatar("chen"), rating: 5, date: "3 days ago", comment: "Helped me pass my TOEFL with a 110!" }
    ]
  },
  {
    id: "tutor-4",
    name: "David Osei",
    avatar: createAvatar("david"),
    country_code: "za",
    rating: 4.8,
    price: 20,
    specialties: ["IT Professionals", "Job Interviews"],
    lessons_taught: 450,
    bio: "Tech enthusiast teaching English tailored for software engineers and IT professionals.",
    about: "Combining my background in IT and teaching to help you ace your global tech interviews.",
    philosophy: "Context is king. We learn best through the vocabulary we use every day.",
    qualifications: ["TEFL", "CompTIA A+"],
    experience_years: 3,
    languages: ["English (Native)"],
    response_time: "Within 3 hours",
    is_online: false,
    availability: {
      "Sunday": ["10:00", "11:00", "12:00"],
      "Tuesday": ["15:00", "16:00"]
    },
    education: [
      { degree: "BSc Computer Science", institution: "University of Cape Town", year: "2020" }
    ],
    teaching_style: "Highly specialized and practical.",
    lesson_structure: ["Mock tech interviews", "Code review shadowing", "Pronunciation"],
    certifications: [],
    fun_facts: ["I build custom keyboards.", "I play bass guitar.", "I travel full-time."],
    hourly_packages: [
      { name: "Trial", hours: 0.5, price: 10, description: "30-min intro" },
      { name: "Standard", hours: 1, price: 20, description: "Full 1 hour lesson" }
    ],
    total_students: 120,
    completion_rate: 96,
    topics_taught: ["Tech Interviews", "Agile Stand-up English", "Resume Writing"],
    reviews: [
      { id: "r4", name: "Ivan", avatar: createAvatar("ivan"), rating: 5, date: "1 week ago", comment: "Got a job at FAANG thanks to David." }
    ]
  }
];
