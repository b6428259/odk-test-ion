FROM node:22-alpine

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy the application source code
COPY . .

# Important for OpenShift/OKD compatibility:
# Give the 'root' group (0) the same permissions as the file owner.
# OpenShift runs containers as a random non-root user (UID), but always in the 'root' group (0).
RUN chgrp -R 0 /usr/src/app && \
    chmod -R g=u /usr/src/app

# Switch to a non-root user ID
USER 1001

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
