export type InternshipCardProps = {
  title: string;
  imageUrl: string;
  description: string;
  href: string;
};

export const InternshipCard = (props: InternshipCardProps) => {
  return (
    <div className="bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col h-full border border-gray-200 overflow-hidden rounded-2xl border-solid group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[626/352] bg-gray-50 w-full overflow-hidden">
        <img
          alt={props.title}
          src={props.imageUrl}
          className="h-full max-w-full object-cover w-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col grow p-5">
        <h3 className="text-gray-900 text-lg font-semibold leading-7 mb-1">
          {props.title}
        </h3>
        <p className="text-gray-500 text-sm grow leading-5 mb-5">
          {props.description}
        </p>
        <div className="gap-x-2 flex gap-y-2">
          <a
            href={props.href}
            className="text-white text-sm font-medium items-center bg-lime-600 gap-x-1.5 flex basis-[0%] grow justify-center leading-5 py-2.5 rounded-full hover:bg-lime-700 active:scale-95 transition-all duration-200"
          >
            Apply Now
            <img src="a430ad44-c54e-4a96-ad6b-a4d87c9674c0.svg" alt="Icon" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};