# Node.js로 앱을 빌드
FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install --force
COPY . .

# React 앱을 빌드
RUN npm run build

# Nginx 이미지를 사용하여 앱을 서빙
FROM nginx

# 빌드된 앱 파일을 Nginx의 웹 루트로 복사
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Nginx 서버를 시작
CMD ["nginx", "-g", "daemon off;"]

# 포트 노출
EXPOSE 80
