import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, MessageSquare, User, Menu, LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

export const Navbar: React.FC = () => {
  const { user, signOut, loading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
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

            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
            ) : user ? (
              <>
                <Link to="/messages" className="hover:text-indigo-600 transition-colors flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages</span>
                </Link>
                <Link to="/dashboard" className="hover:text-indigo-600 transition-colors flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/tutor-dashboard" className="text-slate-500 hover:text-slate-900 ml-2">Tutor Portal</Link>
                <div className="h-4 w-px bg-slate-200"></div>
                
                <button 
                  onClick={signOut}
                  className="hover:text-red-600 transition-colors flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <div className="h-4 w-px bg-slate-200"></div>
                <button 
                  onClick={() => openAuth('login')}
                  className="hover:text-indigo-600 transition-colors font-semibold"
                >
                  Log In
                </button>
                <button 
                  onClick={() => openAuth('signup')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-colors shadow-sm"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
          
          <div className="md:hidden flex items-center space-x-4">
            {!loading && !user && (
              <button 
                onClick={() => openAuth('login')}
                className="text-sm font-semibold text-indigo-600"
              >
                Log In
              </button>
            )}
            <Menu className="w-6 h-6 text-slate-600" />
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
      />
    </>
  );
};
