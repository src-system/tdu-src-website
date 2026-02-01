type Props = {
  params: Promise<{ newsId: string }>;
};

const NewsDetailPage = async ({ params }: Props) => {
  const { newsId } = await params;

  return (
    <main>
      <h1>News: {newsId}</h1>
    </main>
  );
};

export default NewsDetailPage;
