import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Footer } from '../components/Footer';
import { User, Bell, Sliders, Save, CheckCircle2, ArrowLeft, Loader2, Image as ImageIcon, UploadCloud } from 'lucide-react';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  
  const [isTutor, setIsTutor] = useState(false);
  
  // Local state for profile edits
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    country_code: '',
    timezone: '',
    bio: '',
    about: '',
    philosophy: '',
    specialties: '',
    topics_taught: '',
    price: 0,
    video_url: '',
    email: '' // Not directly editable but displayed
  });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      // Get generic profile
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      
      // Attempt to get tutor data
      const { data: tutor, error: tutorError } = await supabase.from('tutors').select('*').eq('id', user.id).single();
      
      if (tutor && !tutorError) {
        setIsTutor(true);
      } else {
        setIsTutor(false);
      }

      setFormData({
        name: profile?.name || '',
        avatar: profile?.avatar || '',
        country_code: profile?.country_code || '',
        timezone: profile?.timezone || '',
        email: user.email || '',
        bio: tutor?.bio || '',
        about: tutor?.about || '',
        philosophy: tutor?.philosophy || '',
        specialties: Array.isArray(tutor?.specialties) ? tutor.specialties.join(', ') : '',
        topics_taught: Array.isArray(tutor?.topics_taught) ? tutor.topics_taught.join(', ') : '',
        price: tutor?.price || 5, // Fallback if 0
        video_url: tutor?.video_url || ''
      });
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'price' ? Number(value) : value 
    }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      const file = e.target.files[0];
      setUploadingAvatar(true);

      if (!user) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, avatar: publicUrl }));
      
      // Immediately save it to profiles to avoid losing it if they leave
      await supabase.from('profiles').update({ avatar: publicUrl }).eq('id', user.id);

    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar!');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    
    // Always update base profile information
    await supabase.from('profiles').update({ 
      name: formData.name,
      avatar: formData.avatar,
      country_code: formData.country_code,
      timezone: formData.timezone
    }).eq('id', user.id);

    // Update specific tutor info ONLY if user is a verified tutor (row exists)
    if (isTutor) {
      const specialtiesArray = formData.specialties.split(',').map(s => s.trim()).filter(s => s);
      const topicsArray = formData.topics_taught.split(',').map(s => s.trim()).filter(s => s);

      await supabase.from('tutors').update({
        bio: formData.bio,
        about: formData.about,
        philosophy: formData.philosophy,
        specialties: specialtiesArray,
        topics_taught: topicsArray,
        price: formData.price,
        video_url: formData.video_url
      }).eq('id', user.id);
    }

    setSaving(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (loading) {
    return <div className="min-h-screen pt-32 text-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600"/></div>;
  }

  const computedAvatar = formData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'U')}`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full">
        
        <button onClick={() => navigate('/dashboard')} className="flex items-center text-slate-500 hover:text-indigo-600 mb-8 font-medium transition-colors">
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
              <div className="space-y-8">
                
                {/* 1. SECTION: BASIC PROFILE (APPLIES TO EVERYONE) */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-1">Basic Information</h2>
                    <p className="text-slate-500 text-sm mb-6">Update your general identity across Linguistly.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <img src={computedAvatar} className="w-24 h-24 rounded-full bg-indigo-100 object-cover border-4 border-white shadow-sm" alt="Profile avatar" />
                    
                    <div className="flex-1 w-full">
                      <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-slate-400" /> Upload Avatar Photo
                      </label>
                      <div className="relative">
                        <input 
                          type="file" 
                          id="avatar-upload"
                          accept="image/*"
                          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" 
                          onChange={handleAvatarUpload}
                          disabled={uploadingAvatar}
                        />
                        <div className={`w-full border-2 border-dashed rounded-xl px-4 py-6 flex flex-col items-center justify-center transition-colors ${uploadingAvatar ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-300 hover:border-indigo-500 hover:bg-slate-50'}`}>
                          {uploadingAvatar ? (
                            <Loader2 className="w-6 h-6 animate-spin text-indigo-600 mb-2" />
                          ) : (
                            <UploadCloud className="w-6 h-6 text-slate-400 mb-2" />
                          )}
                          <span className="font-medium text-slate-700">
                            {uploadingAvatar ? 'Uploading...' : 'Click or drop a picture here'}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">Max file size 2MB. JPEGs and PNGs supported.</p>
                    </div>
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
                      <label className="block text-sm font-bold text-slate-700 mb-2 text-slate-400">Email Address (Read-only)</label>
                      <input 
                        type="email" 
                        name="email"
                        disabled
                        className="w-full border-2 border-slate-100 bg-slate-50 text-slate-400 rounded-xl px-4 py-3 cursor-not-allowed" 
                        value={formData.email}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Location/Country Code (e.g. US, CL, MX)</label>
                      <input 
                        type="text" 
                        name="country_code"
                        placeholder="US"
                        maxLength={2}
                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-600 uppercase" 
                        value={formData.country_code}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Timezone</label>
                      <input 
                        type="text" 
                        name="timezone"
                        placeholder="e.g. America/Santiago"
                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-600" 
                        value={formData.timezone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. SECTION: TUTOR SPECIFIC SETTINGS */}
                {isTutor && (
                  <div className="space-y-6 pt-8 border-t border-slate-100 mt-8">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-1">Tutor Profile</h2>
                      <p className="text-slate-500 text-sm mb-6">Settings specifically for your public tutoring services.</p>
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
                  </div>
                )}

                {!isTutor && (
                  <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
                    <div>
                      <h3 className="text-indigo-900 font-bold text-lg">Are you a teacher?</h3>
                      <p className="text-indigo-700 text-sm">Become a tutor in Linguistly and share your knowledge with the world.</p>
                    </div>
                    <button 
                      onClick={() => navigate('/tutor-dashboard')}
                      className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded-xl transition-all shadow-sm"
                    >
                      Join as Tutor
                    </button>
                  </div>
                )}

                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} 
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 mb-1">Email Notifications</h2>
                <p className="text-slate-500 text-sm mb-6">Choose what updates you want to receive.</p>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                    <span className="font-medium text-slate-700">New lesson bookings</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                    <span className="font-medium text-slate-700">Student messages</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
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
                  <select className="border border-slate-200 rounded-xl px-4 py-3 font-medium outline-none focus:border-indigo-600">
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
