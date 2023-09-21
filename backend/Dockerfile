# Step 1: Build the application
FROM adoptopenjdk:17-jdk-hotspot as builder
WORKDIR /app
COPY . .
RUN ./gradlew build

# Step 2: Package the application
FROM adoptopenjdk:17-jre-hotspot
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
