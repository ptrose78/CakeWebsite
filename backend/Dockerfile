# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for Node.js
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the requirements.txt for Python dependencies (add this step)
COPY requirements.txt ./

# Install Python dependencies
RUN pip install -r requirements.txt

# Set the PORT environment variable for Node.js
ENV PORT=8080

# Copy the rest of the app files (Node.js and Python)
COPY . .

# Expose the port that your app will run on
EXPOSE 8080

# Start the app (Node.js front-end)
CMD ["npm", "start"]
