export const FooterLinks = () => {
  const companyLinks = [
    { label: "Home", href: "#hero" },
    { label: "Blog", href: "#" },
    { label: "Student Ambassador", href: "#how-it-works" },
    { label: "Interns Profiles", href: "#" },
    { label: "About Us", href: "#" },
  ];
  
  const resourceLinks = [
    { label: "Community", href: "https://linktr.ee/internee.pk" },
    { label: "Certification", href: "#" },
  ];

  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <div className="gap-x-16 grid grid-cols-2 gap-y-8 md:gap-x-32">
      <div>
        <h3 className="text-base font-semibold leading-6 mb-3 md:text-lg md:leading-7">Company</h3>
        <ul className="text-gray-400 text-sm leading-5 list-none pl-0 flex flex-col gap-2">
          {companyLinks.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => scrollTo(l.href)}
                className="hover:text-white transition-colors duration-200 text-left bg-transparent border-0 cursor-pointer text-gray-400 text-sm p-0"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-base font-semibold leading-6 mb-3 md:text-lg md:leading-7">Resources</h3>
        <ul className="text-gray-400 text-sm leading-5 list-none pl-0 flex flex-col gap-2">
          {resourceLinks.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => scrollTo(l.href)}
                className="hover:text-white transition-colors duration-200 text-left bg-transparent border-0 cursor-pointer text-gray-400 text-sm p-0"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};