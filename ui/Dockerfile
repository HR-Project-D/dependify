FROM node

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .

RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run app
CMD ["npm", "start"]
