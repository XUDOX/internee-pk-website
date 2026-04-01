import React from "react";

export type InstructorFeatureCardProps = {
  iconSrc: string;
  title: string;
  description: React.ReactNode;
  learnMoreHref: string;
};

export const InstructorFeatureCard = (props: InstructorFeatureCardProps) => {
  return (
    <div className="bg-white flex flex-col h-full border border-gray-200 p-7 rounded-2xl border-solid hover:shadow-md hover:border-lime-200 transition-all duration-300 group">
      <div className="items-center bg-gray-100 flex h-12 justify-center w-12 mb-5 rounded-xl group-hover:bg-lime-50 transition-colors duration-300">
        <img src={props.iconSrc} alt="Icon" className="h-8 w-8" />
      </div>
      <h2 className="text-black text-xl font-semibold leading-7 mb-2 md:text-2xl md:leading-8">
        {props.title}
      </h2>
      <p className="text-black mb-4 grow">{props.description}</p>
      <a
        href={props.learnMoreHref}
        className="text-lime-600 font-medium items-center flex hover:text-green-700 transition-colors duration-200 group/link"
      >
        Learn more{" "}
        <img
          src="44ca63e3-2561-4af6-9189-6a8a117ec5c3.svg"
          alt="Icon"
          className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200"
        />
      </a>
    </div>
  );
};