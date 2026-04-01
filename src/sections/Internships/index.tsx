import { ScrollReveal } from "../../components/ScrollReveal";
import { InternshipCard } from "./components/InternshipCard";

export const Internships = () => {
  return (
    <section id="internships" className="bg-white px-4 py-16 md:px-8 md:py-20">
      <div className="max-w-screen-xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <div className="text-gray-600 text-sm font-medium items-center bg-gray-100 gap-x-2 inline-flex leading-5 gap-y-2 mb-6 px-4 py-2 rounded-full">
            <span className="text-white text-xs font-semibold bg-lime-600 block leading-4 px-3 py-1 rounded-full">
              Trending
            </span>
            Explore Internship Opportunities
          </div>
          <h2 className="text-gray-900 text-3xl font-semibold leading-[37.5px] md:text-5xl md:leading-[48px]">
            Your Dream Internship
            <br />
            is Just One{" "}
            <span className="text-lime-600">Click Away!</span>
          </h2>
          <p className="text-gray-600 text-base leading-6 max-w-2xl mt-4 mx-auto md:text-lg md:leading-7">
            Choose from 10+ in-demand tech tracks and start building real-world
            skills today.
          </p>
        </ScrollReveal>
        <div className="gap-x-6 grid grid-cols-1 gap-y-6 md:gap-x-8 md:grid-cols-3 md:gap-y-8">
          {[
            { title: "Graphic Design", imageUrl: "/internships/int1.jpeg", description: "Master UI/UX, branding, and visual communication", href: "#" },
            { title: "Chatbot Development", imageUrl: "/internships/int5.jpeg", description: "Build AI-powered conversational experiences", href: "#" },
            { title: "Frontend Internship", imageUrl: "/internships/int1.jpeg", description: "Create stunning, responsive web interfaces", href: "#" },
            { title: "App Development", imageUrl: "/internships/int1.jpeg", description: "Design and develop mobile applications", href: "#" },
            { title: "Backend Development", imageUrl: "/internships/int2.jpeg", description: "Build scalable APIs and server infrastructure", href: "#" },
            { title: "Other Internships", imageUrl: "/internships/int4.jpeg", description: "Explore diverse tech career opportunities", href: "#" },
          ].map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 80}>
              <InternshipCard {...card} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};