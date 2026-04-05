import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Star, MessageSquare, Play, Calendar, CheckCircle2, Award, BookOpen, GraduationCap, Zap, Globe } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col bg-slate-50 pt-16 relative">
      {/* Solid Purple Background */}
      <div className="absolute top-16 left-0 right-0 h-64 bg-[#7e22ce] z-0"></div>

      <div className="max-w-7xl mx-auto w-full px-6 pt-10 relative z-10">
        {/* Main Header Card */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-8">
           
           {/* Top flex row: Avatar + Name + Action/Price */}
           <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
             
             {/* Avatar element */}
             <div className="relative flex-shrink-0">
               <img src={tutor.avatar} alt={tutor.name} className="w-32 h-32 rounded-3xl border border-slate-100 bg-indigo-50 shadow-sm" />
               {tutor.is_online && (
                 <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
               )}
             </div>

             {/* Name & Rating */}
             <div className="flex-1">
               <div className="flex items-center gap-3 mb-2">
                 <h1 className="text-[2.5rem] font-extrabold text-slate-900 leading-none tracking-tight">{tutor.name}</h1>
                 <img src={`https://flagcdn.com/w40/${tutor.country_code}.png`} alt="Flag" className="w-8 rounded shadow-sm" />
                 <CheckCircle2 className="w-6 h-6 text-blue-500" />
               </div>
               <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                 <Star className="w-5 h-5 text-orange-500 fill-current" /> 
                 <span>{tutor.rating.toFixed(1)}</span>
                 <span className="font-normal text-slate-400">({tutor.reviews.length} reviews)</span>
               </div>
             </div>

             {/* Price and Buttons */}
             <div className="flex flex-col items-center md:items-end gap-3 min-w-[240px]">
                <div className="text-right">
                  <span className="text-[2.5rem] font-black text-indigo-700 leading-none">${tutor.price}</span>
                  <span className="text-sm font-bold text-slate-400 ml-1">/hr</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button onClick={() => navigate(`/book/${tutor.id}`)} className="flex-1 bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-indigo-700 transition">
                    Book Trial Lesson
                  </button>
                  <button onClick={() => navigate(`/messages?tutor=${tutor.id}`)} className="flex-1 bg-white text-indigo-600 border border-indigo-200 font-bold py-2.5 px-6 rounded-xl hover:bg-indigo-50 transition">
                    Send Message
                  </button>
                </div>
             </div>
           </div>

           {/* Divider */}
           <div className="w-full h-px bg-slate-100 my-8"></div>

           {/* Stats Row */}
           <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:divide-x divide-slate-100">
             <div className="flex flex-col items-center gap-1.5">
               <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold">
                 <BookOpen className="w-5 h-5" /> {tutor.lessons_taught}
               </div>
               <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Lessons</div>
             </div>
             
             <div className="flex flex-col items-center gap-1.5">
               <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold">
                 <UsersIcon className="w-5 h-5" /> {tutor.total_students}
               </div>
               <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Students</div>
             </div>
             
             <div className="flex flex-col items-center gap-1.5">
               <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold">
                 <CheckCircle2 className="w-5 h-5" /> {tutor.completion_rate}%
               </div>
               <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Completion</div>
             </div>
             
             <div className="flex flex-col items-center gap-1.5">
               <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold">
                 <Zap className="w-5 h-5" /> {tutor.response_time}
               </div>
               <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Response</div>
             </div>
             
             <div className="flex flex-col items-center gap-1.5">
               <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold">
                 <Globe className="w-5 h-5" /> {tutor.languages.length}
               </div>
               <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Languages</div>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12 flex flex-col lg:flex-row gap-12 w-full mt-2">
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
