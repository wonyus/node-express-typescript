# Stage 1: Builder
FROM node:18.19.0 AS builder

# Set the working directory in the builder stage
WORKDIR /app

# Copy the rest of your application source code to the builder stage
COPY . .

# Install project dependencies using Yarn in the builder stage
RUN yarn install

# Build the TypeScript application in the builder stage
RUN yarn build

# Stage 2: Installer
FROM node:18.19.0 AS installer

# Set the working directory in the installer stage
WORKDIR /app

# Copy package.json and yarn.lock from the builder stage
COPY --from=builder /app/package.json /app/yarn.lock ./

# Set NODE_ENV to 'production'
ENV NODE_ENV production

# Install only production dependencies using Yarn in the installer stage
RUN yarn install --production

# Stage 3: Runner
FROM node:18.19.0 AS runner

# Set the working directory in the runner stage
WORKDIR /app

# # Copy the production dependencies from the installer stage
COPY --from=installer /app/node_modules ./node_modules

# # Copy the TypeScript build from the builder stage
COPY --from=builder /app/dist ./dist

COPY --from=builder /app/src/swagger ./src/swagger

# Expose the port your application will run on (if applicable)
EXPOSE 8080


# Define the command to run your application in the runner stage
CMD ["node", "dist/index.js"]
