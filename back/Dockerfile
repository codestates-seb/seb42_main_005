FROM openjdk:11

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["nohup", "java", "-jar", "-Dprofile=pro", "-Duser.timezone=Asia/Seoul", "/app.jar", "&"]