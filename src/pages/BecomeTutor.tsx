import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, DollarSign, Clock, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from '../components/AuthModal';

export const BecomeTutor: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleApply = () => {
    if (user) {
      navigate('/tutor-dashboard');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-slate-900 to-indigo-900"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-200 rounded-full text-sm font-bold border border-indigo-500/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
              Now accepting new tutors worldwide
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
              Get paid to teach your <span className="text-orange-400">language</span> to the world.
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto md:mx-0">
              Set your own hours, manage your own pricing, and work from anywhere. Join thousands of educators empowering students on Linguistly.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button 
                onClick={handleApply}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/30 w-full sm:w-auto hover:scale-105"
              >
                Start Teaching Today
              </button>
            </div>
          </div>
          
          <div className="flex-1 w-full relative z-10 hidden md:block">
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              {/* Decorative elements representing tutors earning */}
              <div className="absolute top-10 left-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 flex flex-col rounded-3xl shadow-2xl animate-[bounce_4s_infinite]">
                 <div className="text-indigo-200 font-bold mb-1">Last Payout</div>
                 <div className="text-3xl font-black text-white flex items-center"><DollarSign className="w-8 h-8 text-green-400" />450.00</div>
              </div>
              <div className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 flex items-center gap-4 rounded-3xl shadow-2xl animate-[bounce_5s_infinite]">
                 <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                 </div>
                 <div>
                    <div className="text-white font-bold">120+ Students</div>
                    <div className="text-indigo-200 text-sm">Worldwide reach</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Why teach with Linguistly?</h2>
            <p className="text-lg text-slate-500">We provide the tools, the students, and the secure platform. You just focus on what you do best: teaching.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Total Flexibility</h3>
              <p className="text-slate-600 leading-relaxed">
                You are your own boss. You decide when you want to work, how many hours a week, and what time of day fits your lifestyle best.
              </p>
            </div>
            
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Global Audience</h3>
              <p className="text-slate-600 leading-relaxed">
                Connect with highly motivated students from over 150 countries. Our marketing team brings the students directly to your profile.
              </p>
            </div>
            
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Secure Payments</h3>
              <p className="text-slate-600 leading-relaxed">
                Never worry about chasing payments. Students pay upfront, and we securely deposit your earnings directly to your local bank account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Start your teaching journey in minutes</h2>
              <p className="text-lg text-slate-500 mb-10">We've designed a streamlined onboarding process so you can get approved and start earning as fast as possible.</p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xl shrink-0">1</div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Create your profile</h4>
                    <p className="text-slate-600">Register with your email, set your hourly rate, and upload a short introductory video.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xl shrink-0">2</div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Set your availability</h4>
                    <p className="text-slate-600">Use our calendar tool to visually mark the slots where you're open for bookings.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xl shrink-0">3</div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Start earning</h4>
                    <p className="text-slate-600">Students will book your open slots directly. You just show up, teach, and get paid.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 relative">
                <div className="absolute -top-6 -right-6 bg-orange-400 text-white px-6 py-2 rounded-full font-bold shadow-lg transform rotate-6">
                  Fast Approval!
                </div>
                <div className="space-y-6">
                  <div className="h-4 bg-slate-100 rounded-full w-1/3"></div>
                  <div className="h-10 bg-slate-50 border border-slate-100 rounded-xl w-full"></div>
                  <div className="h-10 bg-slate-50 border border-slate-100 rounded-xl w-full"></div>
                  <div className="h-32 bg-slate-50 border border-slate-100 rounded-xl w-full"></div>
                  <div className="h-12 bg-indigo-600 rounded-xl w-full mt-4 flex justify-center items-center">
                     <div className="h-2 bg-white/30 rounded-full w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <Zap className="w-16 h-16 mx-auto mb-6 text-orange-400" />
          <h2 className="text-4xl font-extrabold mb-6">Ready to change your life?</h2>
          <p className="text-xl text-indigo-100 mb-10">Sign up right now. It is completely free to create an account and join our world-class marketplace.</p>
          <button 
            onClick={handleApply}
            className="bg-white text-indigo-600 hover:bg-slate-50 font-black text-xl px-12 py-5 rounded-2xl shadow-xl hover:scale-105 transition-transform"
          >
            Apply Now
          </button>
        </div>
      </section>

      <Footer />
      
      {/* Auth Modal Trigger for unlogged users */}
      {isAuthModalOpen && (
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      )}
    </div>
  );
};
