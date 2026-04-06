import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Clock, ChevronRight, CheckCircle2, UserCircle, Rocket, Loader2 } from 'lucide-react';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { TutorOnboarding } from '../components/TutorOnboarding';
import { AuthModal } from '../components/AuthModal';

export const TutorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isTutor, setIsTutor] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<any[]>([]);

  const checkTutorStatus = useCallback(async () => {
    if (!user) return;
    const { data: tutorData } = await supabase
      .from('tutors')
      .select('id')
      .eq('id', user.id)
      .single();
      
    if (tutorData) {
      setIsTutor(true);
      const { data: lessonData } = await supabase
        .from('lessons')
        .select('*, profiles:student_id(name, avatar)')
        .eq('tutor_id', user.id);
        
      if (lessonData) setLessons(lessonData);
    } else {
      setIsTutor(false);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    checkTutorStatus();
  }, [user, checkTutorStatus]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <AuthModal isOpen={true} onClose={() => navigate('/')} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isTutor === false) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 pt-16">
        <TutorOnboarding onComplete={() => checkTutorStatus()} />
        <Footer />
      </div>
    );
  }

  // Calculate dummy earnings based on lessons length
  const earnings = lessons.length * 20;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pt-16">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Tutor Portal</h1>
            <p className="text-slate-500 font-medium">Manage your lessons, schedule, and earnings.</p>
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 font-bold rounded-lg border border-green-200 mr-4">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Online Status
            </span>
            <button 
              onClick={() => navigate('/settings')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 hover:bg-slate-50 font-bold rounded-xl border border-slate-200 mt-4 sm:mt-0 transition-colors shadow-sm"
            >
              <UserCircle className="w-5 h-5" /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 w-full flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-600 text-white p-6 rounded-3xl border border-indigo-700 shadow-lg shadow-indigo-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
              <div className="text-indigo-200 text-sm font-bold mb-2 uppercase tracking-wider flex justify-between items-center">
                This Month
                <DollarSign className="w-5 h-5 text-indigo-300" />
              </div>
              <div className="text-4xl font-black mb-1">${earnings}<span className="text-lg text-indigo-300">.00</span></div>
              <div className="text-sm font-medium text-indigo-200 flex items-center gap-1">Based on {lessons.length} lessons</div>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider flex justify-between items-center">
                Pending Payout
                <Clock className="w-5 h-5 text-slate-300" />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">$0<span className="text-lg text-slate-400">.00</span></div>
              <div className="text-sm font-medium text-slate-500">Clears in 2 days</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm border-b-4 border-b-orange-400">
              <div className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider flex justify-between items-center">
                Total Earnings
                <DollarSign className="w-5 h-5 text-slate-300" />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">${earnings}</div>
              <div className="text-sm font-medium text-slate-500">Lifetime records</div>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">Your Schedule</h2>
            <div className="space-y-4">
              
              {lessons.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-slate-500 font-medium">No lessons booked yet.</p>
                </div>
              ) : (
                lessons.map((lesson) => {
                  const lDate = new Date(lesson.date_time);
                  return (
                    <div key={lesson.id} className="bg-white p-5 rounded-2xl border-2 border-indigo-100 shadow-sm flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-indigo-50 border border-indigo-100 flex flex-col justify-center items-center text-indigo-700 font-bold shrink-0">
                        <span className="text-xl">{lDate.getHours() % 12 || 12}</span>
                        <span className="text-xs uppercase">{lDate.getHours() >= 12 ? 'PM' : 'AM'}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 text-lg">{lesson.subject}</h3>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                          <img src={lesson.profiles?.avatar || 'https://api.dicebear.com/9.x/notionists/svg?seed=student1'} className="w-5 h-5 rounded-full" />
                          <span>with <b>{lesson.profiles?.name || 'A Student'}</b></span>
                        </div>
                        <div className="text-xs text-indigo-500 mt-1 font-semibold">{lDate.toLocaleDateString()}</div>
                      </div>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap">
                        Message
                      </button>
                    </div>
                  );
                })
              )}

            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Availability Overview</h3>
            
            <p className="text-sm text-slate-500 mb-6">Manage your schedule to allow students to book lessons with you directly.</p>

            <button 
              onClick={() => navigate('/tutor-availability')}
              className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-3 rounded-xl transition-all flex justify-between items-center px-4 shadow-sm"
            >
              Manage Availability <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};
