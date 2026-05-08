export type TaskPortalInfoItemProps = {
  iconSrc: string;
  titleText: string;
  titleHighlight: string;
  descriptionText: string;
  descriptionHighlight: string;
};

export const TaskPortalInfoItem = (props: TaskPortalInfoItemProps) => {
  return (
    <div className="items-start bg-neutral-900 box-border caret-transparent gap-x-4 flex min-h-[auto] min-w-[auto] outline-lime-600/50 gap-y-4 border border-zinc-800 p-6 rounded-xl border-solid">
      <div className="bg-neutral-900 box-border caret-transparent min-h-[auto] min-w-[auto] outline-lime-600/50 p-3 rounded-xl">
        <img
          src={props.iconSrc}
          alt="Icon"
          className="text-lime-600 box-border caret-transparent h-6 outline-lime-600/50 w-6"
        />
      </div>
      <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-lime-600/50">
        <h3 className="text-lg font-semibold box-border caret-transparent leading-7 outline-lime-600/50 mb-2 md:text-xl">
          {props.titleText}{" "}
          <strong className="text-lg font-black box-border caret-transparent outline-lime-600/50 md:text-xl">
            {props.titleHighlight}
          </strong>
        </h3>
        <p className="text-gray-300 text-sm box-border caret-transparent leading-5 outline-lime-600/50 md:text-base md:leading-6">
          {props.descriptionText}{" "}
          <strong className="text-sm font-bold box-border caret-transparent leading-5 outline-lime-600/50 md:text-base md:leading-6">
            {props.descriptionHighlight}
          </strong>
        </p>
      </div>
    </div>
  );
};