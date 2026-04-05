import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { ChevronRight, ChevronLeft, Save, Globe2, BookOpen, DollarSign, Loader2 } from 'lucide-react';

interface TutorOnboardingProps {
  onComplete: () => void;
}

export const TutorOnboarding: React.FC<TutorOnboardingProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    bio: '',
    specialties: [] as string[],
    languages: [] as string[],
    price: 20
  });

  // Temporarily store strings for comma separated inputs -> then handle blur/change
  const [langInput, setLangInput] = useState('');
  const [specInput, setSpecInput] = useState('');

  // 1. Cargar el borrador en el montaje
  useEffect(() => {
    const draft = localStorage.getItem(`tutor_onboarding_${user?.id}`);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setFormData(parsed);
        setLangInput(parsed.languages.join(', '));
        setSpecInput(parsed.specialties.join(', '));
      } catch (e) {
        console.error("No se pudo cargar el borrador");
      }
    }
    setIsDraftLoaded(true);
  }, [user]);

  // 2. Guardar el borrador en cada cambio
  useEffect(() => {
    if (isDraftLoaded && user) {
      localStorage.setItem(`tutor_onboarding_${user.id}`, JSON.stringify(formData));
    }
  }, [formData, isDraftLoaded, user]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    
    const { error } = await supabase.from('tutors').insert({
      id: user.id,
      bio: formData.bio || 'I am ready to teach!',
      price: formData.price || 15,
      specialties: JSON.stringify(formData.specialties),
      languages: JSON.stringify(formData.languages),
      availability: '{}' 
    });

    setLoading(false);
    
    if (!error) {
      // Limpiar cache local porque ya acabó
      localStorage.removeItem(`tutor_onboarding_${user.id}`);
      onComplete();
    } else {
      alert("Error building your profile: " + error.message);
    }
  };

  if (!isDraftLoaded) return <div className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600"/></div>;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mt-12 mb-20 animate-fade-in-up">
      {/* Progress Header */}
      <div className="bg-slate-50 border-b border-slate-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Step {step} of 3</h2>
          <p className="text-sm font-medium text-slate-500">
            {step === 1 ? 'Introduction' : step === 2 ? 'Expertise' : 'Pricing'}
          </p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <div 
              key={s} 
              className={`h-2.5 rounded-full transition-all duration-300 ${s === step ? 'w-10 bg-indigo-600' : s < step ? 'w-4 bg-indigo-300' : 'w-4 bg-slate-200'}`}
            />
          ))}
        </div>
      </div>

      <div className="p-8 md:p-12 min-h-[350px]">
        
        {/* Step 1: Introduction */}
        <div className={`transition-all duration-500 transform ${step === 1 ? 'translate-x-0 opacity-100' : 'hidden -translate-x-10 opacity-0'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex justify-center items-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Tell us about yourself</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Short Bio</label>
              <textarea 
                className="w-full border-2 border-slate-200 rounded-xl p-4 focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-colors h-40 resize-none"
                placeholder="Hi! I have 5 years of experience teaching English online. I focus on conversational skills..."
                value={formData.bio}
                onChange={(e) => updateField('bio', e.target.value)}
              />
              <p className="text-xs font-medium text-slate-400 mt-2">Write a couple of sentences to hook students on your profile.</p>
            </div>
          </div>
        </div>

        {/* Step 2: Expertise */}
        <div className={`transition-all duration-500 transform ${step === 2 ? 'translate-x-0 opacity-100' : 'hidden -translate-x-10 opacity-0'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex justify-center items-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Your Expertise</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Languages you speak (comma separated)</label>
              <input 
                type="text"
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-600 bg-slate-50 focus:bg-white transition-colors"
                placeholder="English, Spanish, French"
                value={langInput}
                onChange={(e) => {
                  setLangInput(e.target.value);
                  updateField('languages', e.target.value.split(',').map(s => s.trim()).filter(Boolean));
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Specialties (comma separated)</label>
              <input 
                type="text"
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-600 bg-slate-50 focus:bg-white transition-colors"
                placeholder="IELTS, Business English, Kids"
                value={specInput}
                onChange={(e) => {
                  setSpecInput(e.target.value);
                  updateField('specialties', e.target.value.split(',').map(s => s.trim()).filter(Boolean));
                }}
              />
            </div>
          </div>
        </div>

        {/* Step 3: Pricing */}
        <div className={`transition-all duration-500 transform ${step === 3 ? 'translate-x-0 opacity-100' : 'hidden translate-x-10 opacity-0'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex justify-center items-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Set your hourly rate</h3>
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-8 py-8">
            <div className="flex items-end gap-2">
              <span className="text-5xl font-black text-slate-900">$</span>
              <input 
                type="number"
                min="5"
                max="100"
                className="w-32 text-6xl font-black text-center border-b-4 border-slate-200 focus:border-orange-500 focus:outline-none text-slate-900 bg-transparent transition-colors p-2"
                value={formData.price}
                onChange={(e) => updateField('price', parseInt(e.target.value) || 0)}
              />
              <span className="text-xl font-bold text-slate-400 mb-2">/ hr</span>
            </div>
            <p className="text-slate-500 font-medium text-center max-w-sm">
              We recommend starting between $10 and $20 to build up your reviews quickly.
            </p>
          </div>
        </div>

      </div>

      {/* Footer Nav */}
      <div className="bg-slate-50 border-t border-slate-100 p-6 flex justify-between items-center">
        <button 
          onClick={prevStep}
          disabled={step === 1}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors px-4 py-2"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        
        {step < 3 ? (
          <button 
            onClick={nextStep}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md active:scale-95"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Publish Profile
          </button>
        )}
      </div>

    </div>
  );
};
