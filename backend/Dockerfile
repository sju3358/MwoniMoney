# Step 1: Build the application
FROM openjdk:17-jdk as builder
WORKDIR /app
COPY . .
RUN ./gradlew build

# Step 2: Package the application
FROM openjdk:17-jre
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
