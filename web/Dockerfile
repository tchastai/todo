FROM node:13
COPY package*.json ./
RUN npm install
RUN npm install -g http-server
COPY . .
ARG SYNC_API_URL
ENV VUE_APP_SYNC_API_URL $SYNC_API_URL
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "dist" ]