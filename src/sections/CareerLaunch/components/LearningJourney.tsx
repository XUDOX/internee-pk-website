export const LearningJourney = () => {
  const phases = [
    { label: "Phase 1: Foundation", pct: 75, cls: "w-9/12" },
    { label: "Phase 2: Practical Skills", pct: 60, cls: "w-3/5" },
    { label: "Phase 3: Industry Projects", pct: 85, cls: "w-[85%]" },
  ];

  return (
    <div className="border border-gray-200 p-7 rounded-2xl border-solid h-full">
      <h3 className="text-black text-xl font-bold leading-7 mb-5">
        Your Learning Journey
      </h3>
      <div className="flex flex-col gap-4">
        {phases.map((phase) => (
          <div key={phase.label} className="text-black bg-gray-50 border border-gray-100 p-4 rounded-lg border-solid">
            <div className="items-center flex justify-between mb-2">
              <h4 className="font-semibold">{phase.label}</h4>
              <span className="text-gray-500 text-sm leading-5">{phase.pct}%</span>
            </div>
            <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className={`bg-lime-600 h-2 rounded-full ${phase.cls}`}
                style={{ transition: "width 1s ease" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};