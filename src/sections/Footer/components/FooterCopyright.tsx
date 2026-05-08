export const FooterCopyright = () => {
  return (
    <div className="text-gray-400 text-xs flex flex-col justify-between leading-4 border-gray-700 mt-8 pt-4 border-t border-solid gap-y-2 md:flex-row md:gap-y-0">
      <p>Copyright © 2025 internee.pk</p>
      <div className="flex gap-4">
        <a href="#" className="hover:text-white transition-colors duration-200">Terms of Use</a>
        <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
      </div>
    </div>
  );
};