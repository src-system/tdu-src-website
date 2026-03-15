FROM node:20-alpine AS base

# pnpmをインストール
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 依存関係のインストール
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/types/package.json ./packages/types/
COPY packages/theme/package.json ./packages/theme/

RUN pnpm install --frozen-lockfile

# ビルダー
FROM base AS builder

# workspaceの設定ファイルをコピー
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 依存関係をコピー
COPY --from=deps /app/node_modules ./node_modules

# 各パッケージのソースコードとnode_modulesをコピー
COPY --from=deps /app/packages/types/node_modules ./packages/types/node_modules
COPY packages/types/package.json packages/types/tsconfig.json ./packages/types/
COPY packages/types/src ./packages/types/src

COPY packages/theme/package.json packages/theme/tokens.css ./packages/theme/

COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY apps/web ./apps/web

# TypeScriptの型定義をビルド
WORKDIR /app/packages/types
RUN pnpm build

# Webをビルド
WORKDIR /app
RUN pnpm --filter @tdu-src/web build

# ランナー
FROM base AS runner

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/apps/web/next.config.ts ./apps/web/
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/node_modules ./node_modules

RUN chown -R nextjs:nodejs ./apps/web/.next

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

WORKDIR /app/apps/web

CMD ["/bin/sh", "-c", "node_modules/.bin/next start"]
