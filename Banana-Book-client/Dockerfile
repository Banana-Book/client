# Stage 1: Build the Vite app
FROM node:22 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the Vite app
RUN node --run build

# Stage 2: Set up NGINX to serve the app
FROM nginx:alpine

# Copy the built files from the build stage to the NGINX HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom NGINX configuration if you have one
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to access the app
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
