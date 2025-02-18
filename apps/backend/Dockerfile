FROM node:20-alpine AS base
RUN npm install -g turbo
RUN npm install -g corepack@latest
RUN corepack enable

FROM base AS builder
RUN apk update
# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune --scope=backend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm i --frozen-lockfile


FROM base AS sourcer
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN turbo run build
CMD [ "node", "apps/backend/dist/main.js" ]