FROM node:20.19.0-alpine3.21

RUN apk add --no-cache curl

RUN addgroup -g 1001 front && adduser -D -u 1001 -G front front

WORKDIR /app

COPY --chown=front .next/standalone ./
COPY --chown=front .next/static ./.next/static
COPY --chown=front public ./public

ENV NODE_ENV=production
ENV PORT=3000

RUN npm install sharp

USER front

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000 || exit 1

CMD ["node", "server.js"]