# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the port your backend listens on (e.g., 3000)
EXPOSE 3000

# Command to run your backend
CMD ["node", "server.js"]