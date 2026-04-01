export type AICareerPathCardProps = {
  iconSrc: string;
  title: string;
  description: string;
};

export const AICareerPathCard = (props: AICareerPathCardProps) => {
  return (
    <div className="bg-white border border-gray-200 p-7 rounded-2xl border-solid hover:shadow-md hover:border-lime-200 hover:-translate-y-1 transition-all duration-300 group h-full">
      <div className="items-center flex mb-4">
        <div className="items-center bg-gray-100 flex h-12 justify-center w-12 rounded-xl group-hover:bg-lime-50 transition-colors duration-300">
          <img src={props.iconSrc} alt="Icon" className="h-6 w-6" />
        </div>
        <h2 className="text-black text-xl font-bold leading-7 ml-4 md:text-2xl md:leading-8">
          {props.title}
        </h2>
      </div>
      <p className="text-gray-600 leading-[26px]">{props.description}</p>
    </div>
  );
};