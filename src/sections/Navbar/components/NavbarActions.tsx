type Props = {
  onMenuToggle: () => void;
  mobileOpen: boolean;
};

export const NavbarActions = ({ onMenuToggle, mobileOpen }: Props) => {
  return (
    <div className="items-center flex justify-end min-h-10 min-w-[170px]">
      <a
        href="#"
        className="text-white text-sm font-semibold items-center bg-lime-600 hidden justify-center leading-5 px-6 py-2.5 rounded-full md:flex hover:bg-lime-700 transition-colors duration-200 active:scale-95"
      >
        Job Portal
      </a>
      <div className="items-center hidden min-h-10 ml-4 md:flex">
        <a
          href="#"
          className="text-gray-700 text-sm font-semibold items-center inline-flex justify-center leading-5 border border-gray-300 px-6 py-2.5 rounded-full border-solid md:flex hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 active:scale-95"
        >
          Sign In
        </a>
      </div>
      <button
        onClick={onMenuToggle}
        className="text-gray-900 bg-transparent block ml-4 p-2 md:hidden hover:text-lime-600 transition-colors border-0"
        aria-label="Toggle mobile menu"
      >
        <div className="relative w-6 h-5 flex flex-col justify-between">
          <span className={`block h-0.5 bg-current rounded transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[9px]" : ""}`} />
          <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block h-0.5 bg-current rounded transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[9px]" : ""}`} />
        </div>
      </button>
    </div>
  );
};