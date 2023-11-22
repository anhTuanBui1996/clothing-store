package com.bta.api.configuration;

import com.bta.api.provider.CredentialsProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
@Order(1)
public class WebSecurityConfig {

    @Autowired
    CredentialsProvider emailPasswordProvider;

    @Bean
    public JwtAuthenticationFilterChain jwtAuthenticationFilter() {
        return new JwtAuthenticationFilterChain();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(emailPasswordProvider);
        return authenticationManagerBuilder.build();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/admin/auth/login").permitAll()
                        .requestMatchers("/admin/auth/logout").permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/client/**").hasRole("CLIENT")
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginProcessingUrl("/admin/auth/login")
                        .usernameParameter("username")
                        .passwordParameter("password")
                        .failureForwardUrl("/admin/auth/login?error=true")
                        .successForwardUrl("/admin/auth/login?success=true")
                )
                .logout(logout -> logout
                        .logoutUrl("admin/auth/logout")
                        .clearAuthentication(true)
                        .deleteCookies("jwt")
                        .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler())
                )
                .oauth2Login(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults());
        http.addFilterAfter(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

}
