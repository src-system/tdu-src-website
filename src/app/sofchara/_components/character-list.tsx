"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type CharacterListItem = {
  id: string;
  name: string;
  imagePath: string;
};

type CharacterListProps = {
  characters: ReadonlyArray<CharacterListItem>;
};

export const CharacterList = ({ characters }: CharacterListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasOverflow = characters.length > 9;
  const visibleCharacters = useMemo(
    () => (isExpanded || !hasOverflow ? characters : characters.slice(0, 9)),
    [characters, hasOverflow, isExpanded],
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-10">
        {visibleCharacters.map((character) => (
          <Link
            key={character.id}
            href={`/sofchara/${character.id}`}
            className="group flex flex-col items-center gap-3"
          >
            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-100 ring-2 ring-forest/10 transition-all duration-200 group-hover:ring-forest/30 md:h-44 md:w-44">
              <Image
                src={character.imagePath}
                alt={character.name}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <p className="text-center font-bold text-charcoal">{character.name}</p>
          </Link>
        ))}
      </div>

      {hasOverflow ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="rounded-full border border-forest/30 px-6 py-2 text-sm font-bold text-forest transition-colors hover:bg-forest/5"
          >
            {isExpanded ? "閉じる" : "もっと見る"}
          </button>
        </div>
      ) : null}
    </div>
  );
};
