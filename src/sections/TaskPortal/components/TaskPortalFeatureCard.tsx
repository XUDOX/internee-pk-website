export type TaskPortalFeatureCardProps = {
  iconSrc: string;
  title: string;
  description: string;
  listItems: string[];
};

export const TaskPortalFeatureCard = (props: TaskPortalFeatureCardProps) => {
  return (
    <div className="bg-neutral-900 border border-zinc-800 p-7 rounded-2xl border-solid hover:border-lime-600/30 transition-colors duration-300 h-full">
      <div className="items-center bg-neutral-800 flex h-12 justify-center w-12 mb-5 rounded-xl">
        <img src={props.iconSrc} alt="Icon" className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-semibold leading-7 mb-3 md:text-2xl md:leading-8">
        {props.title}
      </h3>
      <p className="text-gray-300 mb-5">{props.description}</p>
      <ul className="text-sm leading-5 list-none pl-0 md:text-base md:leading-6">
        {props.listItems.map((item, index) => (
          <li
            key={index}
            className={`text-gray-300 text-sm items-center flex leading-5 md:text-base md:leading-6 ${index > 0 ? "mt-3" : ""}`}
          >
            <img
              src="2b4372c3-21bc-44a2-8e42-1547df8ba57f.svg"
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