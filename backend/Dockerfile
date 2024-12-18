# Use the official python image as the base image
FROM python:3.10-slim

# Install Python and pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the Python requirements file
COPY requirements.txt ./

# Install Python dependencies
RUN pip3 install -r requirements.txt

# Set the PORT environment variable
ENV PORT=8080

# Copy the rest of the app files
COPY . .

# Expose the port that your app will run on
EXPOSE 8080

# Start the app
CMD ["python3", "server.py"]
