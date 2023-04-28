FROM node:14-alpine

# Set working directory
WORKDIR /build

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN npm i 

# Copy the rest of the app to the container
COPY . .


# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm","run", "dev"]