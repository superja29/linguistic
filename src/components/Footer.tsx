import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Linguistly</h3>
          <p className="text-sm">Empowering the world to speak confidently, one lesson at a time.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Students</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/tutors" className="hover:text-white transition-colors">Find Tutors</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">How it Works</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Reviews</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Tutors</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/become-tutor" className="hover:text-white transition-colors">Become a Tutor</Link></li>
            <li><Link to="/tutor-dashboard" className="hover:text-white transition-colors">Tutor Dashboard</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Rules</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-sm flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Linguistly. All rights reserved.</p>
      </div>
    </footer>
  );
};
