### Compiling & Running

To run the backend & database, run:
```bash
docker compose up spring-boot-app
```

To run the backend debugger, the `syntax-sensai-backend-service` must not be running in docker. Use Docker Desktop 
to turn this container off. Or, use `docker compose down` to delete the image.

To compose the debug image, run:

```bash
docker compose up spring-boot-app-debug
```

To use debug mode, go to IntelliJ `Run > + > Remote JVM Debug > Ensure address is localhost:5005 (this is default) > 
Apply > Run`

To stop all backend docker containers,

```bash
docker compose down
```
