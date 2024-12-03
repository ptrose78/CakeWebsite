# Use a lightweight server for static files
FROM nginx:stable-alpine

# Copy the build output to the server's web directory
COPY build /usr/share/nginx/html

# Expose port 8080 (Cloud Run expects your app to listen on this port)
EXPOSE 8080

# Update nginx configuration to listen on port 8080
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
