package com.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.client.RestTemplate;

import com.netflix.discovery.EurekaClient;

@SpringBootApplication
public class Service3Application {

	@Autowired
	@Lazy
	private EurekaClient eurekaClient;

	@Value("${spring.application.name}")
	private String appName;

	public static void main(String[] args) {
		SpringApplication.run(Service3Application.class, args);
	}

}

@Configuration
class RestTemplateConfig {

    // Create a bean for restTemplate to call services
    // Load balance between service instances running at different ports.
    @Bean
    @LoadBalanced
    RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
