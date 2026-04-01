export const InstructorHero = () => {
  return (
    <div className="text-center md:text-left">
      <div className="text-gray-600 text-sm font-medium items-center bg-gray-100 inline-flex leading-5 px-4 py-2 rounded-full">
        Instructor Portal
      </div>
      <h1 className="text-black text-3xl font-semibold leading-9 text-center mt-5 mb-4 md:text-5xl md:leading-[48px] md:text-left">
        Tech Instructor or Content Creator?
      </h1>
      <p className="text-gray-600 text-base leading-6 text-center mb-6 md:text-lg md:leading-7 md:text-left">
        Create in your native language, reach more learners, and earn from your
        expertise with internee.pk.
      </p>
      <div className="gap-x-4 flex flex-wrap justify-center gap-y-4 md:justify-start">
        <a
          href="#"
          className="text-white text-base font-semibold bg-lime-600 block leading-6 text-center px-8 py-3 rounded-full md:text-lg md:leading-7 hover:bg-lime-800 active:scale-95 transition-all duration-200"
        >
          Start Teaching Today
        </a>
      </div>
    </div>
  );
};