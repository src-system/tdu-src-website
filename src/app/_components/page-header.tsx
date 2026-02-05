import type { ReactNode } from "react";
import { Partition } from "@/src/app/_components/partition";
import { TopImage } from "@/src/app/_components/top-image";

type PageHeaderProps = {
  imagePath: string;
  children?: ReactNode;
};

export const PageHeader = ({ imagePath, children }: PageHeaderProps) => {
  return (
    <>
      <TopImage imagePath={imagePath}>{children}</TopImage>
      <Partition />
    </>
  );
};
