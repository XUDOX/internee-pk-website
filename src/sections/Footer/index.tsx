import { FooterNewsletter } from "./components/FooterNewsletter";
import { FooterBrand } from "./components/FooterBrand";
import { FooterLinks } from "./components/FooterLinks";
import { FooterCopyright } from "./components/FooterCopyright";

export const Footer = () => {
  return (
    <footer className="text-gray-300 bg-neutral-900 box-border caret-transparent outline-lime-600/50">
      <div className="box-border caret-transparent max-w-screen-xl outline-lime-600/50 w-full mx-auto px-4 py-12 md:px-8">
        <FooterNewsletter />
        <div className="box-border caret-transparent gap-x-6 flex flex-col justify-between outline-lime-600/50 gap-y-6 mt-8 md:flex-row">
          <FooterBrand />
          <FooterLinks />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
};