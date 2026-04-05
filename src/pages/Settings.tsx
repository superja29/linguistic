import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Footer } from '../components/Footer';
import { User, Bell, Sliders, Save, CheckCircle2, ArrowLeft } from 'lucide-react';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { tutors, updateTutorProfile } = useAppContext();
  
  // Since we don't have auth, default to tutor-1
  const currentUser = tutors.find(t => t.id === 'tutor-1');
  
  const [activeTab, setActiveTab] = useState('profile');
  const [showToast, setShowToast] = useState(false);
  
  // Local state for profile edits
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    about: currentUser?.about || '',
    philosophy: currentUser?.philosophy || '',
    specialties: currentUser?.specialties?.join(', ') || '',
    topics_taught: currentUser?.topics_taught?.join(', ') || '',
    price: currentUser?.price || 0,
    video_url: currentUser?.video_url || '',
    email: 'sarah.jenkins@example.com' // Mock email since Model doesn't have it
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'price' ? Number(value) : value 
    }));
  };

  const handleSave = () => {
    if (currentUser) {
      updateTutorProfile(currentUser.id, {
        name: formData.name,
        bio: formData.bio,
        about: formData.about,
        philosophy: formData.philosophy,
        specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s),
        topics_taught: formData.topics_taught.split(',').map(s => s.trim()).filter(s => s),
        price: formData.price,
        video_url: formData.video_url
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        
        <button onClick={() => navigate('/tutor-dashboard')} className="flex items-center text-slate-500 hover:text-indigo-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-5 h-5 mr-1" /> Back to Dashboard
        </button>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Settings</h1>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sticky top-24">
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <User className="w-5 h-5" /> Profile Settings
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'notifications' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Bell className="w-5 h-5" /> Notifications
              </button>
              <button 
                onClick={() => setActiveTab('preferences')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'preferences' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Sliders className="w-5 h-5" /> App Preferences
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm p-8 w-full">
            
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Public Profile</h2>
                  <p className="text-slate-500 text-sm mb-6">Update your tutor information visible to students.</p>
                </div>

                <div className="flex items-center gap-6 mb-8">
                  <img src={currentUser?.avatar} className="w-20 h-20 rounded-2xl bg-indigo-50" />
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl transition-colors">
                    Change Avatar
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-600" 
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-600" 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Hourly Rate (USD)</label>
                    <input 
                      type="number" 
                      name="price"
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-600" 
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Intro Video URL</label>
                    <input 
                      type="url" 
                      name="video_url"
                      placeholder="https://..."
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-600" 
                      value={formData.video_url}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Short Bio</label>
                  <input 
                    type="text" 
                    name="bio"
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-600" 
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Short catching phrase..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Detailed About Section</label>
                  <textarea 
                    name="about"
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-600 min-h-[120px]" 
                    value={formData.about}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Teaching Philosophy</label>
                  <input 
                    type="text" 
                    name="philosophy"
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-600" 
                    value={formData.philosophy}
                    onChange={handleChange}
                    placeholder="e.g. Conversation-first approach emphasizing practical usage."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Specialties (comma separated)</label>
                    <input 
                      type="text" 
                      name="specialties"
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-600" 
                      value={formData.specialties}
                      onChange={handleChange}
                      placeholder="e.g. Test Prep, IELTS, TOEFL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Topics Taught (comma separated)</label>
                    <input 
                      type="text" 
                      name="topics_taught"
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-600" 
                      value={formData.topics_taught}
                      onChange={handleChange}
                      placeholder="e.g. Business Emails, Slang, Grammar"
                    />
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={handleSave}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" /> Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 mb-1">Email Notifications</h2>
                <p className="text-slate-500 text-sm mb-6">Choose what updates you want to receive.</p>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                    <span className="font-medium text-slate-700">New lesson bookings</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                    <span className="font-medium text-slate-700">Student messages</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                    <span className="font-medium text-slate-700">Marketing & tips</span>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 mb-1">Preferences</h2>
                <p className="text-slate-500 text-sm mb-6">Manage platform behavior.</p>
                <div>
                  <h3 className="font-bold text-slate-700 mb-4">Currency Display</h3>
                  <select className="border border-slate-200 rounded-lg px-4 py-2 font-medium">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      <Footer />

      {/* Toast */}
      <div className={`fixed bottom-6 right-6 bg-slate-900 border border-slate-700 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform z-50 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <CheckCircle2 className="w-6 h-6 text-green-400" />
        <span className="font-bold">Profile updated successfully!</span>
      </div>

    </div>
  );
};
