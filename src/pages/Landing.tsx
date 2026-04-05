import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, Users, Star, Award, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { TutorCard } from '../components/TutorCard';
import { Footer } from '../components/Footer';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { tutors, setSearchQuery } = useAppContext();
  const [localSearch, setLocalSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigate('/tutors');
  };

  const featuredTutors = tutors.slice(0, 3); // Get top 3

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-indigo-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-950"></div>
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl text-center mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Master English with <span className="text-orange-400">Expert Tutors</span>
            </h1>
            <p className="text-xl text-indigo-100 mb-10">
              Personalized 1-on-1 online lessons to help you speak confidently, ace exams, and advance your career.
            </p>
            
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-8">
              <div className="flex items-center bg-white rounded-2xl p-2 pl-6 shadow-xl focus-within:ring-4 ring-indigo-500/30 transition-all">
                <Search className="w-6 h-6 text-slate-400" />
                <input
                  type="text"
                  placeholder="What do you want to learn? (e.g., IELTS, Business)"
                  className="flex-1 px-4 py-3 text-slate-900 focus:outline-none bg-transparent"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-3 text-sm font-medium text-indigo-200">
              <span>Popular:</span>
              <button onClick={() => setLocalSearch('Conversation')} className="hover:text-white transition-colors">Conversation</button>
              <button onClick={() => setLocalSearch('Business')} className="hover:text-white transition-colors">Business</button>
              <button onClick={() => setLocalSearch('IELTS')} className="hover:text-white transition-colors">IELTS</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Users className="w-8 h-8 text-indigo-600 mb-3" />
              <div className="text-3xl font-bold text-slate-900 mb-1">5,000+</div>
              <div className="text-sm font-medium text-slate-500">Expert Tutors</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <BookOpen className="w-8 h-8 text-orange-500 mb-3" />
              <div className="text-3xl font-bold text-slate-900 mb-1">1M+</div>
              <div className="text-sm font-medium text-slate-500">Lessons Taught</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Star className="w-8 h-8 text-yellow-400 mb-3" />
              <div className="text-3xl font-bold text-slate-900 mb-1">4.9/5</div>
              <div className="text-sm font-medium text-slate-500">Average Rating</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Globe className="w-8 h-8 text-green-500 mb-3" />
              <div className="text-3xl font-bold text-slate-900 mb-1">120+</div>
              <div className="text-sm font-medium text-slate-500">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutors */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Featured Tutors</h2>
              <p className="text-lg text-slate-500">Learn from our highest-rated educators around the world.</p>
            </div>
            <button 
              onClick={() => navigate('/tutors')}
              className="hidden md:block text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              View all tutors &rarr;
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTutors.map(tutor => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <button 
              onClick={() => navigate('/tutors')}
              className="bg-white border border-slate-200 text-slate-900 font-semibold px-6 py-3 rounded-xl shadow-sm w-full"
            >
              View all tutors
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">How It Works</h2>
          <p className="text-lg text-slate-500 mb-16 max-w-2xl mx-auto">Start learning in three simple steps.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="absolute top-12 left-1/6 right-1/6 h-0.5 bg-indigo-100 hidden md:block z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-indigo-100">
                <Search className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">1. Find a Tutor</h3>
              <p className="text-slate-500 text-center">Browse profiles to find the perfect teacher for your goals and schedule.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-indigo-100">
                <CheckCircle className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2. Book a Lesson</h3>
              <p className="text-slate-500 text-center">Pick a time that works for you and safely book your lesson.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-indigo-100">
                <Award className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">3. Start Learning</h3>
              <p className="text-slate-500 text-center">Connect via our platform and achieve your language goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* spacer to push footer down if needed */}
      <div className="flex-1"></div>
      
      <Footer />
    </div>
  );
};

export function BookOpen(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
}
