package com.ntt.mwonimoney;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;

@EnableJpaAuditing
@EnableScheduling
@SpringBootApplication
@OpenAPIDefinition(servers = {@Server(url = "https://j9b310.p.ssafy.io", description = "Default Server Url")})
public class WannabeeApplication {

	public static void main(String[] args) {
		SpringApplication.run(WannabeeApplication.class, args);
	}

}
