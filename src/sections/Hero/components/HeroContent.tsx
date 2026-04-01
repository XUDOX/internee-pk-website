export const HeroContent = () => {
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
        <a
          href="#internships"
          className="text-white font-medium items-center bg-lime-600 gap-x-2 flex justify-center px-7 py-3 rounded-full hover:bg-lime-700 transition-all duration-200"
        >
          Our Job Portal
          <img src="/13c06529-5f41-456b-afa5-d83bac432b37.svg" alt="Icon" className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};