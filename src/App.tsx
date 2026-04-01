import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { Partners } from "./sections/Partners";
import { Internships } from "./sections/Internships";
import { TaskPortal } from "./sections/TaskPortal";
import { InstructorSection } from "./sections/InstructorSection";
import { InstructorFeatureCard } from "./sections/InstructorSection/components/InstructorFeatureCard";
import { CareerLaunch } from "./sections/CareerLaunch";
import { MockInterview } from "./sections/MockInterview";
import { HowItWorks } from "./sections/HowItWorks";
import { AICareerPath } from "./sections/AICareerPath";
import { Testimonials } from "./sections/Testimonials";
import { CTABanner } from "./sections/CTABanner";
import { StatsBar } from "./sections/StatsBar";
import { Footer } from "./sections/Footer";
import { ScrollReveal } from "./components/ScrollReveal";

const App = () => {
  return (
    <div className="text-neutral-900 text-base not-italic normal-nums font-normal accent-auto bg-black box-border caret-transparent block tracking-[normal] leading-6 list-outside list-disc outline-lime-600/50 pointer-events-auto text-start indent-[0px] normal-case visible border-separate font-outfit">
      <div>
        <main className="bg-white">
          <Navbar />
          <div className="bg-white">
            <Hero />
            <Partners />
            <Internships />
          </div>

          {/* Task Portal - dark section */}
          <div className="text-white bg-neutral-900">
            <TaskPortal />
          </div>

          {/* Instructor Section */}
          <div className="bg-white">
            <InstructorSection />
            <div className="max-w-screen-xl mx-auto pb-16 px-4 md:px-8">
              <div className="gap-x-6 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6 md:gap-y-6">
                {[
                  {
                    iconSrc: "42a0cda1-5e64-44ed-9155-0350fe871c55.svg",
                    title: "Upload Tutorials & Exercises",
                    description: (<>Use <strong>internee.pk</strong> to share tutorials, exercises, and projects. Help others learn while you grow with <strong>virtual internships</strong> that reward your skills.</>),
                    learnMoreHref: "#",
                    delay: 0,
                  },
                  {
                    iconSrc: "bc82bff7-4447-4f68-a939-373c6126b1f5.svg",
                    title: "Earn from Your Expertise",
                    description: (<>Internee.pk offers <strong>virtual internships in Pakistan</strong> where tech creators and instructors can earn passive income by sharing their knowledge.</>),
                    learnMoreHref: "#",
                    delay: 80,
                  },
                  {
                    iconSrc: "5e4f7e29-4740-414f-8967-acfd14f12559.svg",
                    title: "Build Your Instructor Profile",
                    description: (<>Become a trusted voice on <strong>internee.pk</strong>. Our <strong>virtual internship</strong> ecosystem helps you build your personal brand in the online learning space.</>),
                    learnMoreHref: "#",
                    delay: 160,
                  },
                  {
                    iconSrc: "19949d31-e8a3-4f04-89b5-f16c915f023d.svg",
                    title: "Fair Revenue Sharing",
                    description: (<>We keep it transparent. Join <strong>internee.pk</strong> and benefit from a fair model that pays you well - all while gaining experience in <strong>virtual internships</strong>.</>),
                    learnMoreHref: "#",
                    delay: 240,
                  },
                ].map((card) => (
                  <ScrollReveal key={card.title} delay={card.delay}>
                    <InstructorFeatureCard
                      iconSrc={card.iconSrc}
                      title={card.title}
                      description={card.description}
                      learnMoreHref={card.learnMoreHref}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Career Launch */}
          <div className="bg-white">
            <CareerLaunch />
          </div>

          {/* Mock Interview - dark section */}
          <div className="text-white bg-neutral-900">
            <MockInterview />
          </div>

          {/* How It Works */}
          <HowItWorks />

          {/* AI Career Path */}
          <div className="bg-white">
            <AICareerPath />
          </div>

          {/* Testimonials + CTA + Stats */}
          <div className="text-black bg-white">
            <Testimonials />
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
              <div className="bg-white">
                <CTABanner />
              </div>
            </div>
            <StatsBar />
          </div>

          <Footer />
        </main>
      </div>

      {/* Floating chatbot button */}
      <button
        aria-label="Toggle chatbot"
        className="fixed text-white items-center bg-[linear-gradient(to_right_bottom,rgb(67,167,36),rgb(54,138,29))] shadow-[0px_20px_25px_-5px_rgba(67,167,36,0.3),0px_8px_10px_-6px_rgba(67,167,36,0.3)] flex h-16 justify-center z-[90] w-16 p-0 rounded-full right-4 bottom-5 md:right-6 hover:scale-110 active:scale-95 transition-transform duration-200 border-none cursor-pointer"
      >
        <img
          src="f598805a-6152-48ca-9313-c54aaa3cb64d.svg"
          alt="Icon"
          className="h-7 w-7"
        />
      </button>
    </div>
  );
};

export default App;