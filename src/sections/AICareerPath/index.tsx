import { ScrollReveal } from "../../components/ScrollReveal";
import { AICareerPathHeader } from "./components/AICareerPathHeader";
import { AICareerPathTools } from "./components/AICareerPathTools";
import { AICareerPathCard } from "./components/AICareerPathCard";

export const AICareerPath = () => {
  return (
    <div id="ai-career" className="px-4 py-16 md:px-8 md:py-20">
      <div className="max-w-screen-xl mx-auto">
        <div className="items-start gap-x-10 grid grid-cols-none gap-y-10 md:grid-cols-[repeat(12,minmax(0px,1fr))]">
          <ScrollReveal direction="left" className="md:col-end-[span_7] md:col-start-[span_7]">
            <AICareerPathHeader />
          </ScrollReveal>
          <ScrollReveal direction="right" delay={100} className="md:col-end-[span_5] md:col-start-[span_5]">
            <AICareerPathTools />
          </ScrollReveal>
        </div>
        <div className="gap-x-8 grid grid-cols-none gap-y-8 mt-16 md:grid-cols-2">
          {[
            {
              iconSrc: "bac922f4-ede6-4707-970f-4a117ebb451c.svg",
              title: "AI Resume Building",
              description: "Stand out in the AI job market with our professional resume-building guide. Learn how to highlight your AI skills, experience, and key accomplishments to catch the attention of top employers."
            },
            {
              iconSrc: "4f080a5f-943c-45ef-8872-6d94ffc81578.svg",
              title: "Cover Letter Creation",
              description: "Create compelling cover letters that showcase your passion for AI and demonstrate your value to employers. Make a strong first impression that speaks directly to your AI expertise."
            },
            {
              iconSrc: "b1f02046-fa24-4c0b-ae43-72be0b358fd2.svg",
              title: "Interview Preparation",
              description: "Ace your AI job interviews with confidence through practice questions, interview strategies, and tips for answering technical AI-related queries."
            },
            {
              iconSrc: "b35f0fed-c609-4882-abea-e63b34aecb49.svg",
              title: "Industry Insights",
              description: "Stay ahead of the curve with up-to-date insights on the latest AI trends, market demands, and emerging technologies in the AI industry."
            },
          ].map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 80}>
              <AICareerPathCard {...card} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};