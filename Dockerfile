FROM node:25-alpine3.22 AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci && npm install sharp

FROM node:25-alpine3.22 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:25-alpine3.22 AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

RUN addgroup -g 1001 front && adduser -D -u 1001 -G front front

COPY --from=builder /app/public ./public
COPY --from=builder --chown=front:front /app/.next/standalone ./
COPY --from=builder --chown=front:front /app/.next/static ./.next/static

USER front

EXPOSE 3000

RUN apk add --no-cache curl
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000 || exit 1

CMD ["node", "server.js"]
