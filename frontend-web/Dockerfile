# Node.js로 앱을 빌드
FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install --force

COPY . /usr/src/app
RUN npm run build

# React 개발 서버를 실행
CMD ["npm", "start"]

EXPOSE 3000