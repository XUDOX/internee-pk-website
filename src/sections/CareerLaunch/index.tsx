import { ScrollReveal } from "../../components/ScrollReveal";
import { CareerLaunchHeader } from "./components/CareerLaunchHeader";
import { CareerStats } from "./components/CareerStats";
import { CareerFeatureCard } from "./components/CareerFeatureCard";
import { LearningJourney } from "./components/LearningJourney";
import { CareerResources } from "./components/CareerResources";

export const CareerLaunch = () => {
  return (
    <section id="career-launch" className="px-4 py-20 md:px-8 md:py-24">
      <div className="max-w-screen-xl mx-auto">
        <ScrollReveal>
          <CareerLaunchHeader />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <CareerStats />
        </ScrollReveal>
        <div className="gap-x-6 grid grid-cols-none gap-y-6 mb-12 md:grid-cols-3">
          {["Targeted Learning", "Mentorship Program", "Certification Track"].map((_, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              {i === 0 && (
                <CareerFeatureCard
                  iconSrc="9cc5649f-a646-45e0-a277-26d79e1b0308.svg"
                  title="Targeted Learning"
                  description="Industry-specific virtual internships designed to build practical skills and experience."
                  listItems={["Web Development", "Digital Marketing", "UI/UX Design"]}
                />
              )}
              {i === 1 && (
                <CareerFeatureCard
                  iconSrc="b1f02046-fa24-4c0b-ae43-72be0b358fd2.svg"
                  title="Mentorship Program"
                  description="Learn directly from industry experts at Internee.pk with guided weekly sessions."
                  listItems={["One-on-One Guidance", "Project Reviews", "Career Planning"]}
                />
              )}
              {i === 2 && (
                <CareerFeatureCard
                  iconSrc="3a3e81c6-6c13-4bdd-903c-6bc8b82b1bfa.svg"
                  title="Certification Track"
                  description="Earn recognized certifications and build a portfolio that employers trust."
                  listItems={["Skill Verification", "Performance Badges", "Digital Certificates"]}
                />
              )}
            </ScrollReveal>
          ))}
        </div>
        <div className="gap-x-6 grid grid-cols-none gap-y-6 mb-12 md:grid-cols-2">
          <ScrollReveal direction="left">
            <LearningJourney />
          </ScrollReveal>
          <ScrollReveal direction="right" delay={100}>
            <CareerResources />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};