export type PartnerLogoProps = {
  href: string;
  src: string;
  alt: string;
};

export const PartnerLogo = (props: PartnerLogoProps) => {
  return (
    <a
      href={props.href}
      className="block grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
    >
      <img
        src={props.src}
        alt={props.alt}
        className="h-[50px] max-w-full object-contain w-[120px] md:h-[60px] md:w-[140px]"
      />
    </a>
  );
};