FROM maven:3.6.3-openjdk-11-slim
EXPOSE 8080
ARG JAR_FILE=target/customermanagement-backend-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]