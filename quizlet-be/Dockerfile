FROM eclipse-temurin:17-jdk-alpine as builder

WORKDIR /app

COPY gradlew .
COPY gradle/ gradle/

COPY build.gradle .
COPY settings.gradle .

COPY src ./src

RUN chmod +x gradlew

# Build the project

COPY .env .env

CMD ["tail", "-f", "/dev/null"]