import { ScrollReveal } from "../../components/ScrollReveal";

export const CTABanner = () => {
  return (
    <ScrollReveal>
      <div className="relative text-white bg-neutral-900 overflow-hidden px-6 py-12 rounded-3xl md:px-10 md:py-14">
        <div className="absolute hidden h-full pointer-events-none right-0 top-0 md:block">
          <img
            src="https://c.animaapp.com/mn6zjopx2BPW1k/assets/cta-mask.svg"
            alt=""
            className="h-full max-w-full opacity-90"
          />
        </div>
        <div className="relative max-w-screen-md">
          <div className="text-xs font-semibold items-center bg-white/10 inline-flex leading-4 mb-6 px-4 py-2 rounded-full md:text-sm md:leading-5">
            <span className="text-xs bg-lime-600 block leading-4 mr-2 px-3 py-1 rounded-full">
              Trending
            </span>
            Explore Internship Opportunities
          </div>
          <h1 className="text-3xl font-semibold leading-[37.5px] mb-5 md:text-5xl md:leading-[48px]">
            Unlock New Opportunities
            <br />
            With Top-tier Internships.
          </h1>
          <p className="text-white/80 text-base leading-6 mb-8 md:text-lg md:leading-7">
            Take the first step toward a successful career with Internee.pk.
          </p>
          <div className="items-center gap-x-4 flex flex-col gap-y-4 md:flex-row">
            <a
              href="#"
              className="text-sm font-semibold bg-lime-600 block leading-5 w-fit px-7 py-3 rounded-full md:text-base md:leading-6 hover:bg-lime-700 active:scale-95 transition-all duration-200"
            >
              Get Started Now
            </a>
            <a
              href="#internships"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("internships")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm font-semibold items-center flex leading-5 w-fit border border-lime-600/60 px-7 py-3 rounded-full border-solid md:text-base md:leading-6 hover:bg-lime-600/10 active:scale-95 transition-all duration-200"
            >
              <img
                src="c208b5a9-742f-4705-9ce6-354a9fbddfbe.svg"
                alt="Icon"
                className="h-[18px] w-[18px] mr-2"
              />
              Explore Internships
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};