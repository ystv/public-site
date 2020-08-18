# Dockerfile

# Base on offical Node.js Alpine image
FROM node:alpine

ARG BUILD_ID_ARG
ARG SOURCE_ID_ARG

LABEL build=$BUILD_ID

# Set working directory
WORKDIR /usr/app

# Copy all files
COPY ./ ./

RUN echo commitID: ${SOURCE_ID_ARG}
ENV SOURCE_ID=$SOURCE_ID_ARG
ENV BUILD_ID=$BUILD_ID_ARG

# Build app
RUN yarn install

RUN yarn build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script when container starts
CMD yarn start