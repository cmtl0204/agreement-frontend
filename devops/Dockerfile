FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

#Este comando debe estar en los scripts para que compile lo de qa
RUN npm run build:qa

FROM nginx:alpine

COPY devops/nginx.conf /etc/nginx/conf.d/default.conf

#La ruta del dist debe verificarse que sea dist/browser, porque algun otro proyecto puede tener diferente
COPY --from=build /app/dist/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
