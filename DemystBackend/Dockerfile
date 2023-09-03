# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory to the working directory
COPY . .

# Expose the port your Node.js app will run on (replace with your app's port)
EXPOSE 8080

# Define the command to start your Node.js app (replace with your start command)
CMD [ "npm", "start" ]
