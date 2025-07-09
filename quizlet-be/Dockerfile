FROM eclipse-temurin:17-jdk-alpine as builder

WORKDIR /app

# Copy Gradle wrapper and configuration
COPY gradlew .
COPY gradle/ gradle/
COPY build.gradle settings.gradle ./

# Copy source code
COPY src ./src

# Gradle Build
RUN chmod +x gradlew && ./gradlew clean build

FROM eclipse-temurin:17-jre-alpine as final

WORKDIR /app

COPY --from=builder /app/build/libs/quizlet_be-0.0.1-SNAPSHOT.jar ./app.jar

# Copy env file
COPY .env ./.env

EXPOSE 8080

CMD ["java", "-jar", "./app.jar"]
#CMD ["tail", "-f", "/dev/null"]