import { ContentBlock } from "../_components/content-block";
import { MainLayout } from "../_components/main-layout";
import { RandomCharacter } from "../_components/random-character";

const CharactersPage = () => {
  return (
    <MainLayout>
      <section className="flex w-full flex-col items-center gap-8 bg-white mx-auto max-w-6xl md:px-20 px-5 md:py-15 py-10">
        <ContentBlock title="CHARACTERS" subtitle="ソフきゃら！" />
        <RandomCharacter />
        <p className="text-center text-charcoal">
          ソフトウェア研究部のオリジナルキャラクターたちです。
          <br />
          ページをリロードすると別のキャラクターが表示されます。
        </p>
      </section>
    </MainLayout>
  );
};

export default CharactersPage;
