package com.bta.api;

import com.bta.api.entities.owner.Users;
import com.bta.api.repository.UserRepository;
import com.netflix.discovery.EurekaClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@SpringBootApplication
public class Service2Application {

    @Autowired
    @Lazy
    public EurekaClient eurekaClient;

    @Value("${spring.application.name}")
    public String appName;


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner runner(UserRepository userRepository) {
        return args -> {
            userRepository.save(Users.builder()
                    .username("admin").email("admin").authorities("ROLE_ADMIN,ROLE_USER")
                    .password(passwordEncoder().encode("password")).build());
            userRepository.save(Users.builder()
                    .username("user").email("user").authorities("ROLE_USER")
                    .password(passwordEncoder().encode("password")).build());
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(Service2Application.class, args);
    }
}
