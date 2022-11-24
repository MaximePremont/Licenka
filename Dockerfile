FROM node:18-alpine
COPY . .
RUN npm install
RUN npm run build
ENV PORT 80
EXPOSE 80
CMD npm start