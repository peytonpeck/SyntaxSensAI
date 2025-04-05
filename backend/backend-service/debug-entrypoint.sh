mvn install

java -Xdebug -Xrunjdwp:transport=dt_socket,server=y,address=*:5005,suspend=n -jar target/syntax-sensai-backend-service.jar
