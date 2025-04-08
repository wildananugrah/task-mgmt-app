# 1. Base image
FROM node:20-alpine AS base

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies early to leverage caching
COPY package.json package-lock.json ./
RUN npm ci

# 4. Copy the rest of your app
COPY . .

# 5. Build Prisma client (before build so it can be used during app build)
RUN npx prisma generate

# 6. Build the Next.js app
RUN npm run build

# 7. Set environment for production
ENV NODE_ENV=production

# 8. Expose port
EXPOSE 3000

# 9. Run the app
CMD ["npm", "start"]
