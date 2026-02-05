"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "ABOUT" },
  { id: "team", label: "TEAM" },
  { id: "news", label: "NEWS" },
  { id: "characters", label: "CHARACTERS" },
];

export const SectionNav = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.5;
      setIsVisible(window.scrollY > heroHeight);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => scrollToSection(section.id)}
          className="group flex items-center gap-3"
        >
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 shadow-sm ${
              activeSection === section.id
                ? "bg-forest scale-110"
                : "bg-gray-400/60 group-hover:bg-forest/70 scale-100"
            }`}
          />
          <span
            className={`text-base font-medium px-4 py-2 rounded transition-all duration-200 shadow-sm ${
              activeSection === section.id
                ? "text-white bg-forest"
                : "text-gray-600 bg-white/80 backdrop-blur-sm group-hover:bg-white"
            }`}
          >
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  );
};
