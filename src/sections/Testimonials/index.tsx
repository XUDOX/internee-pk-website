import { ScrollReveal } from "../../components/ScrollReveal";
import { TestimonialsSlider } from "./components/TestimonialsSlider";

export const Testimonials = () => {
  return (
    <section id="testimonials" className="px-4 py-16 md:px-8 md:py-20">
      <div className="items-center gap-x-10 grid grid-cols-none max-w-screen-xl gap-y-10 mx-auto md:grid-cols-[repeat(12,minmax(0px,1fr))]">
        <ScrollReveal direction="left" className="md:col-end-[span_5] md:col-start-[span_5] text-center md:text-left">
          <div className="text-gray-600 text-sm font-medium items-center bg-gray-100 inline-flex leading-5 px-4 py-2 rounded-full">
            Trusted By Thousands
          </div>
          <h2 className="text-3xl font-semibold leading-[37.5px] text-center mt-6 md:text-5xl md:leading-[48px] md:text-left">
            Join Thousands of Achievers Connect, Learn, Succeed.
          </h2>
          <div className="text-center mt-6 md:text-left">
            <a
              href="#internships"
              onClick={(e) => { e.preventDefault(); document.getElementById("internships")?.scrollIntoView({ behavior: "smooth" }); }}
              className="text-white text-sm font-semibold bg-lime-600 inline-block leading-5 text-center px-7 py-3 rounded-full md:text-base md:leading-6 hover:bg-lime-700 active:scale-95 transition-all duration-200"
            >
              Join Our Community
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" delay={150} className="md:col-end-[span_7] md:col-start-[span_7]">
          <TestimonialsSlider />
        </ScrollReveal>
      </div>
    </section>
  );
};