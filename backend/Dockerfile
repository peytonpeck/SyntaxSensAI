# Use official OpenJDK image as the base
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Install necessary dependencies for building the app (optional, for debugging)
RUN apt-get update && apt-get install -y maven

# Expose the app port
EXPOSE 7012

# Run the Spring Boot app when the container starts
CMD ["mvn", "spring-boot:run"]