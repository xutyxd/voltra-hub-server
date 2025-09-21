FROM alpine AS builder
RUN apk add --no-cache \
    curl \
    tar \
    xz \
    bash \
    python3 \
    make \
    g++ \
    libc6-compat

# Set Node version
ENV NODE_VERSION=22.12.0
ENV NPM_VERSION=11.6.0

# Download and install Node.js
RUN curl -fsSL https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz \
    | tar -xJ -C /usr/local --strip-components=1 \
 && ln -s /usr/local/bin/node /usr/bin/node \
 && ln -s /usr/local/bin/npm /usr/bin/npm \
 && ln -s /usr/local/bin/npx /usr/bin/npx

# Install exact npm version
RUN npm install -g npm@$NPM_VERSION

WORKDIR /user/src/app
ADD . .
RUN npm install
RUN npm run openapi:bundle
RUN npm run server:build
RUN npm run clean

FROM alpine AS runner
RUN apk add 'nodejs<21'
RUN node --version
RUN apk add 'npm<11'
WORKDIR /user/src/app
COPY --from=builder /user/src/app/server/cjs /user/src/app/server/cjs
COPY --from=builder /user/src/app/server/openapi /user/src/app/server/openapi
COPY --from=builder /user/src/app/package.json /user/src/app/package.json
COPY --from=builder /user/src/app/node_modules /user/src/app/node_modules
CMD [ "npm", "start" ]
# Expose port
EXPOSE 8080