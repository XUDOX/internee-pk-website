import { ScrollReveal } from "../../components/ScrollReveal";
import { PartnerLogo } from "./components/PartnerLogo";

export const Partners = () => {
  return (
    <section className="bg-white border-gray-100 py-10 border-t border-solid">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <h2 className="text-gray-500 text-sm font-medium tracking-[0.35px] leading-5 text-center uppercase">
            Collaborated with Trusted Worldwide Partners
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100} className="items-center gap-x-6 flex flex-wrap justify-around gap-y-6 mt-8 md:gap-x-8 md:gap-y-8">
          <PartnerLogo href="#" src="/cloud.png" alt="Brand Logo" />
          <PartnerLogo href="#" src="/collab1.png" alt="Brand Logo" />
          <PartnerLogo href="#" src="/logo1.png" alt="Brand Logo" />
          <PartnerLogo href="#" src="/nics.png" alt="Brand Logo" />
          <PartnerLogo href="#" src="/pitb.png" alt="Brand Logo" />
          <PartnerLogo href="#" src="/see.png" alt="Brand Logo" />
        </ScrollReveal>
      </div>
    </section>
  );
};