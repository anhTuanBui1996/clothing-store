package com.bta.api.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    public static final String LOGIN_URL = "/login";
    public static final String LOGOUT_URL = "/logout";
    public static final String LOGIN_FAIL_URL = LOGIN_URL + "?error";
    public static final String DEFAULT_SUCCESS_URL = LOGIN_URL + "?success";
    public static final String USERNAME = "username";
    public static final String PASSWORD = "password";

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((auth) -> auth
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage(LOGIN_URL)
                        .loginProcessingUrl(LOGIN_URL)
                        .failureUrl(LOGIN_FAIL_URL)
                        .usernameParameter(USERNAME)
                        .passwordParameter(PASSWORD)
                        .defaultSuccessUrl(DEFAULT_SUCCESS_URL))
                .logout(logout -> logout
                        .logoutUrl(LOGOUT_URL)
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessUrl(LOGIN_URL + "?logout"))
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public UserDetailsService users() {
        // The builder will ensure the passwords are encoded before saving in memory
        UserDetails customer = User.builder()
                .username("customer")
                .password("password")
                .roles("CUSTOMER")
                .build();
        UserDetails employee = User.builder()
                .username("employee")
                .password("password")
                .roles("EMPLOYEE")
                .build();
        UserDetails admin = User.builder()
                .username("admin")
                .password("password")
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(customer, employee, admin);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
