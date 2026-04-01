FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package.json
COPY tsconfig.base.json tsconfig.base.json
COPY apps/api/package.json apps/api/package.json

RUN npm install --workspaces --include-workspace-root

COPY . .

RUN npm run prisma:generate --workspace @sacred-match/api
RUN npm run build --workspace @sacred-match/api

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package.json
COPY apps/api/package.json apps/api/package.json
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/apps/api/dist /app/apps/api/dist
COPY --from=builder /app/apps/api/prisma /app/apps/api/prisma

EXPOSE 4000

# Push schema to DB then start the server
CMD ["sh", "-c", "npx prisma db push --schema apps/api/prisma/schema.prisma --skip-generate && node apps/api/dist/index.js"]
