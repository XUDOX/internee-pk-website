import { HeroContent } from "./components/HeroContent";
import { HeroImage } from "./components/HeroImage";

export const Hero = () => {
  return (
    <section id="hero" className="bg-white w-full pt-20">
      <div className="items-center gap-x-6 grid grid-cols-1 max-w-screen-xl mx-auto py-12 px-4 md:grid-cols-2 md:px-8">
        <HeroContent />
        <HeroImage />
      </div>
    </section>
  );
};