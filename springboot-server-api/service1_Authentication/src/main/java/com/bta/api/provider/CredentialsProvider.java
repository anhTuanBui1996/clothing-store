package com.bta.api.provider;

import com.bta.api.entities.Users;
import com.bta.api.models.implement.UserDetailsImpl;
import com.bta.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CredentialsProvider implements AuthenticationProvider {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String name = authentication.getName();
        String credential = authentication.getCredentials().toString();

        Users foundUser = userRepository.findByUsername(name).orElseGet(() ->
                userRepository.findByEmail(name).orElseGet(() ->
                        userRepository.findByPhoneNumber(name).orElseThrow(() ->
                                new UsernameNotFoundException("User not found by login: name=" + name))));
        if (foundUser != null) {
            if (passwordEncoder.matches(credential, foundUser.getPassword())) {
                return createSuccessfulAuthentication(authentication, new UserDetailsImpl(foundUser));
            }
        }
        throw new AuthenticationCredentialsNotFoundException("Incorrect credentials with name=" + name + " and password=" + credential);
    }

    private Authentication createSuccessfulAuthentication(final Authentication authentication, final UserDetails user) {
        return new UsernamePasswordAuthenticationToken(user.getUsername(), authentication.getCredentials(), user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }

}
