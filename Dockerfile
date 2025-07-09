# # 1. Use official Node image
# FROM node:18-alpine

# # 2. Set working directory
# WORKDIR /app

# # 3. Copy package files first to install dependencies
# COPY package*.json ./

# # 4. Install dependencies
# RUN npm install

# # 5. Copy rest of the application code
# COPY . .

# # 6. Build the application
# RUN npm run build

# # 7. Expose port (default for Next.js)
# EXPOSE 3000

# # 8. Start the application
# CMD ["npm", "start"]


# /////////////////////////////////////


# # --- Build Stage ---
# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build

# # --- Production Stage ---
# FROM node:18-alpine AS runner
# WORKDIR /app

# # Copy necessary standalone files
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/public ./public

# EXPOSE 3000
# CMD ["node", "server.js"]




# Use official Node.js image
FROM node:18-slim

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run build

# Add Puppeteer dependencies
RUN apt-get update && apt-get install -y \
    wget ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 \
    libnspr4 libnss3 libxss1 xdg-utils libgbm-dev libgtk-3-0 \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Copy app code
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose port and start
EXPOSE 3000
CMD ["npm", "run", "start"]
