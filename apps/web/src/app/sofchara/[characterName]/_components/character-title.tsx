type CharacterTitleProps = {
  enName: string
  name: string
}

export const CharacterTitle = ({ enName, name }: CharacterTitleProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-lexend text-4xl md:text-5xl font-semibold text-forest">{enName}</h1>
      <p className="font-noto text-xl md:text-2xl font-bold text-black">{name}</p>
    </div>
  )
}
