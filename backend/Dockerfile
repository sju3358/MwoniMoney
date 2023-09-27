# Step 1: Build the application
FROM openjdk:17-jdk as builder
# WORKDIR /app
# COPY build/libs/*.jar app.jar
ADD build/libs/*.jar app.jar
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app.jar"]
