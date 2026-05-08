export type CareerFeatureCardProps = {
  iconSrc: string;
  title: string;
  description: string;
  listItems: string[];
};

export const CareerFeatureCard = (props: CareerFeatureCardProps) => {
  return (
    <div className="bg-white border border-gray-200 p-7 rounded-2xl border-solid hover:shadow-md hover:border-lime-200 transition-all duration-300 group h-full">
      <div className="items-center bg-gray-100 flex h-12 justify-center w-12 mb-5 rounded-xl group-hover:bg-lime-50 transition-colors duration-300">
        <img src={props.iconSrc} alt="Icon" className="h-6 w-6" />
      </div>
      <h2 className="text-black text-xl font-bold leading-7 mb-3 md:text-2xl md:leading-8">
        {props.title}
      </h2>
      <p className="text-gray-600 mb-4">{props.description}</p>
      <ul className="list-none pl-0">
        {props.listItems.map((item, index) => (
          <li
            key={index}
            className={`text-gray-700 text-sm items-center flex leading-5 md:text-base md:leading-6 ${index > 0 ? "mt-2" : ""}`}
          >
            <img
              src="21ec545d-a889-4ba6-9c64-afcec4aa287e.svg"
              alt="Icon"
              className="h-5 w-5 mr-3 flex-shrink-0"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};