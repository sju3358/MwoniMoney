# 먼저 Node.js를 사용하여 앱을 빌드합니다.
FROM node:alpine as builder

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 파일 복사하고 설치
COPY package.json package-lock.json ./
RUN npm install --force

COPY . /usr/src/app
RUN npm start

EXPOSE 3000