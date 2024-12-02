# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Set the PORT environment variable
ENV PORT=8080

# Copy the rest of the app files
COPY . .

# Expose the port that your app will run on
EXPOSE 8080

# Start the app
CMD ["npm", "start"]