import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Star, MessageSquare, Play, Calendar, CheckCircle2, Award, BookOpen, GraduationCap } from 'lucide-react';
import { Footer } from '../components/Footer';
import { TutorCard } from '../components/TutorCard';

export const TutorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tutors } = useAppContext();
  const navigate = useNavigate();
  
  const tutor = tutors.find(t => t.id === id);
  const similarTutors = tutors.filter(t => t.id !== id).slice(0, 3);

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tutor not found</h2>
          <button onClick={() => navigate('/tutors')} className="text-indigo-600 underline">Back to Marketplace</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pt-16">
      <div className="bg-white border-b border-slate-200">
        <div className="h-48 bg-gradient-to-r from-indigo-900 to-indigo-800 w-full relative">
          <div className="absolute -bottom-16 left-6 md:left-auto md:max-w-7xl md:mx-auto w-full px-6 flex items-end relative h-full">
            <div className="relative transform translate-y-16">
              <img src={tutor.avatar} alt={tutor.name} className="w-32 h-32 rounded-3xl border-4 border-white bg-indigo-50 shadow-lg" />
              {tutor.is_online && (
               <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-20 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-slate-900">{tutor.name}</h1>
              <img src={`https://flagcdn.com/w40/${tutor.country_code}.png`} alt="Flag" className="w-8 rounded shadow-sm" />
            </div>
            <p className="text-lg text-slate-500 font-medium">Professional English Tutor</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm font-medium text-slate-600">
              <div className="flex items-center gap-1"><Star className="w-5 h-5 text-orange-500 fill-current" /> {tutor.rating.toFixed(1)} ({tutor.reviews.length} reviews)</div>
              <div className="flex items-center gap-1"><UsersIcon className="w-5 h-5 text-indigo-500" /> {tutor.total_students} students</div>
              <div className="flex items-center gap-1"><CheckCircle2 className="w-5 h-5 text-green-500" /> {tutor.completion_rate}% completion</div>
            </div>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <button onClick={() => navigate(`/messages?tutor=${tutor.id}`)} className="flex-1 md:flex-none flex items-center justify-center gap-2 border-2 border-indigo-100 text-indigo-700 bg-white hover:bg-slate-50 px-6 py-3 rounded-xl font-bold transition-colors">
              <MessageSquare className="w-5 h-5" /> Message
            </button>
            <button onClick={() => navigate(`/book/${tutor.id}`)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-3 rounded-xl font-bold transition-all shadow-md shadow-indigo-200">
              <Calendar className="w-5 h-5" /> Book Trial
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 w-full">
        {/* Main Content */}
        <div className="flex-1 space-y-12">
          {/* Video Section */}
          {tutor.video_url ? (
            <section className="relative rounded-3xl overflow-hidden aspect-video bg-slate-100 shadow-sm border border-slate-200">
              <iframe 
                src={tutor.video_url} 
                title={`${tutor.name} Intro Video`} 
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </section>
          ) : (
            <section className="relative rounded-3xl overflow-hidden aspect-video bg-gradient-to-tr from-indigo-500 to-indigo-900 flex items-center justify-center shadow-lg group cursor-pointer border border-indigo-900/10">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="relative w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-10 h-10 text-white fill-current ml-2" />
              </div>
              <div className="absolute bottom-6 left-6 text-white font-bold text-xl drop-shadow-md">
                Watch {tutor.name.split(' ')[0]}'s Introduction
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">About Me</h2>
            <div className="prose prose-slate bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-600 leading-relaxed">{tutor.about}</p>
              <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Teaching Philosophy</h3>
              <p className="text-slate-600 italic">"{tutor.philosophy}"</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Award className="w-6 h-6 text-indigo-600" /> Specialties & Topics</h2>
            <div className="flex flex-wrap gap-2">
              {tutor.specialties.map(spec => (
                <span key={spec} className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-xl border border-indigo-100">{spec}</span>
              ))}
              {tutor.topics_taught.map(topic => (
                <span key={topic} className="px-4 py-2 bg-slate-100 text-slate-600 font-medium rounded-xl border border-slate-200">{topic}</span>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-600" /> Typical Lesson</h3>
              <ul className="space-y-4">
                {tutor.lesson_structure.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">{idx + 1}</div>
                    <div className="pt-1 text-slate-700 font-medium">{step}</div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-indigo-600" /> Education</h3>
                <ul className="space-y-3">
                  {tutor.education.map((edu, idx) => (
                    <li key={idx} className="flex flex-col">
                      <span className="font-semibold text-slate-800">{edu.degree}</span>
                      <span className="text-sm text-slate-500">{edu.institution}, {edu.year}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {tutor.certifications.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-indigo-600" /> Certifications</h3>
                  <ul className="space-y-3">
                    {tutor.certifications.map((cert, idx) => (
                      <li key={idx} className="flex flex-col">
                        <span className="font-semibold text-slate-800">{cert.name}</span>
                        <span className="text-sm text-slate-500">{cert.issuer}, {cert.year}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Calendar className="w-6 h-6 text-indigo-600" /> Weekly Availability</h2>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-sm">
              <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="py-3 text-center font-bold text-slate-700 border-r border-slate-100 last:border-0">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                  const fullDay = Object.keys(tutor.availability).find(d => d.startsWith(day));
                  const times = fullDay ? tutor.availability[fullDay] : [];
                  return (
                    <div key={day} className="border-r border-slate-100 last:border-0 min-h-[200px] p-2 flex flex-col gap-2">
                       {times.map(time => (
                         <button 
                           key={time} 
                           onClick={() => navigate(`/book/${tutor.id}`)}
                           className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-2 rounded-lg transition-colors border border-indigo-100/50"
                         >
                           {time}
                         </button>
                       ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Student Reviews</h2>
            <div className="space-y-6">
              {tutor.reviews.map((r, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <img src={r.avatar} className="w-12 h-12 rounded-full bg-slate-100" />
                      <div>
                        <h4 className="font-bold text-slate-900">{r.name}</h4>
                        <span className="text-sm text-slate-500">{r.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 text-orange-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={idx < r.rating ? "fill-current w-4 h-4" : "text-slate-200 w-4 h-4"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700">{r.comment}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-lg shadow-indigo-100/50 sticky top-24">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4">Lesson Packages</h3>
              <div className="space-y-3">
                {tutor.hourly_packages.map((pkg, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-50 hover:bg-slate-100 p-4 rounded-xl cursor-pointer border border-slate-100 transition-colors">
                    <div>
                      <div className="font-bold text-slate-900">{pkg.name}</div>
                      <div className="text-sm text-slate-500">{pkg.hours} {pkg.hours === 1 ? 'hour' : 'hours'} {pkg.savings && <span className="text-green-600 font-medium ml-2">{pkg.savings}</span>}</div>
                    </div>
                    <div className="text-lg font-extrabold text-indigo-600">${pkg.price}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <button onClick={() => navigate(`/book/${tutor.id}`)} className="w-full bg-indigo-600 text-white hover:bg-indigo-700 py-4 rounded-xl font-bold text-lg mb-4 transition-all active:scale-95 shadow-md">
              Book a Lesson
            </button>
            <p className="text-center text-sm text-slate-500 font-medium">💰 100% Satisfaction Guarantee</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

function UsersIcon(props: any) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
