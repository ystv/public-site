# Install dependencies only when needed
FROM node:20-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY ./.yarn/ .yarn/
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:22-alpine3.21 AS builder
LABEL "site"="public"
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG GIT_REV_ARG="n/a"
ARG BUILD_ID_ARG="n/a"
ARG NEXT_PUBLIC_INTERNAL_SITE_ARG="n/a"
ARG NEXT_PUBLIC_REST_API_ARG="n/a"
RUN echo commitID: ${GIT_REV_ARG}
ENV SOURCE_ID=$GIT_REV_ARG
ENV BUILD_ID=$BUILD_ID_ARG
ENV NEXT_PUBLIC_INTERNAL_SITE=$NEXT_PUBLIC_INTERNAL_SITE_ARG
ENV NEXT_PUBLIC_REST_API=$NEXT_PUBLIC_REST_API_ARG

RUN yarn build

# Production image, copy all the files and run next
FROM node:22-alpine3.21 AS runner
LABEL "site"="public"
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 3000


# Healthcheck
HEALTHCHECK --interval=15s --timeout=3s --start-period=30s CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/healthz/ || exit 1

CMD ["node", "server.js"]