import { useState, useEffect } from "react";
import { NavbarLogo } from "./components/NavbarLogo";
import { DesktopMenu } from "./components/DesktopMenu";
import { NavbarActions } from "./components/NavbarActions";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav
        className={`fixed bg-white z-50 border-gray-100 border-b border-solid top-0 inset-x-0 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}
      >
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="items-center flex h-20 justify-between">
            <NavbarLogo />
            <DesktopMenu navLinks={navLinks} onNavClick={handleNavClick} />
            <NavbarActions onMenuToggle={() => setMobileOpen((v) => !v)} mobileOpen={mobileOpen} />
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center px-5 py-5 border-b border-gray-100">
          <NavbarLogo />
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-800 transition-colors border-0 bg-transparent"
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col px-5 pt-4 gap-1 flex-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-gray-700 text-sm font-medium text-left py-3 px-3 rounded-lg hover:bg-lime-50 hover:text-lime-600 transition-colors border-0 bg-transparent"
            >
              {link.label}
            </button>
          ))}
          <div className="mt-auto pb-6 pt-4 flex flex-col gap-3 border-t border-gray-100">
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="text-white text-sm font-semibold bg-lime-600 text-center py-2.5 rounded-full hover:bg-lime-700 transition-colors"
            >
              Job Portal
            </a>
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="text-gray-700 text-sm font-semibold text-center border border-gray-300 py-2.5 rounded-full hover:bg-gray-50 transition-colors"
            >
              Sign In
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};