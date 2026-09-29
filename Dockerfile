FROM node:20-alpine
WORKDIR /app

# Copy dependency graphs
COPY package*.json ./

# Install dependencies
RUN npm ci || npm install

# Copy source files
COPY . .

# Build Vite React client
RUN npm run build

# Expose port (Render sets process.env.PORT automatically)
EXPOSE 5000

# Start Express server (serves API & static client)
CMD ["node", "server/server.js"]
