import { useState } from "react";

const testimonials = [
  {
    name: "Ayesha Khan",
    role: "Frontend Developer at TechCo",
    avatar: "AK",
    text: "Internee.pk completely transformed my career trajectory. The hands-on projects and mentorship helped me land my dream job within 3 months of completing the program.",
  },
  {
    name: "Muhammad Ali",
    role: "Backend Engineer at StartupX",
    avatar: "MA",
    text: "The virtual internship gave me real industry experience that I couldn't get anywhere else. The structured learning path made everything click into place.",
  },
  {
    name: "Sara Ahmed",
    role: "UI/UX Designer at DesignHub",
    avatar: "SA",
    text: "From zero design skills to a full-time job in 6 months - Internee.pk made that possible. The AI mock interviews gave me so much confidence.",
  },
  {
    name: "Bilal Hassan",
    role: "Data Analyst at FinTech Ltd",
    avatar: "BH",
    text: "The certification I earned here is recognized by top companies. The task portal kept me accountable and helped me build a strong portfolio.",
  }
];

export const TestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <div className="relative flex flex-col items-center w-full max-w-lg mx-auto">
      <div
        key={current}
        className="w-full bg-white border border-gray-200 p-7 rounded-2xl border-solid shadow-sm"
        style={{ animation: "fade-in 0.4s ease both" }}
      >
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} className="w-4 h-4 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-gray-700 leading-7 mb-6 text-base">&#34;{t.text}&#34;</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-lime-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
            {t.avatar}
          </div>
          <div>
            <p className="text-gray-900 text-sm font-semibold">{t.name}</p>
            <p className="text-gray-500 text-xs">{t.role}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-5">
        <button
          onClick={prev}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-lime-300 transition-all duration-200 active:scale-90"
          aria-label="Previous testimonial"
        >
          <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-lime-600" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-lime-300 transition-all duration-200 active:scale-90"
          aria-label="Next testimonial"
        >
          <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};