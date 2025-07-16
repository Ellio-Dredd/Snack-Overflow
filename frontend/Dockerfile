# Stage 1: Build the React application
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: This stage is for if you were to serve with Nginx or a similar server.
# SINCE YOU ARE USING NETLIFY, THIS PART IS NOT USED IN PRODUCTION.
# It's here for completeness if you decide to self-host frontend later.
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
 # This nginx.conf will not be used if hosted on Netlify
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]  