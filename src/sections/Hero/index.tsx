import { HeroContent } from "./components/HeroContent";
import { HeroImage } from "./components/HeroImage";

// 1. Define the Prop Type
interface HeroProps {
  onApplyClick: () => void;
}

// 2. Accept the prop here
export const Hero: React.FC<HeroProps> = ({ onApplyClick }) => {
  return (
    <section id="hero" className="bg-white w-full pt-20">
      <div className="items-center gap-x-6 grid grid-cols-1 max-w-screen-xl mx-auto py-12 px-4 md:grid-cols-2 md:px-8">
        {/* 3. Pass it down to HeroContent */}
        <HeroContent onApplyClick={onApplyClick} />
        <HeroImage />
      </div>
    </section>
  );
};