FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g turbo
RUN npm install -g corepack@latest
RUN corepack enable

 
FROM base AS builder
# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune web --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm i --frozen-lockfile
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm run build --filter=web...
 
FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./next/standalone
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./next/standalone/apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./next/standalone/apps/web/public

USER nextjs

EXPOSE 3000
ENV PORT 3000

ENV HOSTNAME "0.0.0.0"
CMD node next/standalone/apps/web/server.js