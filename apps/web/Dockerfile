FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package.json
COPY tsconfig.base.json tsconfig.base.json
COPY apps/web/package.json apps/web/package.json

RUN npm install --workspaces --include-workspace-root

COPY . .

RUN npm run build --workspace @sacred-match/web

FROM nginx:1.27-alpine
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
