# Spring Boot H2 Demo Application

This is a starter Spring Boot application initialized with Java 17, Maven, Spring Web, Spring Data JPA, and an in-memory H2 database.

## Prerequisites

- **Java**: JDK 17 or higher
- **Maven**: Maven 3.6 or higher

## Project Structure

```text
spring-boot-h2-demo/
├── pom.xml
├── README.md
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── example/
        │           └── demo/
        │               └── DemoApplication.java
        └── resources/
            └── application.properties
```

## Running the Application

To run the application locally using Maven, run the following command in the root folder of the project:

```bash
mvn spring-boot:run
```

The application will start on port `8080` by default.

## H2 Console

The H2 database console is enabled and accessible when the application is running:

- **URL**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: `password`
