# Stage 1: Build
FROM node:25-alpine3.22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Runtime
FROM node:25-alpine3.22

RUN addgroup -g 1001 front && adduser -D -u 1001 -G front front
RUN apk add --no-cache curl

WORKDIR /app

COPY --chown=front --from=builder /app/.next/standalone ./
COPY --chown=front --from=builder /app/.next/static ./.next/static
COPY --chown=front --from=builder /app/package.json ./package.json
COPY --chown=front --from=builder /app/public ./public

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

USER front

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000 || exit 1

CMD ["node", "server.js"]