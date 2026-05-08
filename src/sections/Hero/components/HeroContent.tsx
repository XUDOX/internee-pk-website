import React from "react";

// 1. Define the interface to accept the function from App.tsx
interface HeroContentProps {
  onApplyClick: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ onApplyClick }) => {
  return (
    <div
      className="min-w-[auto] text-center md:text-start"
      style={{ animation: "slide-up 0.7s ease 0.1s both" }}
    >
      <h1 className="text-gray-900 text-4xl font-semibold leading-[45px] md:text-5xl md:leading-[48px]">
        Build Skills.
        <br />
        Get Experience.
        <br />
        <span className="text-lime-600">Land Your Job.</span>
      </h1>
      <p
        className="text-gray-600 text-base leading-6 mt-5 md:text-lg md:leading-7 md:w-[83.3333%]"
        style={{ animation: "slide-up 0.7s ease 0.25s both" }}
      >
        Stop waiting for opportunities. Start building real skills with
        Pakistan&#39;s largest virtual internship platform.
      </p>
      
      <div
        className="gap-x-3 flex flex-wrap justify-center mt-5 pt-2 md:justify-start"
        style={{ animation: "slide-up 0.7s ease 0.4s both" }}
      >
        {/* 2. New Apply Now Button that triggers the modal */}
        <button
          onClick={onApplyClick}
          className="text-white font-medium items-center bg-lime-600 gap-x-2 flex justify-center px-7 py-3 rounded-full hover:bg-lime-700 transition-all duration-200 shadow-lg shadow-lime-600/20"
        >
          Apply Now
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <a
          href="#internships"
          className="text-lime-700 font-medium items-center bg-lime-50 gap-x-2 flex justify-center px-7 py-3 rounded-full hover:bg-lime-100 transition-all duration-200 border border-lime-200"
        >
          Our Job Portal
          <img src="/13c06529-5f41-456b-afa5-d83bac432b37.svg" alt="Icon" className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};