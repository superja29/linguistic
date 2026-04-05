import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Marketplace } from './pages/Marketplace';
import { TutorProfile } from './pages/TutorProfile';
import { Booking } from './pages/Booking';
import { StudentDashboard } from './pages/StudentDashboard';
import { TutorDashboard } from './pages/TutorDashboard';
import { AvailabilityManager } from './pages/AvailabilityManager';
import { Settings } from './pages/Settings';

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/tutors" element={<Marketplace />} />
            <Route path="/tutor/:id" element={<TutorProfile />} />
            <Route path="/book/:id" element={<Booking />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/tutor-dashboard" element={<TutorDashboard />} />
            <Route path="/tutor-availability" element={<AvailabilityManager />} />
            <Route path="/settings" element={<Settings />} />
            {/* Fallback routes for pages not critical to MVP but listed in PRD */}
            <Route path="/messages" element={<div className="pt-32 text-center text-2xl font-bold">Messages Integration Coming Soon</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
