import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Sections & Components
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { Partners } from "./sections/Partners";
import { Internships } from "./sections/Internships";
import { TaskPortal } from "./sections/TaskPortal";
import { InstructorSection } from "./sections/InstructorSection";
import { CareerLaunch } from "./sections/CareerLaunch";
import { MockInterview } from "./sections/MockInterview";
import { HowItWorks } from "./sections/HowItWorks";
import { AICareerPath } from "./sections/AICareerPath";
import { Testimonials } from "./sections/Testimonials";
import { CTABanner } from "./sections/CTABanner";
import { StatsBar } from "./sections/StatsBar";
import { Footer } from "./sections/Footer";

// Modals & Pages
import ApplyModal from "./components/ApplyModal";
import AuthModal from "./components/Auth/AuthModal"; 
import FileManager from './components/FileManager';
import AdminDashboard from "./pages/AdminDashboard";
// ✅ 1. IMPORT THE NEW INTERN DASHBOARD
import InternDashboard from "./pages/InternDashboard";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("");
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleOpenModal = (track: string = "") => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSelectedTrack(track); 
      localStorage.setItem("pendingTrack", track);
      setIsAuthModalOpen(true); 
    } else {
      setSelectedTrack(track);
      setIsModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    const pending = localStorage.getItem("pendingTrack");
    if (pending) {
      setSelectedTrack(pending);
      setIsModalOpen(true); 
      localStorage.removeItem("pendingTrack");
    }
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrack("");
  };

  const isAdmin = () => {
    return localStorage.getItem("token") && localStorage.getItem("role") === "admin";
  };

  return (
    <Router>
      <div className="font-outfit text-neutral-900 bg-white selection:bg-lime-200">
        
        <Navbar 
          isLoggedIn={isLoggedIn} 
          onApplyClick={() => handleOpenModal("General")} 
          onLoginClick={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={
            <main>
              <Hero onApplyClick={() => handleOpenModal("General")} />
              <Partners />
              <Internships onApplyClick={handleOpenModal} />
              
              <div className="text-white bg-neutral-900"><TaskPortal /></div>

              <div className="bg-gray-50 py-16 border-y border-gray-200">
                <div className="max-w-screen-xl mx-auto px-4 md:px-8 text-center mb-10">
                  <h2 className="text-3xl font-bold text-neutral-900">Cloud Document Vault</h2>
                  <p className="text-neutral-600 mt-2">Securely upload and manage documents using AWS S3.</p>
                  <FileManager />
                </div>
              </div>

              <InstructorSection />
              <CareerLaunch />
              <div className="text-white bg-neutral-900"><MockInterview /></div>
              <HowItWorks />
              <AICareerPath />
              <Testimonials />
              <StatsBar />
              <div className="max-w-screen-xl mx-auto px-4 md:px-8 bg-white py-10">
                 <CTABanner />
              </div>
              <Footer />
            </main>
          } />

          <Route 
            path="/admin" 
            element={isAdmin() ? <AdminDashboard /> : <Navigate to="/" />} 
          />

          {/* ✅ 2. ADD THE INTERN PORTAL ROUTE */}
          {/* This ensures only logged-in users can see their dashboard */}
          <Route 
            path="/intern-portal" 
            element={isLoggedIn ? <InternDashboard /> : <Navigate to="/" />} 
          />
        </Routes>

        <button className="fixed text-white bg-lime-600 shadow-lg flex h-16 w-16 items-center justify-center z-[90] rounded-full right-4 bottom-5 hover:scale-110 transition-transform border-none cursor-pointer">
          <img src="f598805a-6152-48ca-9313-c54aaa3cb64d.svg" alt="Chat" className="h-7 w-7" />
        </button>

        <ApplyModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          selectedTrack={selectedTrack} 
        />

        <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)} 
            onLoginSuccess={handleLoginSuccess} 
        />
      </div>
    </Router>
  );
};

export default App;