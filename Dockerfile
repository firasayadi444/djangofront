# Stage 1: Build the Angular app
FROM node:18.19-alpine AS build

# Install Python for node-gyp and other build tools
RUN apk add --no-cache python3 make g++

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Set the working directory for the app
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Remove node_modules and package-lock.json if they exist
RUN rm -rf node_modules package-lock.json

# Install dependencies
RUN npm install

# Update dependencies
RUN npm update

# Copy the rest of the application code
COPY . ./

# Build the Angular app with the production configuration
RUN npm run build -- --project=auth --configuration=production

# Stage 2: Serve with Apache HTTP server
FROM httpd:alpine

# Copy the built Angular app from the build stage to the Apache public directory
COPY --from=build /app/dist/auth/ /usr/local/apache2/htdocs/

# Expose port 80 to be able to access the app
EXPOSE 80

# Start Apache HTTPD server
CMD ["httpd", "-D", "FOREGROUND"]
# Stage 1: Build the Angular app
FROM node:18.19-alpine AS build

# Install Python for node-gyp and other build tools
RUN apk add --no-cache python3 make g++

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Set the working directory for the app
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Remove node_modules and package-lock.json if they exist
RUN rm -rf node_modules package-lock.json

# Install dependencies
RUN npm install

# Update dependencies
RUN npm update

# Copy the rest of the application code
COPY . ./

# Build the Angular app with the production configuration
RUN npm run build -- --project=auth --configuration=production

# Stage 2: Serve with Apache HTTP server
FROM httpd:alpine

# Copy the built Angular app from the build stage to the Apache public directory
COPY --from=build /app/dist/auth/browser /usr/local/apache2/htdocs/

# Expose port 80 to be able to access the app
EXPOSE 80

# Start Apache HTTPD server
CMD ["httpd", "-D", "FOREGROUND"]
