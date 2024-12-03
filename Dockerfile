# Use a lightweight server for static files
FROM nginx:stable-alpine

# Copy the build output to the server's web directory
COPY build /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
