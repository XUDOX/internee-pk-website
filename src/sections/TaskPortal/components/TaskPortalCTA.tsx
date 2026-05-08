export const TaskPortalCTA = () => {
  return (
    <div className="bg-neutral-900 text-center border border-zinc-800 p-10 rounded-2xl border-solid md:p-12 hover:border-lime-600/30 transition-colors duration-300">
      <h2 className="text-2xl font-semibold leading-8 mb-5 md:text-3xl md:leading-9">
        Ready to Build Your Professional Portfolio with{" "}
        <strong className="text-2xl font-black leading-8 md:text-3xl md:leading-9">internee.pk</strong>?
      </h2>
      <p className="text-gray-300 text-base leading-6 max-w-2xl mb-7 mx-auto md:text-lg md:leading-7">
        Join our{" "}
        <strong className="font-bold">virtual internships</strong>
        {" "}and get access to industry-standard tasks that will help you build a remarkable portfolio, only at{" "}
        <strong className="font-bold">internee.pk</strong>.
      </p>
      <a
        href="#"
        className="text-base font-semibold bg-lime-600 inline-flex leading-6 px-8 py-3 rounded-full md:text-lg md:leading-7 hover:bg-lime-700 active:scale-95 transition-all duration-200"
      >
        Start Your Journey Now
        <img
          src="44ca63e3-2561-4af6-9189-6a8a117ec5c3.svg"
          alt="Icon"
          className="h-5 w-5 ml-2 mt-1"
        />
      </a>
    </div>
  );
};