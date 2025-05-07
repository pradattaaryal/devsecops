# Stage 1: Build
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Only copy package files first to optimize layer caching
COPY package*.json ./

# Install dependencies using clean, reproducible install
RUN npm ci --frozen-lockfile

# Copy rest of the source code
COPY . .

# Build the production version
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
