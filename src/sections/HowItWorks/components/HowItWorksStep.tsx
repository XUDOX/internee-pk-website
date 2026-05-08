import { ScrollReveal } from "../../../components/ScrollReveal";

export type HowItWorksStepProps = {
  stepNumber: string;
  title: string;
  description: string;
  tags: string[];
  delay?: number;
};

export const HowItWorksStep = (props: HowItWorksStepProps) => {
  return (
    <ScrollReveal delay={props.delay ?? 0} className={props.stepNumber !== "01" ? "mt-6" : ""}>
      <div className="bg-white border border-gray-200 p-7 rounded-2xl border-solid hover:shadow-md hover:border-lime-200 transition-all duration-300">
        <div className="items-center gap-x-3 flex gap-y-3 mb-3">
          <div className="text-lime-600 text-sm font-semibold items-center bg-lime-600/10 flex h-10 justify-center leading-5 w-10 rounded-full">
            {props.stepNumber}
          </div>
          <span className="text-gray-500 text-sm block leading-5">
            Step {props.stepNumber}
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-7 mb-2 md:text-xl">
          {props.title}
        </h3>
        <p className="text-gray-600 text-sm leading-5 md:text-base md:leading-6">
          {props.description}
        </p>
        <div className="text-gray-600 text-xs gap-x-2 flex flex-wrap leading-4 gap-y-2 mt-4 md:text-sm md:leading-5">
          {props.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 block leading-4 px-3 py-1 rounded-full md:text-sm md:leading-5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};