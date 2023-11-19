# Use Node.js version 14 as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the source code into the container
COPY . /app

# Set environment variables
ENV NODE_ENV=production
ENV DB_HOST=item-db

# Install production dependencies and build the application
RUN npm install --production --unsafe-perm && npm run build

# Expose the port used by the application
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]