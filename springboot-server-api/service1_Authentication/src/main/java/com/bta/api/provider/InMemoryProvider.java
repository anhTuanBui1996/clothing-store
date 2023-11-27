package com.bta.api.provider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class InMemoryProvider implements AuthenticationProvider {

    InMemoryUserDetailsManager memoryUserDetailsManager() {
        Set<UserDetails> defaultUsers = new HashSet<>();
        defaultUsers.add(User.builder()
                .username("admin")
                .password("$2a$10$rkpRCbASS3kF0pHkR76iked5svu2EsXpWy8G7y/Rps9bE09vG3Cvq")
                .roles("ADMIN", "CLIENT")
                .build()
        );
        defaultUsers.add(User.builder()
                .username("client")
                .password("$2a$10$rkpRCbASS3kF0pHkR76iked5svu2EsXpWy8G7y/Rps9bE09vG3Cvq")
                .roles("CLIENT")
                .build()
        );
        return new InMemoryUserDetailsManager(defaultUsers);
    };

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        UserDetails user = memoryUserDetailsManager().loadUserByUsername(username);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                return createSuccessfulAuthentication(authentication, user);
            }
        }
        throw new AuthenticationCredentialsNotFoundException("Incorrect credentials with name=" + username);
    }

    private Authentication createSuccessfulAuthentication(final Authentication authentication, final UserDetails user) {
        return new UsernamePasswordAuthenticationToken(user.getUsername(), authentication.getCredentials(), user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }

}
