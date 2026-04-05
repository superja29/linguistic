import React from 'react';
import { useAppContext } from '../context/AppContext';
import { BookOpen, Star, Clock, Flame, Calendar, Video } from 'lucide-react';
import { Footer } from '../components/Footer';

export const StudentDashboard: React.FC = () => {
  const { upcomingLessons } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pt-16">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12 flex items-center gap-6">
          <img src="https://api.dicebear.com/9.x/notionists/svg?seed=student_me" className="w-20 h-20 rounded-full bg-indigo-50 border-4 border-indigo-100" />
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Welcome back, Alex!</h1>
            <p className="text-slate-500 font-medium">You're on a 5-day learning streak! Keep it up. 🔥</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 w-full flex-1 space-y-10">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <BookOpen className="w-8 h-8 text-indigo-500 mb-2" />
            <div className="text-2xl font-black text-slate-900">12</div>
            <div className="text-sm font-medium text-slate-500">Total Lessons</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <Clock className="w-8 h-8 text-orange-500 mb-2" />
            <div className="text-2xl font-black text-slate-900">9.5</div>
            <div className="text-sm font-medium text-slate-500">Hours Learned</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <Flame className="w-8 h-8 text-red-500 mb-2" />
            <div className="text-2xl font-black text-slate-900">5</div>
            <div className="text-sm font-medium text-slate-500">Day Streak</div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
            <Star className="w-8 h-8 text-yellow-500 mb-2 fill-current" />
            <div className="text-2xl font-black text-slate-900">5.0</div>
            <div className="text-sm font-medium text-slate-500">Avg Rating</div>
          </div>
        </div>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Calendar className="w-6 h-6 text-indigo-600" /> Upcoming Lessons</h2>
          </div>
          
          {upcomingLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingLessons.map((lesson, idx) => (
                <div key={idx} className="bg-white flex flex-col sm:flex-row gap-6 p-6 rounded-3xl border-2 border-indigo-50 shadow-md">
                  <div className="bg-indigo-50 text-indigo-600 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[100px] text-center border border-indigo-100">
                    <div className="text-xs font-bold uppercase tracking-wider">{lesson.date_time.split(' at ')[0]}</div>
                    <div className="text-2xl font-black">{lesson.date_time.split(' at ')[1]}</div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 capitalize">{lesson.subject}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                        <img src={lesson.avatar} className="w-6 h-6 rounded-full bg-slate-100" />
                        <span>with <b>{lesson.tutor_name}</b></span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-3">
                      <button className="flex-1 bg-indigo-600 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-indigo-700 active:scale-95 shadow-sm">
                        <Video className="w-4 h-4" /> Join Class
                      </button>
                      <button className="flex-1 bg-slate-100 text-slate-600 font-bold py-2 rounded-xl transition-all hover:bg-slate-200 active:scale-95">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No upcoming lessons</h3>
              <p className="text-slate-500 mb-6">You don't have any lessons scheduled yet.</p>
              <a href="/tutors" className="inline-block bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl transition hover:bg-indigo-700 shadow-md shadow-indigo-200">
                Find a Tutor
              </a>
            </div>
          )}
        </section>

      </div>
      <Footer />
    </div>
  );
};
