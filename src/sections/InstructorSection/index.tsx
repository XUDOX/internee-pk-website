import { ScrollReveal } from "../../components/ScrollReveal";
import { InstructorHero } from "./components/InstructorHero";
import { InstructorStats } from "./components/InstructorStats";

export const InstructorSection = () => {
  return (
    <div id="instructor" className="px-4 py-20 md:px-8 md:py-24">
      <div className="items-center gap-x-10 grid grid-cols-none max-w-screen-xl gap-y-10 mx-auto md:grid-cols-[repeat(12,minmax(0px,1fr))]">
        <ScrollReveal direction="left" className="md:col-end-[span_6] md:col-start-[span_6]">
          <InstructorHero />
        </ScrollReveal>
        <ScrollReveal direction="right" delay={100} className="md:col-end-[span_6] md:col-start-[span_6]">
          <InstructorStats />
        </ScrollReveal>
      </div>
    </div>
  );
};