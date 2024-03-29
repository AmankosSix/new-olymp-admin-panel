# Stage 1: Build the application
FROM node:20-alpine as build

WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the entire project to the working directory
COPY . .

# Build the Vue.js application
RUN yarn build:production

# Stage 2: Create a smaller image for production
FROM nginx:1.25-alpine

# Copy the built artifacts from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the nginx configuration file (if needed)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port that the application will run on (default is 80 for nginx)
EXPOSE 80

# Command to start the nginx server
CMD ["nginx", "-g", "daemon off;"]