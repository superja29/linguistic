import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { TutorCard } from '../components/TutorCard';
import { Footer } from '../components/Footer';

export const Marketplace: React.FC = () => {
  const { tutors, searchQuery, setSearchQuery } = useAppContext();
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'lessons'>('rating');

  const filteredTutors = useMemo(() => {
    let result = tutors.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.bio.toLowerCase().includes(searchQuery.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'lessons') return b.lessons_taught - a.lessons_taught;
      return 0;
    });

    return result;
  }, [tutors, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pt-16">
      <div className="bg-white border-b border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Find Your Perfect Tutor</h1>
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-shadow"
                placeholder="Search by name, specialty, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-slate-500 font-medium whitespace-nowrap hidden lg:block">Sort by:</span>
              <div className="relative w-full md:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full appearance-none bg-white border border-slate-200 px-4 py-3 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-slate-700 cursor-pointer"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price">Lowest Price</option>
                  <option value="lessons">Most Lessons</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="mb-6 flex justify-between items-center text-slate-600 font-medium">
          <span>Showing {filteredTutors.length} tutors</span>
        </div>

        {filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutors.map(tutor => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No tutors found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search criteria</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="bg-indigo-50 text-indigo-700 font-semibold px-6 py-2 rounded-xl"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
