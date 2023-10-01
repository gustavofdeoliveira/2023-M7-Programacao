# Use an official Apache HTTP Server image as the base image
FROM httpd:latest

# Copy your HTML file into the container's web root directory
COPY . /usr/local/apache2/htdocs/

# Optionally, you can include additional configuration files or assets
# COPY ./my-config.conf /usr/local/apache2/conf/my-config.conf

# Expose port 80 for incoming HTTP traffic
EXPOSE 80

# Start the Apache2 web server in the foreground
CMD ["httpd-foreground"]
