import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Marketplace } from './pages/Marketplace';
import { TutorProfile } from './pages/TutorProfile';
import { Booking } from './pages/Booking';
import { StudentDashboard } from './pages/StudentDashboard';
import { TutorDashboard } from './pages/TutorDashboard';
import { AvailabilityManager } from './pages/AvailabilityManager';
import { Settings } from './pages/Settings';
import { Messages } from './pages/Messages';

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  return (
    <AuthProvider>
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
              <Route path="/messages" element={<Messages />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
