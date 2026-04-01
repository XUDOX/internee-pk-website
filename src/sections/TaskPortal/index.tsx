import { ScrollReveal } from "../../components/ScrollReveal";
import { TaskPortalHeader } from "./components/TaskPortalHeader";
import { TaskPortalFeatureCard } from "./components/TaskPortalFeatureCard";
import { TaskPortalInfoItem } from "./components/TaskPortalInfoItem";
import { TaskPortalCTA } from "./components/TaskPortalCTA";

export const TaskPortal = () => {
  return (
    <div id="task-portal" className="px-4 py-20 md:px-8 md:py-24 bg-black text-white">
      <div className="max-w-screen-xl mx-auto">
        <ScrollReveal>
          <TaskPortalHeader />
        </ScrollReveal>
        <div className="gap-x-6 grid grid-cols-none gap-y-6 mb-12 md:gap-x-8 md:grid-cols-2 md:gap-y-8">
          <ScrollReveal delay={0}>
            <TaskPortalFeatureCard
              iconSrc="cf37a6a4-36db-42c4-89e4-46077eabc5f5.svg"
              title="Hands-on Industry Projects"
              description="Practice with real-world projects that mirror industry workflows. Each task sharpens your skills and strengthens your portfolio."
              listItems={["Project-based learning", "Industry-standard practices", "Portfolio building"]}
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <TaskPortalFeatureCard
              iconSrc="4f080a5f-943c-45ef-8872-6d94ffc81578.svg"
              title="Skill Verification System"
              description="Every completed task adds verified proof to your profile. Track progress and showcase outcomes with confidence."
              listItems={["Skill verification", "Progress tracking", "Achievement badges"]}
            />
          </ScrollReveal>
        </div>
        <div className="gap-x-6 grid grid-cols-none gap-y-6 mb-12 md:gap-x-8 md:grid-cols-2 md:gap-y-8">
          <ScrollReveal delay={0}>
            <TaskPortalInfoItem
              iconSrc="c13a0658-6b92-4f3e-9ac6-5983d720a45f.svg"
              titleText="SDLC Implementation via "
              titleHighlight="internee.pk"
              descriptionText="Experience the complete Software Development Life Cycle through structured tasks and milestones, part of our "
              descriptionHighlight="virtual internship"
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <TaskPortalInfoItem
              iconSrc="c147cfd1-1384-4c26-a20d-ccd1c103cb0b.svg"
              titleText="Guided Learning Path at "
              titleHighlight="internee.pk"
              descriptionText="Follow a structured learning path designed for both beginners and advanced learners as part of our "
              descriptionHighlight="virtual internship"
            />
          </ScrollReveal>
        </div>
        <ScrollReveal>
          <TaskPortalCTA />
        </ScrollReveal>
      </div>
    </div>
  );
};