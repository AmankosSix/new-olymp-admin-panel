FROM node:18.16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build-only
# RUN npm run serve
CMD ["npm", "run", "preview"]

# FROM nginx as production-stage
# RUN mkdir /skk_front_vue
# COPY --from=build-stage /skk_front_vue/dist /skk_front_vue
# COPY nginx.conf /etc/nginx/nginx.conf