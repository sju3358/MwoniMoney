FROM adoptopenjdk:11-jre-hotspot
ADD /build/libs/*.jar app.jar
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app.jar"]
