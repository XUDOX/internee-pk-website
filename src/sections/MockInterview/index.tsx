import { ScrollReveal } from "../../components/ScrollReveal";
import { MockInterviewHeader } from "./components/MockInterviewHeader";
import { MockInterviewFeatures } from "./components/MockInterviewFeatures";
import { MockInterviewCard } from "./components/MockInterviewCard";

export const MockInterview = () => {
  return (
    <div id="mock-interview" className="px-4 py-20 md:px-8 md:py-24">
      <div className="max-w-screen-xl mx-auto">
        <div className="items-center gap-x-12 flex flex-col gap-y-12 md:flex-row">
          <ScrollReveal direction="left" className="w-full md:w-6/12">
            <MockInterviewHeader />
          </ScrollReveal>
          <ScrollReveal direction="right" delay={100} className="w-full md:w-6/12">
            <MockInterviewFeatures />
          </ScrollReveal>
        </div>
        <div className="gap-x-6 grid grid-cols-none gap-y-6 mt-16 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <ScrollReveal key={i} delay={i * 100}>
              {i === 0 && (
                <MockInterviewCard
                  iconSrc="3a3e81c6-6c13-4bdd-903c-6bc8b82b1bfa.svg"
                  title="Build Real Interview Confidence"
                  description="Reduce anxiety and increase success rate through repeated AI-based mock interview sessions."
                />
              )}
              {i === 1 && (
                <MockInterviewCard
                  iconSrc="9cc5649f-a646-45e0-a277-26d79e1b0308.svg"
                  title="Become Job-Ready Fast"
                  description={
                    <>
                      Structured interview training that prepares you for real-world scenarios. Perfect for <strong className="font-bold">students applying for internships</strong>.
                    </>
                  }
                />
              )}
              {i === 2 && (
                <MockInterviewCard
                  iconSrc="0aa10202-abe0-45c4-abd1-ddbd6c659fa1.svg"
                  title="Track Progress with Reports"
                  description="Access detailed performance reports you can share with mentors and hiring managers."
                />
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};