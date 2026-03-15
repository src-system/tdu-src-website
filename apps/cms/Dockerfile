FROM node:20-alpine AS base

# pnpmをインストール
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 依存関係のインストール
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/cms/package.json ./apps/cms/
COPY packages/types/package.json ./packages/types/
COPY packages/theme/package.json ./packages/theme/

RUN pnpm install --frozen-lockfile

# ビルダー
FROM base AS builder

# workspaceの設定ファイルをコピー（tsconfig.json は apps/cms の extends で必要）
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./

# 依存関係をコピー
COPY --from=deps /app/node_modules ./node_modules

# 各パッケージのソースコードとnode_modulesをコピー
COPY --from=deps /app/packages/types/node_modules ./packages/types/node_modules
COPY packages/types/package.json packages/types/tsconfig.json ./packages/types/
COPY packages/types/src ./packages/types/src

COPY packages/theme/package.json packages/theme/tokens.css ./packages/theme/

COPY --from=deps /app/apps/cms/node_modules ./apps/cms/node_modules
COPY apps/cms ./apps/cms

# TypeScriptの型定義をビルド
WORKDIR /app/packages/types
RUN pnpm build

# CMSをビルド
WORKDIR /app
RUN pnpm --filter @tdu-src/cms build

# ランナー
FROM base AS runner

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/cms/package.json ./apps/cms/
COPY --from=builder /app/apps/cms/.next ./apps/cms/.next
COPY --from=builder /app/apps/cms/node_modules ./apps/cms/node_modules
COPY --from=builder /app/packages/types/dist ./packages/types/dist

RUN mkdir -p ./apps/cms/public
COPY --from=builder /app/node_modules ./node_modules

RUN mkdir -p ./apps/cms/media && chown -R nextjs:nodejs ./apps/cms/media

USER nextjs

EXPOSE 3001

ENV PORT=3001
ENV HOSTNAME="0.0.0.0"
ENV NODE_OPTIONS="--no-deprecation"

WORKDIR /app/apps/cms

CMD ["/bin/sh", "-c", "node_modules/.bin/next start -p 3001"]
