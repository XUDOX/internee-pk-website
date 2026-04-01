export const InstructorStats = () => {
  return (
    <div className="bg-white box-border caret-transparent outline-lime-600/50 border border-gray-200 p-6 rounded-3xl border-solid md:p-8">
      <div className="box-border caret-transparent gap-x-4 grid grid-cols-none outline-lime-600/50 gap-y-4 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
        <div className="bg-gray-50 box-border caret-transparent min-h-[auto] min-w-[auto] outline-lime-600/50 border border-gray-100 p-4 rounded-2xl border-solid">
          <p className="text-gray-500 text-xs box-border caret-transparent tracking-[0.3px] leading-4 outline-lime-600/50 uppercase">
            Upload Content
          </p>
          <p className="text-gray-900 text-lg font-semibold box-border caret-transparent leading-7 outline-lime-600/50">
            Tutorials &amp; Projects
          </p>
        </div>
        <div className="bg-gray-50 box-border caret-transparent min-h-[auto] min-w-[auto] outline-lime-600/50 border border-gray-100 p-4 rounded-2xl border-solid">
          <p className="text-gray-500 text-xs box-border caret-transparent tracking-[0.3px] leading-4 outline-lime-600/50 uppercase">
            Earn Income
          </p>
          <p className="text-gray-900 text-lg font-semibold box-border caret-transparent leading-7 outline-lime-600/50">
            Transparent Payouts
          </p>
        </div>
        <div className="bg-gray-50 box-border caret-transparent min-h-[auto] min-w-[auto] outline-lime-600/50 border border-gray-100 p-4 rounded-2xl border-solid">
          <p className="text-gray-500 text-xs box-border caret-transparent tracking-[0.3px] leading-4 outline-lime-600/50 uppercase">
            Grow Profile
          </p>
          <p className="text-gray-900 text-lg font-semibold box-border caret-transparent leading-7 outline-lime-600/50">
            Verified Reviews
          </p>
        </div>
        <div className="bg-gray-50 box-border caret-transparent min-h-[auto] min-w-[auto] outline-lime-600/50 border border-gray-100 p-4 rounded-2xl border-solid">
          <p className="text-gray-500 text-xs box-border caret-transparent tracking-[0.3px] leading-4 outline-lime-600/50 uppercase">
            Reach Learners
          </p>
          <p className="text-gray-900 text-lg font-semibold box-border caret-transparent leading-7 outline-lime-600/50">
            Global Community
          </p>
        </div>
      </div>
      <div className="bg-gray-200 box-border caret-transparent h-px outline-lime-600/50 mt-5"></div>
      <div className="text-gray-600 text-sm box-border caret-transparent leading-5 outline-lime-600/50 mt-5">
        Join a growing community of instructors sharing practical,
        industry-ready content.
      </div>
    </div>
  );
};