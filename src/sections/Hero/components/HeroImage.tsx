export const HeroImage = () => {
  return (
    <div className="w-full z-10" style={{ animation: "slide-up 0.8s ease 0.2s both" }}>
      <img
        src="visual.png"
        alt="Hero Visual"
        className="max-w-full w-full drop-shadow-xl"
      />
    </div>
  );
};