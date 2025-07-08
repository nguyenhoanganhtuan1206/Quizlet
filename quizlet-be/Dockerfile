FROM gradle:7.2.0-jdk17 AS builder
WORKDIR /app

COPY build.gradle settings.gradle ./
COPY gradle ./
COPY src ./src

RUN gradle build --no-daemon
