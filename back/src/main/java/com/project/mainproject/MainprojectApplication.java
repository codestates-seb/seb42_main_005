package com.project.mainproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

//@SpringBootApplication(
//		exclude = {
//				org.springframework.cloud.aws.autoconfigure.context.ContextInstanceDataAutoConfiguration.class,
//				org.springframework.cloud.aws.autoconfigure.context.ContextStackAutoConfiguration.class,
//				org.springframework.cloud.aws.autoconfigure.context.ContextRegionProviderAutoConfiguration.class
//		}
//)
@SpringBootApplication
@EnableJpaAuditing
public class MainprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(MainprojectApplication.class, args);
	}

	@Bean
	public PasswordEncoder getEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean
	public AuditorAware<String> auditorProvider() {
		return () -> Optional.ofNullable(UUID.randomUUID().toString());
	}
}
