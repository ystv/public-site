# Dockerfile

# Base on offical Node.js Alpine image
FROM node:alpine

ARG BUILD_ID_ARG
ARG SOURCE_ID_ARG

LABEL build=$BUILD_ID

LABEL "site"="public"

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
HEALTHCHECK --interval=12s --timeout=12s --start-period=30s CMD node ./healthcheck.js

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

ENV NEXT_TELEMETRY_DISABLED 1

# Run npm start script when container starts
CMD ["yarn", "start"]