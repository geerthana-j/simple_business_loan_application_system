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

# Build your React app (replace 'npm run build' with your actual build command)
RUN npm run build

# Expose the port your app will run on (default is 3000 for React)
EXPOSE 3000

# Define the command to start your app
CMD [ "npm", "start" ]
