import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Clock, Users, ChevronRight, CheckCircle2, UserCircle } from 'lucide-react';
import { Footer } from '../components/Footer';

export const TutorDashboard: React.FC = () => {
  const navigate = useNavigate();
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
              <div className="text-4xl font-black mb-1">$1,240<span className="text-lg text-indigo-300">.50</span></div>
              <div className="text-sm font-medium text-indigo-200 flex items-center gap-1"><span className="text-green-400">↑ 12%</span> vs last month</div>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider flex justify-between items-center">
                Pending Payout
                <Clock className="w-5 h-5 text-slate-300" />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">$350<span className="text-lg text-slate-400">.00</span></div>
              <div className="text-sm font-medium text-slate-500">Clears in 2 days</div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm border-b-4 border-b-orange-400">
              <div className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider flex justify-between items-center">
                Total Earnings
                <DollarSign className="w-5 h-5 text-slate-300" />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">$14,500</div>
              <div className="text-sm font-medium text-slate-500">Since Jan 2022</div>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">Today's Schedule</h2>
            <div className="space-y-4">
              
              <div className="bg-white p-5 rounded-2xl border-2 border-indigo-100 shadow-sm flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-indigo-50 border border-indigo-100 flex flex-col justify-center items-center text-indigo-700 font-bold shrink-0">
                  <span className="text-xl">10</span>
                  <span className="text-xs uppercase">AM</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg">IELTS Speaking Prep</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                    <img src="https://api.dicebear.com/9.x/notionists/svg?seed=student1" className="w-5 h-5 rounded-full" />
                    <span>with <b>Yuki Tanaka</b></span>
                  </div>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap">
                  Start Lesson
                </button>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 opacity-70">
                <div className="w-16 h-16 rounded-xl bg-slate-200 border border-slate-300 flex flex-col justify-center items-center text-slate-600 font-bold shrink-0">
                  <span className="text-xl">09</span>
                  <span className="text-xs uppercase">AM</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg line-through">Business Conversation</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Completed
                  </div>
                </div>
                <div className="font-bold text-slate-400 px-6 py-3">Done</div>
              </div>

            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Availability Overview</h3>
            
            <div className="space-y-3 mb-6">
              {[ {d: 'Mon', s: 4}, {d: 'Tue', s: 0}, {d: 'Wed', s: 3}, {d: 'Thu', s: 2}, {d: 'Fri', s: 6} ].map(day => (
                <div key={day.d} className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500">{day.d}</span>
                  <div className="flex gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${i < day.s ? 'bg-indigo-500' : 'bg-slate-100'}`}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => navigate('/tutor-availability')}
              className="mt-4 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all flex justify-between items-center px-4"
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
