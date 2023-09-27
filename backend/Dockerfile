# Step 1: Build the application
FROM openjdk:17-jdk as builder
COPY *.jar app.jar
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app.jar"]
