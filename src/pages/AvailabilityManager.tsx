import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, CheckCircle2, CalendarDays } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MORNING_SLOTS = ['08:00', '09:00', '10:00', '11:00'];
const AFTERNOON_SLOTS = ['12:00', '13:00', '14:00', '15:00', '16:00'];
const EVENING_SLOTS = ['17:00', '18:00', '19:00', '20:00'];
const ALL_SLOTS = [...MORNING_SLOTS, ...AFTERNOON_SLOTS, ...EVENING_SLOTS];

export const AvailabilityManager: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [availability, setAvailability] = useState<Record<string, string[]>>({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchAvail = async () => {
      const { data } = await supabase.from('tutors').select('availability').eq('id', user.id).single();
      if (data && data.availability) {
        setAvailability(typeof data.availability === 'string' ? JSON.parse(data.availability) : data.availability as Record<string, string[]>);
      }
    };
    fetchAvail();
  }, [user]);

  const toggleSlot = (day: string, time: string) => {
    setAvailability(prev => {
      const daySlots = prev[day] || [];
      if (daySlots.includes(time)) {
        return { ...prev, [day]: daySlots.filter(t => t !== time) };
      } else {
        return { ...prev, [day]: [...daySlots, time].sort() };
      }
    });
  };

  const bulkToggle = (slotsToToggle: string[], state: boolean) => {
    setAvailability(prev => {
      const next = { ...prev };
      DAYS.forEach(day => {
        let daySlots = next[day] || [];
        if (state) {
          const toAdd = slotsToToggle.filter(s => !daySlots.includes(s));
          daySlots = [...daySlots, ...toAdd].sort();
        } else {
          daySlots = daySlots.filter(s => !slotsToToggle.includes(s));
        }
        next[day] = daySlots;
      });
      return next;
    });
  };

  const clearAll = () => setAvailability({});

  const handleSave = async () => {
    if (!user) return;
    
    const { error } = await supabase.from('tutors')
      .update({ availability: availability })
      .eq('id', user.id);
      
    if (!error) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      console.error(error);
    }
  };

  const totalSlotsActive = Object.values(availability).flat().length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-16 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <button onClick={() => navigate('/tutor-dashboard')} className="flex items-center text-slate-500 hover:text-indigo-600 mb-2 font-medium transition-colors">
              <ArrowLeft className="w-5 h-5 mr-1" /> Back to Dashboard
            </button>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <CalendarDays className="w-8 h-8 text-indigo-600" /> Manage Availability
            </h1>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="text-sm font-medium text-slate-500 hidden md:block">
              <span className="text-indigo-600 font-bold">{totalSlotsActive}</span> slots available
            </div>
            <button 
              onClick={handleSave}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-all"
            >
              <Save className="w-5 h-5" /> Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 w-full">
        
        {/* Bulk Actions */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex gap-4 items-center">
            <span className="font-bold text-slate-700">Legend:</span>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600"><div className="w-4 h-4 rounded bg-indigo-600"></div> Available</div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600"><div className="w-4 h-4 rounded bg-slate-100 border border-slate-200"></div> Unavailable</div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button onClick={() => bulkToggle(MORNING_SLOTS, true)} className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition">All Mornings</button>
            <button onClick={() => bulkToggle(AFTERNOON_SLOTS, true)} className="px-4 py-2 bg-orange-50 text-orange-700 font-semibold rounded-lg hover:bg-orange-100 transition">All Afternoons</button>
            <button onClick={() => bulkToggle(EVENING_SLOTS, true)} className="px-4 py-2 bg-purple-50 text-purple-700 font-semibold rounded-lg hover:bg-purple-100 transition">All Evenings</button>
            <div className="w-px h-10 bg-slate-200 hidden md:block"></div>
            <button onClick={clearAll} className="px-4 py-2 bg-slate-100 text-slate-600 font-semibold rounded-lg hover:bg-slate-200 transition">Clear All</button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Headers */}
            <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50">
              <div className="p-4 border-r border-slate-200 font-bold text-slate-400 uppercase text-xs tracking-wider flex items-center justify-center">Time</div>
              {DAYS.map(day => (
                <div key={day} className="p-4 text-center font-bold text-slate-800 border-r border-slate-200 last:border-0">{day}</div>
              ))}
            </div>

            {/* Time Rows */}
            <div className="divide-y divide-slate-100">
              {/* Morning Group */}
              <div className="bg-blue-50/50 p-2 text-xs font-bold text-blue-600 uppercase tracking-widest text-center border-b border-slate-100">Morning</div>
              {MORNING_SLOTS.map(time => (
                <div key={time} className="grid grid-cols-8 hover:bg-slate-50 transition-colors">
                  <div className="p-3 border-r border-slate-200 font-bold text-slate-500 text-sm flex items-center justify-center">{time}</div>
                  {DAYS.map(day => {
                    const isActive = (availability[day] || []).includes(time);
                    return (
                      <div key={`${day}-${time}`} className="p-2 border-r border-slate-200 last:border-0 flex items-center justify-center">
                        <button 
                          onClick={() => toggleSlot(day, time)} 
                          className={`w-full h-10 rounded-lg transition-all ${isActive ? 'bg-indigo-600 shadow-md shadow-indigo-200 scale-100' : 'bg-slate-100 hover:bg-slate-200 border border-slate-200 scale-95 hover:scale-100'}`}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Afternoon Group */}
              <div className="bg-orange-50/50 p-2 text-xs font-bold text-orange-600 uppercase tracking-widest text-center border-b border-slate-100">Afternoon</div>
              {AFTERNOON_SLOTS.map(time => (
                <div key={time} className="grid grid-cols-8 hover:bg-slate-50 transition-colors">
                  <div className="p-3 border-r border-slate-200 font-bold text-slate-500 text-sm flex items-center justify-center">{time}</div>
                  {DAYS.map(day => {
                    const isActive = (availability[day] || []).includes(time);
                    return (
                      <div key={`${day}-${time}`} className="p-2 border-r border-slate-200 last:border-0 flex items-center justify-center">
                        <button 
                          onClick={() => toggleSlot(day, time)} 
                          className={`w-full h-10 rounded-lg transition-all ${isActive ? 'bg-indigo-600 shadow-md shadow-indigo-200 scale-100' : 'bg-slate-100 hover:bg-slate-200 border border-slate-200 scale-95 hover:scale-100'}`}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Evening Group */}
              <div className="bg-purple-50/50 p-2 text-xs font-bold text-purple-600 uppercase tracking-widest text-center border-b border-slate-100">Evening</div>
              {EVENING_SLOTS.map(time => (
                <div key={time} className="grid grid-cols-8 hover:bg-slate-50 transition-colors">
                  <div className="p-3 border-r border-slate-200 font-bold text-slate-500 text-sm flex items-center justify-center">{time}</div>
                  {DAYS.map(day => {
                    const isActive = (availability[day] || []).includes(time);
                    return (
                      <div key={`${day}-${time}`} className="p-2 border-r border-slate-200 last:border-0 flex items-center justify-center">
                        <button 
                          onClick={() => toggleSlot(day, time)} 
                          className={`w-full h-10 rounded-lg transition-all ${isActive ? 'bg-indigo-600 shadow-md shadow-indigo-200 scale-100' : 'bg-slate-100 hover:bg-slate-200 border border-slate-200 scale-95 hover:scale-100'}`}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            
          </div>
        </div>

      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-6 right-6 bg-slate-900 border border-slate-700 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <CheckCircle2 className="w-6 h-6 text-green-400" />
        <span className="font-bold">Availability saved successfully!</span>
      </div>

    </div>
  );
};
