import { ScrollReveal } from "../../components/ScrollReveal";
import { InternshipCard } from "./components/InternshipCard";

// Add this interface to define the prop
interface InternshipsProps {
  onApplyClick: (track: string) => void;
}

export const Internships: React.FC<InternshipsProps> = ({ onApplyClick }) => {
  return (
    <section id="internships" className="bg-white px-4 py-16 md:px-8 md:py-20">
      <div className="max-w-screen-xl mx-auto">
        {/* ... (Keep your existing ScrollReveal header code exactly the same) ... */}
        
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
              {/* Pass the onApply function and the specific title here */}
              <InternshipCard 
                {...card} 
                onApply={() => onApplyClick(card.title)} 
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};