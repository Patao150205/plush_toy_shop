FROM node:14.4.0
COPY . $HOME/plush_toy_shop
WORKDIR $HOME/plush_toy_shop
ENV PORT = 5000
ENV NODE_ENV = production
RUN npm install
EXPOSE 5000
CMD npm run start

