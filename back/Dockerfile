FROM openjdk:11

WORKDIR /test
ARG JAR_FILE=build/libs/mainproject-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["nohup", "java", "-jar", "-Duser.timezone=Asia/Seoul", "./test/app.jar", "&"]