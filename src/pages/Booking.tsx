import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Calendar, Clock, ChevronLeft, Flag, CheckCircle } from 'lucide-react';
import { Footer } from '../components/Footer';

export const Booking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tutors, addLesson } = useAppContext();
  
  const tutor = tutors.find(t => t.id === id);
  
  const [step, setStep] = useState(1);
  const [selectedPkg, setSelectedPkg] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState('');

  if (!tutor) return <div className="p-20 text-center">Tutor not found</div>;

  const pkg = selectedPkg !== null ? tutor.hourly_packages[selectedPkg] : null;

  const availableDays = Object.keys(tutor.availability);

  const handleConfirm = () => {
    if (!pkg || !selectedDate || !selectedTime) return;
    addLesson({
      id: Math.random().toString(36).substr(2, 9),
      tutor_name: tutor.name,
      avatar: tutor.avatar,
      date_time: `${selectedDate} at ${selectedTime}`,
      subject: pkg.name
    });
    alert('Booking Confirmed!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pt-16">
      <div className="max-w-4xl mx-auto w-full px-6 py-12 flex-1">
        
        <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-indigo-600 mb-8 font-medium transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Profile
        </button>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
          
          {/* Main Booking Area */}
          <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-100">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Book a Lesson</h1>
            
            {/* Step 1: Package */}
            <div className={`transition-opacity ${step !== 1 && 'opacity-50 pointer-events-none hidden'}`}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><div className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</div> Select Lesson Type</h2>
              <div className="space-y-4">
                {tutor.hourly_packages.map((p, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => { setSelectedPkg(idx); setStep(2); }}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedPkg === idx ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-indigo-200'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-lg text-slate-900">{p.name}</div>
                        <div className="text-slate-500">{p.description}</div>
                      </div>
                      <div className="text-xl font-extrabold text-indigo-600">${p.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Time */}
            <div className={`transition-opacity ${step !== 2 && 'opacity-50 pointer-events-none hidden'}`}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><div className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</div> Select Date & Time</h2>
              <button onClick={() => setStep(1)} className="text-sm text-indigo-600 font-medium mb-6">&larr; Change Lesson Type</button>
              
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">Select Day</label>
                <div className="flex flex-wrap gap-3">
                  {availableDays.map(day => (
                    <button 
                      key={day}
                      onClick={() => { setSelectedDate(day); setSelectedTime(''); }}
                      className={`px-4 py-2 rounded-xl border-2 font-medium transition-all ${selectedDate === day ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 hover:border-indigo-200 bg-white text-slate-700'}`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Select Time</label>
                  <div className="grid grid-cols-3 gap-3">
                    {tutor.availability[selectedDate].map(time => (
                      <button 
                        key={time}
                        onClick={() => { setSelectedTime(time); setStep(3); }}
                        className={`py-3 rounded-xl border-2 font-bold transition-all ${selectedTime === time ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 hover:border-indigo-200 bg-white text-slate-700'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Notes & Confirm */}
            <div className={`transition-opacity ${step !== 3 && 'opacity-50 pointer-events-none hidden'}`}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><div className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</div> Lesson Details</h2>
              <button onClick={() => setStep(2)} className="text-sm text-indigo-600 font-medium mb-6">&larr; Change Date & Time</button>
              
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-2">Notes for Tutor (Optional)</label>
                <textarea 
                  className="w-full border-2 border-slate-200 rounded-xl p-4 focus:outline-none focus:border-indigo-600 min-h-[120px]"
                  placeholder="What would you like to focus on?"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                ></textarea>
              </div>

              <button 
                onClick={handleConfirm}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-6 h-6" /> Confirm Booking
              </button>
            </div>

          </div>

          {/* Sidebar Summary */}
          <div className="w-full md:w-80 bg-slate-50 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Booking Summary</h3>
              
              <div className="flex items-center gap-4 mb-8">
                <img src={tutor.avatar} alt={tutor.name} className="w-16 h-16 rounded-2xl bg-white shadow-sm" />
                <div>
                  <h4 className="font-bold text-slate-900">{tutor.name}</h4>
                  <div className="flex flex-wrap gap-1 mt-1 text-xs font-medium text-slate-500">
                    <span>{tutor.rating}★</span> • <span>English</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex gap-3 items-start">
                  <span className="bg-white p-2 rounded-lg shadow-sm text-indigo-600"><BookOpenIcon className="w-5 h-5" /></span>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Lesson Type</div>
                    <div className="font-bold text-slate-900">{pkg ? pkg.name : 'Not selected'}</div>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <span className="bg-white p-2 rounded-lg shadow-sm text-indigo-600"><Calendar className="w-5 h-5" /></span>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Date & Time</div>
                    <div className="font-bold text-slate-900">
                      {selectedDate ? `${selectedDate}` : 'Not selected'}
                      {selectedTime && `, ${selectedTime}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="border-t border-slate-200 pt-6 mb-2 flex justify-between items-end">
                <span className="font-bold text-slate-600 text-lg">Total</span>
                <span className="text-3xl font-extrabold text-slate-900">${pkg ? pkg.price : '0'}</span>
              </div>
              <p className="text-xs text-slate-400 text-right">No extra fees.</p>
            </div>
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

function BookOpenIcon(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
}
