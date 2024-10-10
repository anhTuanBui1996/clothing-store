package com.bta.api.provider;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@Slf4j
public class InMemoryProvider implements AuthenticationProvider {

    @Bean
    InMemoryUserDetailsManager memoryUserDetailsManager() {
        Set<UserDetails> defaultUsers = new HashSet<>();
        defaultUsers.add(User.builder()
                .username("admin")
                .password("$2a$10$rkpRCbASS3kF0pHkR76iked5svu2EsXpWy8G7y/Rps9bE09vG3Cvq") //"password"
                .roles("ADMIN")
                .build()
        );
        return new InMemoryUserDetailsManager(defaultUsers);
    }

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        try {
            UserDetails user = memoryUserDetailsManager().loadUserByUsername(username);
            if (user != null) {
                if (passwordEncoder.matches(password, user.getPassword())) {
                    return createSuccessfulAuthentication(authentication, user);
                }
            }
        } catch (UsernameNotFoundException ex) {
            throw new AuthenticationCredentialsNotFoundException("User not found, go to next authentication: name=" + username);
        }
        return null;
    }

    private Authentication createSuccessfulAuthentication(final Authentication authentication, final UserDetails user) {
        return new UsernamePasswordAuthenticationToken(user.getUsername(), authentication.getCredentials(), user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }

}
