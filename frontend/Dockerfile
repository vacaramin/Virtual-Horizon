# Use a specific version of the Node.js image
FROM node:16.13.2

# Set the working directory inside the container
WORKDIR /frontend

# Copy only the package.json and package-lock.json files to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Command to start the application
CMD ["npm", "start"]
