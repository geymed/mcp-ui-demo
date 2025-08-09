FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN if [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm i --frozen-lockfile;     elif [ -f yarn.lock ]; then yarn --frozen-lockfile;     else npm ci; fi || npm install

FROM node:20-alpine AS runtime
WORKDIR /app
ENV SERVER_ORIGIN=http://localhost:8787
COPY . .
EXPOSE 5173
CMD ["npx","http-server","-p","5173","-c-1","."]
