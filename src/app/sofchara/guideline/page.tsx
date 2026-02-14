import fs from "node:fs/promises";
import path from "node:path";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { ContentBlock } from "@/src/app/_components/content-block";
import { ContentCard } from "@/src/app/_components/content-card";
import { Markdown } from "@/src/app/_components/markdown";
import { PatternBackground } from "@/src/app/_components/pattern-background";

const GuidelinePage = async () => {
  const markdownPath = path.join(process.cwd(), "public/markdown/sofchara-guideline.md");
  const guidelineContent = await fs.readFile(markdownPath, "utf-8");

  return (
    <PatternBackground>
      <main className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl 2xl:max-w-7xl px-6 md:px-8">
          <ContentCard>
            <div className="space-y-4">
              <Link
                href="/sofchara"
                className="inline-flex items-center gap-1.5 text-base md:text-lg font-semibold text-forest hover:underline"
              >
                <ChevronLeftIcon className="size-4" />
                ソフきゃらトップに戻る
              </Link>
              <ContentBlock title="GUIDELINE" subtitle="二次創作ガイドライン" />
              <Markdown content={guidelineContent} />
            </div>
          </ContentCard>
        </div>
      </main>
    </PatternBackground>
  );
};

export default GuidelinePage;
