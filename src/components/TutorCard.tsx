import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tutor } from '../types';
import { Star, MessageSquare, Heart } from 'lucide-react';
import { cn } from '../utils/cn';
import { useAppContext } from '../context/AppContext';

interface Props {
  tutor: Tutor;
  className?: string;
}

export const TutorCard: React.FC<Props> = ({ tutor, className }) => {
  const { favoriteTutors, toggleFavorite } = useAppContext();
  const isFavorite = favoriteTutors.includes(tutor.id);

  return (
    <div className={cn("bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative", className)}>
      
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(tutor.id);
        }}
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white hover:scale-110 text-slate-400 hover:text-pink-500 transition-all border border-slate-100"
      >
        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-pink-500 text-pink-500' : 'text-slate-400 leading-none'}`} />
      </button>

      <div className="flex items-start justify-between mb-4 mt-2">
        <div className="relative">
          <img src={tutor.avatar} alt={tutor.name} className="w-16 h-16 rounded-2xl bg-indigo-50" />
          {tutor.is_online && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          )}
          <img 
            src={`https://flagcdn.com/w40/${tutor.country_code}.png`} 
            alt="Flag" 
            className="absolute -bottom-2 -right-2 w-6 h-4 rounded shadow-sm"
          />
        </div>
        <div className="flex flex-col items-end pr-10">
          <span className="text-lg font-bold text-slate-900">${tutor.price}<span className="text-sm font-normal text-slate-400">/hr</span></span>
          <div className="flex items-center space-x-1 text-orange-500 font-medium">
            <Star className="w-4 h-4 fill-current" />
            <span>{tutor.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <Link to={`/tutor/${tutor.id}`} className="hover:text-indigo-600 transition-colors">
            {tutor.name}
          </Link>
        </h3>
        <p className="text-sm text-slate-500 mt-1 line-clamp-2">
          {tutor.bio}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tutor.specialties.map(spec => (
            <span key={spec} className="px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded-lg font-medium border border-slate-100">
              {spec}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-50 flex gap-3">
        <Link 
          to={`/book/${tutor.id}`} 
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-center transition-all active:scale-95"
        >
          Book Trial
        </Link>
        <Link 
          to={`/messages?tutor=${tutor.id}`} 
          className="w-11 flex items-center justify-center bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl transition-all active:scale-95"
          title="Send Message"
        >
          <MessageSquare className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};
