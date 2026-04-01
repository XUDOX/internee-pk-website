export const TaskPortalHeader = () => {
  return (
    <div className="box-border caret-transparent outline-lime-600/50 text-center mb-16">
      <div className="text-lime-600 items-center bg-white/10 box-border caret-transparent inline-flex outline-lime-600/50 mb-5 px-4 py-2 rounded-full">
        <img
          src="c13a0658-6b92-4f3e-9ac6-5983d720a45f.svg"
          alt="Icon"
          className="box-border caret-transparent h-5 outline-lime-600/50 w-5 mr-2"
        />
        Task Management Platform
      </div>
      <h1 className="text-3xl font-semibold box-border caret-transparent leading-9 outline-lime-600/50 mb-5 md:text-5xl md:leading-[48px]">
        Turn Learning into Proof with
        <br className="text-3xl box-border caret-transparent leading-9 outline-lime-600/50 md:text-5xl md:leading-[48px]" />
        the internee.pk Task Portal
      </h1>
      <p className="text-gray-300 text-base box-border caret-transparent leading-6 max-w-screen-md outline-lime-600/50 mx-auto md:text-lg md:leading-7">
        Complete real tasks, get structured feedback, and build a portfolio
        employers trust. Every milestone moves you closer to job-ready.
      </p>
    </div>
  );
};