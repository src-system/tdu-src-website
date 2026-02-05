import type { ReactNode } from "react";

type ContentSectionProps = {
  sectionId?: string;
  children: ReactNode;
};

export const ContentSection = ({ sectionId, children }: ContentSectionProps) => {
  return (
    <section id={sectionId} className="relative bg-white py-16 md:pt-24 overflow-hidden">
      <div className="relative mx-auto max-w-5xl 2xl:max-w-7xl px-6 md:px-8">{children}</div>
    </section>
  );
};
