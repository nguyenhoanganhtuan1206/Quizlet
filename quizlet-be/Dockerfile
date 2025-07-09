FROM eclipse-temurin:17-jdk-alpine as builder

WORKDIR /app

COPY gradlew .
COPY gradle/ gradle/

COPY build.gradle .
COPY settings.gradle .

# Copy source code
#COPY src ./src

COPY .env ./.env
RUN chmod +x gradlew

# Build the project
RUN ./gradlew clean build

#CMD ["java", "-jar", "./build/libs/quizlet_be-0.0.1-SNAPSHOT.jar"]
CMD ["tail", "-f", "/dev/null"]