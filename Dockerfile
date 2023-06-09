FROM node:18 AS server

USER node
WORKDIR /home/node

COPY package*.json ./
COPY packages/server/package.json ./packages/server/
COPY packages/shared/ ./packages/shared/
RUN npm \
    --include-workspace-root \
    --workspace packages/server \
    --workspace packages/shared \
    ci

COPY tsconfig.json ./
COPY packages/server/ ./packages/server/
COPY packages/shared/ ./packages/shared/
RUN npm --workspace packages/server run build

FROM node:18-alpine

USER node
WORKDIR /home/node

COPY package*.json ./
COPY --from=server /home/node/packages/server/package.json ./packages/server/
RUN npm \
    --ignore-scripts \
    --include-workspace-root \
    --omit dev \
    --workspace packages/server \
    ci

COPY --from=server /home/node/dist/ ./dist/

ENV PORT=80
EXPOSE 80

ENTRYPOINT [ "node" ]
CMD [ "--experimental-specifier-resolution=node", "--experimental-vm-modules", "dist/server.js" ]
