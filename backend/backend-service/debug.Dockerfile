# Use official OpenJDK image as the base
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app/backend-service

RUN apt-get update && apt-get install -y maven

# Expose the app port
EXPOSE 7012 5005

ENTRYPOINT ["sh", "debug-entrypoint.sh"]
