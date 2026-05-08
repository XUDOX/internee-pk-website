export const MockInterviewHeader = () => {
  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-lime-600/50 w-auto md:w-6/12">
      <div className="text-lime-600 items-center bg-white/10 box-border caret-transparent inline-flex outline-lime-600/50 mb-6 px-4 py-2 rounded-full">
        <img
          src="0c2e8a02-97ac-4a3e-93ba-73bc918077f0.svg"
          alt="Icon"
          className="box-border caret-transparent h-5 outline-lime-600/50 w-5 mr-2"
        />
        AI Mock Interviews
      </div>
      <h1 className="text-3xl font-semibold box-border caret-transparent leading-[37.5px] outline-lime-600/50 mb-5 md:text-5xl md:leading-[48px]">
        Ace Your Internship Interviews with AI Practice
      </h1>
      <p className="text-gray-300 text-base box-border caret-transparent leading-6 outline-lime-600/50 mb-8 md:text-lg md:leading-7">
        Get realistic, role-specific mock interviews for tech, marketing, and
        business. Receive instant feedback and build confidence before the real
        interview.
      </p>
      <a
        href="/sign-in"
        className="text-base font-semibold items-center bg-lime-600 box-border caret-transparent gap-x-2 inline-flex leading-6 outline-lime-600/50 gap-y-2 px-7 py-3 rounded-full md:text-lg md:leading-7 hover:bg-lime-800"
      >
        Apply Now
        <img
          src="44ca63e3-2561-4af6-9189-6a8a117ec5c3.svg"
          alt="Icon"
          className="text-base box-border caret-transparent h-5 leading-6 outline-lime-600/50 w-5 md:text-lg md:leading-7"
        />
      </a>
    </div>
  );
};