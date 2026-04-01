import { useState } from "react";

type NavLink = { label: string; href: string };

type Props = {
  navLinks: NavLink[];
  onNavClick: (href: string) => void;
};

export const DesktopMenu = ({ navLinks, onNavClick }: Props) => {
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <div className="items-center hidden md:flex gap-x-8">
      {navLinks.map((link) => (
        <button
          key={link.label}
          onClick={() => onNavClick(link.href)}
          className="text-gray-600 text-sm font-medium leading-5 hover:text-lime-600 transition-colors duration-200 relative group bg-transparent border-0 cursor-pointer p-0"
        >
          {link.label}
          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-lime-600 group-hover:w-full transition-all duration-300" />
        </button>
      ))}
      <div className="relative">
        <button
          onClick={() => setResourcesOpen((v) => !v)}
          onBlur={() => setTimeout(() => setResourcesOpen(false), 150)}
          className="text-gray-600 text-sm font-medium items-center bg-transparent gap-x-1 flex leading-5 hover:text-lime-600 transition-colors duration-200 cursor-pointer border-0 p-0"
        >
          Resources
          <img
            src="/12b65025-dd1d-42a7-aece-a192e33d60da.svg"
            alt="Icon"
            className={`h-4 w-4 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
          />
        </button>
        {resourcesOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
            <a href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-lime-50 hover:text-lime-600 transition-colors">Blog</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-lime-50 hover:text-lime-600 transition-colors">Community</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-lime-50 hover:text-lime-600 transition-colors">Certification</a>
          </div>
        )}
      </div>
    </div>
  );
};