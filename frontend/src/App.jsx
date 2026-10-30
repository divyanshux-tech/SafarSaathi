import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { SafarSaathiDashboard } from './components/agent/SafarSaathiDashboard';
import { SmartAuthProvider } from './components/auth/AuthProvider';
import { AuthPage } from './pages/AuthPage';

function App() {
  return (
    <SmartAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/chat" element={<SafarSaathiDashboard />} />
        </Routes>
      </BrowserRouter>
    </SmartAuthProvider>
  );
}

export default App;