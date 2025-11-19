import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProfileForm } from './components/ProfileForm';
import { Results } from './components/Results';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { AdminDashboard } from './components/AdminDashboard';
import { Button } from './components/Button';
import { UserMeasurements, Gender } from './types';

type ViewState = 'home' | 'form' | 'results' | 'login' | 'signup' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [userData, setUserData] = useState<UserMeasurements | null>(null);
  const [currentUser, setCurrentUser] = useState<{name: string, gender?: Gender} | null>(null);

  const handleStartConsultation = () => {
    setView('form');
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = (data: UserMeasurements) => {
    setUserData(data);
    setView('results');
    window.scrollTo(0, 0);
  };

  const handleLogoClick = () => {
    setView('home');
    window.scrollTo(0, 0);
  };

  const handleLogin = (username: string) => {
    if (username.toLowerCase() === 'admin') {
      setCurrentUser({ name: 'Admin' });
      setView('admin');
    } else {
      setCurrentUser({ name: username, gender: Gender.FEMALE }); // Mock gender for demo
      setView('home');
    }
  };

  const handleSignup = (username: string, gender: Gender) => {
    setCurrentUser({ name: username, gender });
    // Auto redirect to profile creation with pre-filled name/gender
    setView('form');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('home');
  };

  // If Admin view, render dashboard without header/footer
  if (view === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900 selection:bg-blue-100">
      <Header 
        onLogoClick={handleLogoClick} 
        onLoginClick={() => setView('login')} 
        currentUser={currentUser?.name || null}
      />

      <main className="flex-grow w-full">
        
        {/* Prompt 1: Homepage Structure */}
        {view === 'home' && (
          <div className="relative">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
              <span className="text-blue-950 font-medium tracking-widest uppercase text-sm mb-6">
                Personalized Fashion AI
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight">
                Find Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-700">
                  Perfect Style
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
                Discover outfits tailored to your unique body shape and skin tone using advanced AI analysis. Stop guessing, start dressing with confidence.
              </p>
              
              <Button onClick={handleStartConsultation} className="text-lg px-10 py-4">
                Start Consultation
              </Button>
            </div>

            {/* Minimalist visual element */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent -z-10"></div>
          </div>
        )}

        {/* Prompt 8: Login Page */}
        {view === 'login' && (
          <div className="bg-slate-50 py-12 px-4 min-h-[80vh] flex items-center">
            <Login onLogin={handleLogin} onSwitchToSignup={() => setView('signup')} />
          </div>
        )}

        {/* Prompt 7: Signup Page */}
        {view === 'signup' && (
          <div className="bg-slate-50 py-12 px-4 min-h-[80vh] flex items-center">
            <Signup onSignup={handleSignup} onSwitchToLogin={() => setView('login')} />
          </div>
        )}

        {/* Prompt 2: Form Page */}
        {view === 'form' && (
          <div className="bg-slate-50 py-12 px-4 min-h-[80vh] flex items-center">
            <ProfileForm 
              onSubmit={handleFormSubmit} 
              initialData={currentUser ? { name: currentUser.name, gender: currentUser.gender } : {}}
            />
          </div>
        )}

        {/* Prompt 5: Results Page */}
        {view === 'results' && userData && (
          <div className="bg-slate-50 py-12 px-4 min-h-[80vh]">
            <Results userData={userData} onRetry={handleStartConsultation} />
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default App;