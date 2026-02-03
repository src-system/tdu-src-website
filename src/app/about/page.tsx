import { Partition } from "../_components/partition";
import { ContentBlock } from "../_components/content-block";
import { TopImage } from "../_components/top-image";

import { TopicCard } from "./_components/topic-card";

const About = () => {
  return (
    <div>
      <TopImage imagePath="/images/about.png" />
      <Partition />

      <section className="flex w-full flex-col gap-5 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <ContentBlock
          title="ABOUT"
          subtitle="活動内容"
          description="こんにちは。\n\n東京電機大学 東京千住キャンパス学術研究部会所属のソフトウェア研究部です。 「ソフトウェア研究部」は総合創作系サークルで、「ソフ研」という愛称で呼ばれています。\nソフ研はとても伝統があるサークルで、 その歴史は50年以上にもなります。"
        />
      </section>
      <Partition />

      <section className="flex w-full flex-col gap-5 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <ContentBlock
          title="Activity"
          subtitle="活動内容"
          description="ソフ研では、以下のような活動を行っています。"
        />
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-10">
            <TopicCard
              title="活動内容"
              description="ソフ研では、以下のような活動を行っています。"
              image="/images/team-card/YAMAZAKI.jpg"
            />
          </div>
          <div className="">
            <TopicCard
              title="活動内容"
              description="ソフ研では、以下のような活動を行っています。"
              image="/images/team-card/YAMAZAKI.jpg"
            />
          </div>
          <div className="">
            <TopicCard
              title="活動内容"
              description="ソフ研では、以下のような活動を行っています。"
              image="/images/team-card/YAMAZAKI.jpg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
