# Stage 1: Node.js base image for Next.js
FROM node as nextjs

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./ui/package*.json ./

# Install dependencies
RUN npm ci

# Copy the Next.js source code
COPY ui/. .

# Build the Next.js application
RUN npm run build

# Stage 2: Python base image for Django
FROM python as django

# Set the working directory
WORKDIR /app

# Copy requirements.txt
COPY ./backend/requirements.txt ./

# Copy the Django source code
COPY ./backend .


# Finally, combine the Next.js and Django stages
FROM node

# Expose the required ports (e.g., 3000 for Next.js, 8000 for Django)
EXPOSE 3000
EXPOSE 8000
# Set the working directory
WORKDIR /app

RUN apt-get update && apt-get install -y python3-pip

# Copy the built Next.js files from the "nextjs" stage
COPY --from=nextjs /app ./ui

# Copy the Django files from the "django" stage
COPY --from=django /app .

RUN pip3 install -r requirements.txt

COPY start.sh ./start.sh

RUN chmod +x ./start.sh

# Start the Django server
#CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000" ,";","npm", "run", "start"]
CMD ./start.sh


