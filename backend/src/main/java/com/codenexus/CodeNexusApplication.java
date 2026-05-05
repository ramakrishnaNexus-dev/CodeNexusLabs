package com.codenexus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class CodeNexusApplication {
    public static void main(String[] args) {
        SpringApplication.run(CodeNexusApplication.class, args);
    }
}