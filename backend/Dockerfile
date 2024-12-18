# Use a Python base image
FROM python:3.10-slim

# Install Node.js and npm (if needed for frontend)
RUN apt-get update && apt-get install -y \
    curl \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for npm dependencies
COPY package*.json ./

# Install Node.js dependencies (this will also install any npm packages)
RUN npm install

# Copy the Python requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip3 install -r requirements.txt

# Copy the rest of the app files
COPY . .

# Expose the port
EXPOSE 8080

# Command to run the app (this will call `npm start`, which runs `python3 server.py`)
CMD ["npm", "start"]

