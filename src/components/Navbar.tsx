import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, MessageSquare, User, Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-indigo-600">
          <BookOpen className="h-6 w-6" />
          <span className="font-bold text-xl tracking-tight">Linguistly</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <Link to="/tutors" className="hover:text-indigo-600 transition-colors flex items-center space-x-1">
            <Search className="w-4 h-4" />
            <span>Find Tutors</span>
          </Link>
          <Link to="/messages" className="hover:text-indigo-600 transition-colors flex items-center space-x-1">
            <MessageSquare className="w-4 h-4" />
            <span>Messages</span>
          </Link>
          <Link to="/dashboard" className="hover:text-indigo-600 transition-colors flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <div className="h-4 w-px bg-slate-200"></div>
          <Link to="/tutor-dashboard" className="text-slate-500 hover:text-slate-900">Tutor Portal</Link>
        </div>
        <div className="md:hidden">
          <Menu className="w-6 h-6 text-slate-600" />
        </div>
      </div>
    </nav>
  );
};
