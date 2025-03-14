FROM node:20.19.0-alpine3.21

RUN addgroup -g 1001 test && adduser -D -u 1001 -G test test

WORKDIR /app

COPY --chown=test .next/standalone ./
COPY --chown=test .next/static ./.next/static
COPY --chown=test public ./public

ENV NODE_ENV=production
ENV PORT=3000

USER test

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000 || exit 1

CMD ["node", "server.js"]