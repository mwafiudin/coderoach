# syntax=docker/dockerfile:1
# Self-host image (VPS behind Cloudflare Tunnel + Caddy). Railway does not read this file: it keeps
# building with Railpack from railway.json. Usage, env, and the media volume: docs/self-host.md.
#
# Base image pinned to a digest, not just the tag, so the same commit always pulls the same bytes.
# The digest is the multi-arch index. To bump: replace all three FROM lines with the output of
# `docker buildx imagetools inspect node:22-bookworm-slim`.

FROM node:22-bookworm-slim@sha256:de170b39439eb0e5a3444ad7d60b015614a381e10fecae2e30ec9e735122f38d AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-bookworm-slim@sha256:de170b39439eb0e5a3444ad7d60b015614a381e10fecae2e30ec9e735122f38d AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* are inlined into the client bundle at build time, so they are build args, not
# runtime env. None of them is a secret.
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ARG NEXT_PUBLIC_SITE_NAME=Studio
ARG NEXT_PUBLIC_GA4_ID=
ARG NEXT_PUBLIC_META_PIXEL_ID=
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=
ARG NEXT_PUBLIC_PRESENTASI_OFFLINE=
ENV NEXT_OUTPUT=standalone \
    NEXT_TELEMETRY_DISABLED=1
# Placeholders for `next build` only: payload.config.ts throws without PAYLOAD_SECRET in production.
# No page reads the database at build time (docs/opsscore-ops.md, Deploy), and nothing listens on
# port 1 here, so a stray query fails instead of reaching a real database. Kept on the RUN line, not
# ENV, so they are not recorded in the image config.
RUN PAYLOAD_SECRET=build-only-not-a-secret \
    DATABASE_URI=postgresql://build:build@127.0.0.1:1/build \
    npm run build

FROM node:22-bookworm-slim@sha256:de170b39439eb0e5a3444ad7d60b015614a381e10fecae2e30ec9e735122f38d AS run
WORKDIR /app
# NODE_ENV=production is load-bearing: without it the Postgres adapter pushes the schema on boot,
# which against the production database can drop columns. Never override it in compose.
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
# User `node` (uid 1000) ships with the official image. App files stay root-owned and read-only.
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
# Payload writes uploads to `media` relative to the working directory (the Media collection sets no
# staticDir), and server.js chdirs to /app. The only writable path; mount a volume over it.
RUN mkdir -p /app/media && chown node:node /app/media
VOLUME ["/app/media"]
USER node
EXPOSE 3000
# Node's built-in fetch: the slim image has no curl or wget. /api/health reads every collection,
# so a schema mismatch shows up as unhealthy, not as a 500 on the first page view.
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"]
# Exec form: node is PID 1 and gets SIGTERM directly.
CMD ["node", "server.js"]
