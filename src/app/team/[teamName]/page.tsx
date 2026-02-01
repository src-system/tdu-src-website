const TeamPage = ({ params }: { params: { teamName: string } }) => {
  const { teamName } = params;
  return (
    <div>
      <h1>{teamName}</h1>
    </div>
  );
};

export default TeamPage;
