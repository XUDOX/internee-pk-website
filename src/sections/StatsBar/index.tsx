import { ScrollReveal } from "../../components/ScrollReveal";

export const StatsBar = () => {
  return (
    <ScrollReveal>
      <div className="items-center gap-x-10 flex flex-col justify-center gap-y-10 mt-8 px-6 py-10 md:gap-x-16 md:flex-row md:gap-y-16">
        <div className="text-center">
          <p className="text-neutral-900 text-6xl font-semibold leading-[60px]">20+</p>
          <p className="text-neutral-900 text-lg leading-7">Expert-Led Internships</p>
        </div>
        <div className="bg-gray-600 hidden h-16 w-px md:block" />
        <div className="text-center">
          <p className="text-neutral-900 text-6xl font-semibold leading-[60px]">1500+</p>
          <p className="text-neutral-900 text-lg leading-7">Successful Graduates</p>
        </div>
        <div className="bg-gray-600 hidden h-16 w-px md:block" />
        <div className="text-center">
          <p className="text-neutral-900 text-6xl font-semibold leading-[60px]">120k+</p>
          <p className="text-neutral-900 text-lg leading-7">LinkedIn Followers</p>
        </div>
      </div>
    </ScrollReveal>
  );
};