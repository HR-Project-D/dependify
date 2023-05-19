# Stage 1: Node.js base image for Next.js
FROM node:14-alpine as nextjs

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
FROM python:3.9-alpine as django

# Set the working directory
WORKDIR /app

# Copy requirements.txt
COPY ./backend/requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django source code
COPY ./backend .

# Expose the required ports (e.g., 3000 for Next.js, 8000 for Django)
EXPOSE 3000
EXPOSE 8000

# Finally, combine the Next.js and Django stages
FROM python:3.9-alpine

# Set the working directory
WORKDIR /app

# Copy the built Next.js files from the "nextjs" stage
COPY --from=nextjs /app/.next ./.next

# Copy the Django files from the "django" stage
COPY --from=django /app .

# Start the Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
