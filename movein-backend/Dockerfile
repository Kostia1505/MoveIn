# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Create app directory and set permissions
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs && \
    chown -R nodejs:nodejs /app

# Set NODE_ENV
ENV NODE_ENV=production

# Copy package files
COPY --chown=nodejs:nodejs package*.json ./

# Install dependencies with cache mounting
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production

# Copy source code
COPY --chown=nodejs:nodejs . .

# Switch to non-root user
USER nodejs

# Add health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --quiet --tries=1 --spider http://localhost:3001/health || exit 1

# Expose the port your app runs on
EXPOSE 3001

# Start the application
CMD ["node", "index.js"] 