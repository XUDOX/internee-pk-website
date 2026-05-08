import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { NavbarLogo } from "./components/NavbarLogo";
import { DesktopMenu } from "./components/DesktopMenu";
import { NavbarActions } from "./components/NavbarActions";
import AuthModal from "../../components/Auth/AuthModal";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Update state when login is successful
  const handleLoginSuccess = () => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setMobileOpen(false);
    navigate("/");
  };

  // ✅ CLEAN: navLinks strictly for Home Sections (Prevents Double Portal Links)
  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Internship", href: "#internships" },
    { label: "Graduate Program", href: "#career-launch" },
    { label: "Student Ambassador", href: "#how-it-works" },
    { label: "Startup Journey", href: "#ai-career" },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150); 
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav className={`fixed bg-white z-50 border-gray-100 border-b border-solid top-0 inset-x-0 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="items-center flex h-20 justify-between">
            <NavbarLogo />
            
            <div className="flex items-center gap-8">
               <DesktopMenu 
                  navLinks={navLinks} 
                  onNavClick={handleNavClick} 
                  isLoggedIn={!!token} 
               />
               
               {/* --- DESKTOP PORTAL LINKS (Architect Polish) --- */}
               {token && (
                 <div className="hidden md:flex items-center gap-6 border-l border-gray-100 pl-6 ml-2">
                    {role !== 'admin' ? (
                      <Link 
                        to="/intern-portal" 
                        className={`font-bold text-sm transition-all hover:scale-105 no-underline flex items-center gap-2 ${
                          location.pathname === '/intern-portal' 
                          ? 'text-blue-600 underline underline-offset-8' 
                          : 'text-blue-500 hover:text-blue-700'
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Intern Portal
                      </Link>
                    ) : (
                      <Link 
                        to="/admin" 
                        className={`font-bold text-sm transition-all hover:scale-105 no-underline flex items-center gap-2 ${
                          location.pathname === '/admin' 
                          ? 'text-lime-600 underline underline-offset-8' 
                          : 'text-gray-600 hover:text-lime-600'
                        }`}
                      >
                         <span className="h-2 w-2 rounded-full bg-lime-500 animate-pulse"></span>
                        Admin Dashboard
                      </Link>
                    )}
                 </div>
               )}
            </div>

            <NavbarActions 
                onMenuToggle={() => setMobileOpen((v) => !v)} 
                mobileOpen={mobileOpen} 
                isLoggedIn={!!token}
                onSignInClick={() => setIsAuthModalOpen(true)}
                onLogout={handleLogout}
            />
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* --- MOBILE DRAWER --- */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center px-5 py-5 border-b border-gray-100">
          <NavbarLogo />
          <button onClick={() => setMobileOpen(false)} className="p-2 text-gray-500 border-0 bg-transparent cursor-pointer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <nav className="flex flex-col px-5 pt-4 gap-1 flex-1">
          {navLinks.map((link) => (
            <button key={link.label} onClick={() => handleNavClick(link.href)} className="text-gray-700 text-sm font-medium text-left py-3 px-3 rounded-lg hover:bg-lime-50 border-0 bg-transparent cursor-pointer transition-colors">
              {link.label}
            </button>
          ))}

          {/* MOBILE: Intern Portal Link */}
          {token && role !== 'admin' && (
            <Link 
              to="/intern-portal" 
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-bold py-3 px-3 rounded-lg mt-2 flex items-center gap-2 no-underline ${location.pathname === '/intern-portal' ? 'bg-blue-50 text-blue-600' : 'text-blue-500 hover:bg-blue-50'}`}
            >
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              Intern Portal
            </Link>
          )}

          {/* MOBILE: Admin Dashboard Link */}
          {token && role === 'admin' && (
             <Link 
                to="/admin" 
                onClick={() => setMobileOpen(false)} 
                className={`text-sm font-bold py-3 px-3 rounded-lg mt-2 flex items-center gap-2 no-underline ${location.pathname === '/admin' ? 'bg-lime-50 text-lime-600' : 'text-lime-600 hover:bg-lime-50'}`}
             >
                <span className="h-2 w-2 rounded-full bg-lime-500 animate-pulse"></span>
                Admin Dashboard
             </Link>
          )}
          
          <div className="mt-auto pb-6 pt-4 flex flex-col gap-3 border-t border-gray-100">
            {!token ? (
              <button
                onClick={() => { setMobileOpen(false); setIsAuthModalOpen(true); }}
                className="text-gray-700 text-sm font-semibold text-center border border-gray-300 py-2.5 rounded-full hover:bg-gray-50 bg-white cursor-pointer"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="text-white text-sm font-semibold bg-red-500 text-center py-2.5 rounded-full hover:bg-red-600 border-none cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};