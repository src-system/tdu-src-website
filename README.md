# tdu-src-website
2026年度 ソフ研 ウェブサイト

```
main.tsx
layout.tsx
 /about
 /team
   /game
   /webapp
   /sound
   /2d
   /3d
   /design
 /news/[id]

react, next.js tailwind microCMS ←有料だからや～めた
```

メモ 
lefthook
biome

納期 2月末 ←予定

  ConoHa VPS
  └── Docker
      ├── Next.js     (port 3000)
      ├── Strapi      (port 1337)
      ├── PostgreSQL  (Strapi用DB)
      └── Nginx       (リバースプロキシ)

Strapi
tRPC
Zod