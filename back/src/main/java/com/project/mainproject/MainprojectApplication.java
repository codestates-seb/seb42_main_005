package com.project.mainproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.Optional;
import java.util.UUID;

@SpringBootApplication
@EnableJpaAuditing
public class MainprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(MainprojectApplication.class, args);
	}


	@Bean
	public AuditorAware<String> auditorProvider() {
		return () -> Optional.ofNullable(UUID.randomUUID().toString());
	}
}
