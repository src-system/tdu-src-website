import { TopImage } from "../_components/top-image";
import { Partition } from "../_components/partition";
import { ContentBlock } from "../_components/content-block";

const NewsPage = () => {
  return (
    <div>
      <TopImage imagePath="/images/team-card/YAMAZAKI.jpg" />
      <Partition />
      <section className="flex w-full flex-col gap-5 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <ContentBlock
          title="NEWS"
          subtitle="活動内容"
          description="ソフ研では、以下のような活動を行っています。"
        />
      </section>
    </div>
  );
};

export default NewsPage;