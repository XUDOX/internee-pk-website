import { ScrollReveal } from "../../components/ScrollReveal";
import { HowItWorksStep } from "./components/HowItWorksStep";

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="text-black bg-white px-4 py-16 md:px-8 md:py-20">
      <div className="items-start gap-x-10 grid grid-cols-none max-w-screen-xl gap-y-10 mx-auto md:grid-cols-[repeat(12,minmax(0px,1fr))]">
        <ScrollReveal
          direction="left"
          className="static md:sticky md:col-end-[span_5] md:col-start-[span_5] md:top-24"
        >
          <div className="text-gray-600 text-sm font-medium items-center bg-gray-100 gap-x-2 inline-flex leading-5 gap-y-2 mb-5 px-4 py-2 rounded-full">
            How It Works
          </div>
          <h2 className="text-3xl font-semibold leading-[37.5px] mb-5 md:text-5xl md:leading-[48px]">
            Start Fast.
            <br />Learn Smart.
            <br />Get Job-Ready.
          </h2>
          <p className="text-gray-600 text-base leading-6 mb-8 md:text-lg md:leading-7">
            Follow three clear steps to start, learn, and earn your certificate.
            Everything is structured so you can move fast and stay focused.
          </p>
          <a
            href="#internships"
            onClick={(e) => { e.preventDefault(); document.getElementById("internships")?.scrollIntoView({ behavior: "smooth" }); }}
            className="text-white text-sm font-semibold items-center bg-lime-600 inline-flex leading-5 px-7 py-3 rounded-full md:text-base md:leading-6 hover:bg-lime-700 active:scale-95 transition-all duration-200"
          >
            Get Started Now
          </a>
        </ScrollReveal>
        <div className="col-end-auto col-start-auto md:col-end-[span_7] md:col-start-[span_7]">
          <HowItWorksStep
            stepNumber="01"
            title="Sign Up & Choose a Domain"
            description="Explore a wide range of internships across various industries, tailored to your skills."
            tags={["Fast setup", "Guided steps", "Verified outcome"]}
            delay={0}
          />
          <HowItWorksStep
            stepNumber="02"
            title="Complete Your Application"
            description="Submit a short form and secure your internship opportunity in minutes."
            tags={["Fast setup", "Guided steps", "Verified outcome"]}
            delay={100}
          />
          <HowItWorksStep
            stepNumber="03"
            title="Earn Your Certificate"
            description="Finish your internship, gain real experience, and receive a verified certificate."
            tags={["Fast setup", "Guided steps", "Verified outcome"]}
            delay={200}
          />
        </div>
      </div>
    </section>
  );
};