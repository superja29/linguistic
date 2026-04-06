import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Star, Clock, Flame, Calendar, Heart, Loader2, Save, User } from 'lucide-react';
import { Footer } from '../components/Footer';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Imperative Modal State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tempName, setTempName] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchProfile = async () => {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (!error && data) {
        setProfile(data);
        if (!data.name || data.name.trim() === '') {
          setShowProfileModal(true);
        }
      } else if (error) {
        console.error("Error fetching profile", error);
        setShowProfileModal(true);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim() || !user) return;
    setSavingProfile(true);

    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(tempName)}&background=random&color=fff`;

    const { error } = await supabase.from('profiles').update({
      name: tempName.trim(),
      avatar: defaultAvatar
    }).eq('id', user.id);

    if (!error) {
      setProfile({ ...profile, name: tempName.trim(), avatar: defaultAvatar });
      setShowProfileModal(false);
    } else {
      console.error(error);
    }
    setSavingProfile(false);
  };

  if (loading) {
    return <div className="min-h-screen pt-32 text-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600"/></div>;
  }

  const displayName = profile?.name || user?.email?.split('@')[0] || 'Student';
  const displayAvatar = profile?.avatar || `https://ui-avatars.com/api/?name=${displayName}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pt-16 relative">
      
      {/* Imperative Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md pointer-events-none"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <User className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 text-center mb-2">Complete Your Profile</h2>
            <p className="text-slate-500 text-center mb-8 font-medium">Please enter your real name so tutors know who they are speaking with!</p>
            
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Your Full Name</label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. Alex Johnson"
                  className="w-full pl-4 pr-3 py-3 border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl focus:ring-0 focus:border-indigo-600 transition-all outline-none font-medium"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={savingProfile || !tempName.trim()}
                className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl shadow-md text-white font-bold bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:opacity-50 disabled:active:scale-100 active:scale-95 transition-all text-lg"
              >
                {savingProfile ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                Save & Continue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Dashboard Content - Slightly blurred out if modal is showing */}
      <div className={`transition-all duration-300 ${showProfileModal ? 'blur-md grayscale-[0.3] pointer-events-none overflow-hidden h-screen' : 'flex-1'}`}>
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-12 flex items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img src={displayAvatar} className="w-24 h-24 rounded-full bg-indigo-50 border-4 border-indigo-100 object-cover" />
              <div className="text-center sm:text-left mt-2 sm:mt-0">
                <h1 className="text-3xl font-extrabold text-slate-900 truncate max-w-xl">Welcome back, {displayName}!</h1>
                <p className="text-slate-500 font-medium mt-1">Ready to continue learning today?</p>
              </div>
            </div>
            <a href="/settings" className="hidden sm:flex bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm items-center gap-2">
               Edit Profile
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 w-full space-y-10">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
              <BookOpen className="w-8 h-8 text-indigo-500 mb-2" />
              <div className="text-2xl font-black text-slate-900">0</div>
              <div className="text-sm font-medium text-slate-500">Total Lessons</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
              <Clock className="w-8 h-8 text-orange-500 mb-2" />
              <div className="text-2xl font-black text-slate-900">0.0</div>
              <div className="text-sm font-medium text-slate-500">Hours Learned</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
              <Flame className="w-8 h-8 text-red-500 mb-2" />
              <div className="text-2xl font-black text-slate-900">0</div>
              <div className="text-sm font-medium text-slate-500">Day Streak</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
              <Star className="w-8 h-8 text-yellow-500 mb-2 fill-current" />
              <div className="text-2xl font-black text-slate-900">-</div>
              <div className="text-sm font-medium text-slate-500">Avg Rating</div>
            </div>
          </div>

          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Calendar className="w-6 h-6 text-indigo-600" /> Upcoming Lessons</h2>
            </div>
            
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No upcoming lessons</h3>
              <p className="text-slate-500 mb-6">You don't have any lessons scheduled yet.</p>
              <a href="/tutors" className="inline-block bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl transition hover:bg-indigo-700 shadow-md shadow-indigo-200">
                Find a Tutor
              </a>
            </div>
          </section>

          <section className="pt-8 border-t border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Heart className="w-6 h-6 text-pink-500 fill-current" /> Favorite Tutors</h2>
              <a href="/tutors" className="text-indigo-600 font-bold hover:text-indigo-700 transition">Find more</a>
            </div>
            
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No favorite tutors yet</h3>
              <p className="text-slate-500">Save your favorite tutors to easily book them later.</p>
            </div>
          </section>

        </div>
        <Footer />
      </div>
    </div>
  );
};
