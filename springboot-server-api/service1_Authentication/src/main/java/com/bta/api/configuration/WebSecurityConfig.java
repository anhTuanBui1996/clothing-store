package com.bta.api.configuration;

import com.bta.api.provider.CredentialsProvider;
import com.bta.api.provider.InMemoryProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableJpaAuditing
public class WebSecurityConfig {

    @Autowired
    InMemoryProvider inMemoryProvider;

    @Autowired
    CredentialsProvider credentialsProvider;

    @Bean
    AuthenticationManager authenticationManager() {
        return new ProviderManager(inMemoryProvider, credentialsProvider);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/login*").permitAll()
                        .requestMatchers("/logout*").permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/client/**").hasAnyRole("ADMIN,CLIENT")
                        .anyRequest().authenticated()
                )
                .authenticationManager(authenticationManager())
                .formLogin(Customizer.withDefaults())
                .logout(Customizer.withDefaults())
                .oauth2Login(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }

}
