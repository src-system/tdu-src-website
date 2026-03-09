import Image from 'next/image'
import { redirect } from 'next/navigation'
import { ContentBlock } from '@/src/app/_components/content-block'
import { ContentCard } from '@/src/app/_components/content-card'
import { ContentSection } from '@/src/app/_components/content-section'
import { HeroLabel } from '@/src/app/_components/hero-label'
import { LinkButton } from '@/src/app/_components/link-button'
import { PageHeader } from '@/src/app/_components/page-header'
import { Section } from '@/src/app/_components/section'
import { type NavSection, SectionNav } from '@/src/app/_components/section-nav'
import { getCharacterData, getSofcharaPageDataFromApi } from '@/src/app/_lib/api'
import { CharacterList } from '@/src/app/sofchara/_components/character-list'
import { ConceptCard } from '@/src/app/sofchara/_components/concept-card'
import { HashScroll } from '@/src/app/sofchara/_components/hash-scroll'

const SofcharaPage = async () => {
  const [pageData, characterData] = await Promise.all([
    getSofcharaPageDataFromApi(),
    getCharacterData(),
  ])

  if (!pageData || !pageData.pageHeader.imagePath) {
    const params = new URLSearchParams({
      type: 'no-content',
      failedItems: 'sofchara-page',
      message:
        'ソフキャラページのトップ画像が設定されていません。\n\nPayload CMS の管理画面で ソフキャラページ のトップ画像を設定してください。',
    })
    redirect(`/error?${params.toString()}`)
  }

  const sections: NavSection[] = [
    { id: 'about', label: pageData.aboutSection.title || 'ソフきゃら！' },
    { id: 'concept', label: pageData.conceptSection.subtitle || '企画の広がり' },
    { id: 'guideline', label: 'ガイドライン' },
    { id: 'characters', label: 'キャラクター' },
  ]

  return (
    <main>
      <HashScroll />
      <PageHeader imagePath={pageData.pageHeader.imagePath}>
        <HeroLabel text={pageData.pageHeader.title} />
      </PageHeader>
      <SectionNav sections={sections} />
      <section
        id="about"
        className="relative overflow-hidden bg-linear-to-b from-green-50/70 via-white to-white"
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: "url('/images/pattern/sofchara-pattern.png')",
              backgroundSize: '320px',
              backgroundRepeat: 'repeat',
            }}
          />
        </div>
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-mint/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-forest/15 blur-3xl pointer-events-none" />
        <ContentSection>
          <ContentCard>
            <div className="space-y-8">
              <ContentBlock
                title={pageData.aboutSection.title}
                subtitle={pageData.aboutSection.subtitle}
                description={pageData.aboutSection.description}
              />
              {pageData.aboutSection.iconPath && (
                <div className="grid grid-cols-1 gap-8 rounded-2xl border border-forest/10 bg-white/85 p-5 md:grid-cols-[220px_1fr] md:items-center md:p-8 shadow-[0_10px_30px_rgba(6,130,0,0.08)]">
                  <div className="mx-auto rounded-full border-4 border-white bg-linear-to-br from-mint/20 to-forest/10 p-3 shadow-md">
                    <Image
                      src={pageData.aboutSection.iconPath}
                      alt="ソフきゃら！ロゴ"
                      width={220}
                      height={220}
                      className="h-auto w-[180px] rounded-full md:w-[220px]"
                      priority
                    />
                  </div>
                  <div className="space-y-4 text-charcoal">
                    <h3 className="text-3xl font-bold text-forest">
                      {pageData.aboutSection.cardTitle}
                    </h3>
                    {pageData.aboutSection.cardDescription.split('\n').map((paragraph) => (
                      <p key={paragraph} className="text-lg leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ContentCard>
        </ContentSection>
      </section>

      <Section id="concept" className="gap-6">
        <ContentBlock
          title={pageData.conceptSection.title}
          subtitle={pageData.conceptSection.subtitle}
          maxWidth="wide"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {pageData.conceptSection.concepts.map((concept) => (
            <ConceptCard
              key={concept.title}
              imagePath={concept.imagePath}
              imageAlt={concept.imageAlt}
              title={concept.title}
              description={concept.description}
              showButton={concept.showButton}
              buttonText={concept.buttonText}
              buttonHref={concept.buttonHref}
            />
          ))}
        </div>
      </Section>

      <Section id="guideline" className="gap-6">
        <ContentBlock
          title={pageData.guidelineSection.title}
          subtitle={pageData.guidelineSection.subtitle}
          maxWidth="wide"
        />
        <ContentCard>
          <div className="space-y-5 rounded-xl bg-linear-to-r from-green-50 to-white p-5 md:p-7">
            <p className="text-2xl font-medium text-charcoal leading-relaxed">
              {pageData.guidelineSection.description}
            </p>
            <LinkButton href="/sofchara/guideline" text="ガイドラインを見る" />
          </div>
        </ContentCard>
      </Section>

      <Section id="characters" className="gap-6">
        <ContentBlock
          title={pageData.characterSection.title}
          subtitle={pageData.characterSection.subtitle}
          maxWidth="wide"
        />
        <CharacterList
          characters={characterData.map((c) => ({
            id: c.id,
            name: c.name,
            imagePath: c.portraitImagePath,
          }))}
        />
      </Section>
    </main>
  )
}

export default SofcharaPage
