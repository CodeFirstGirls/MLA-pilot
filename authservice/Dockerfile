FROM gradle:7.2-jdk8 AS build

WORKDIR /home/gradle/src

COPY build.gradle.kts .
COPY src ./src

RUN gradle bootJar --no-daemon

FROM openjdk:8-jre-slim

EXPOSE 8090

COPY --from=build /home/gradle/src/build/libs/*.jar /app/authservice.jar

CMD ["java", "-jar", "/app/authservice.jar"]
