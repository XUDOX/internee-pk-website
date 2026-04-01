import React from "react";

export type MockInterviewCardProps = {
  iconSrc: string;
  title: string;
  description: React.ReactNode;
};

export const MockInterviewCard = (props: MockInterviewCardProps) => {
  return (
    <div className="bg-neutral-900 border border-zinc-800 p-8 rounded-2xl border-solid hover:border-lime-600/30 hover:-translate-y-1 transition-all duration-300 h-full">
      <img src={props.iconSrc} alt="Icon" className="h-8 w-8 mb-4" />
      <h3 className="text-xl font-semibold leading-7 mb-3">{props.title}</h3>
      <p className="text-gray-300">{props.description}</p>
    </div>
  );
};