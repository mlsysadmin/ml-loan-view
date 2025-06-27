# 1. Use official Node image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files first to install dependencies
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of the application code
COPY . .

# 6. Build the application
RUN npm run build

# 7. Expose port (default for Next.js)
EXPOSE 3000

# 8. Start the application
CMD ["npm", "start"]
