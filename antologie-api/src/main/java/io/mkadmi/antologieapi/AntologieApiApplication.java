package io.mkadmi.antologieapi;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = { "io.mkadmi.antologieapi.controllers", "io.mkadmi.antologieapi.services", "io.mkadmi.antologieapi.config" })

public class AntologieApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(AntologieApiApplication.class, args);
    }
}
