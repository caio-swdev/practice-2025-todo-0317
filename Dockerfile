# Build stage
FROM node:20-alpine AS builder
LABEL org.opencontainers.image.source=https://github.com/caio-swdev/practice-2025-todo-0317
LABEL org.opencontainers.image.description="Todo App Container"
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"] 