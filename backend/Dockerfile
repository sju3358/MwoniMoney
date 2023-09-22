# Step 1: Build the application
FROM openjdk:17-jdk as builder
WORKDIR /app
COPY . .
RUN chmod +x gradlew
RUN ./gradlew build

# Step 2: Package the application
FROM openjdk:17-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]