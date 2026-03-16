type CharacterTitleProps = {
  enName: string
  name: string
}

export const CharacterTitle = ({ enName, name }: CharacterTitleProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-noto text-4xl md:text-5xl font-bold text-forest">{name}</h1>
      <p className="font-lexend text-xl md:text-2xl font-semibold text-black">{enName}</p>
    </div>
  )
}
