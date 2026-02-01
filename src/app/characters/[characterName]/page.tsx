type Props = {
  params: Promise<{ characterName: string }>;
};

const CharacterPage = async ({ params }: Props) => {
  const { characterName } = await params;

  return (
    <main>
      <h1>{characterName}</h1>
    </main>
  );
};

export default CharacterPage;
