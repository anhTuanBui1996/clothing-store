package com.bta.api.filter;

import com.bta.api.entities.owner.Users;
import com.bta.api.service.JwtTokenService;
import com.bta.api.repository.UserRepository;
import com.bta.api.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    JwtTokenService jwtTokenService;

    @Autowired
    UserService userService;

    @Autowired
    InMemoryUserDetailsManager memoryUserDetailsManager;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);
            if (StringUtils.hasText(jwt) && jwtTokenService.validateToken(jwt)) {
                String username = jwtTokenService.getUsernameFromJWT(jwt);

                try {
                    UserDetails inMemoryUser = memoryUserDetailsManager.loadUserByUsername(username);
                    if (inMemoryUser != null) {
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        inMemoryUser, inMemoryUser.getPassword(), inMemoryUser.getAuthorities());
                        authentication.setDetails(inMemoryUser);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                } catch (UsernameNotFoundException ex) {
                    log.error("User not found in memory on JWT filter: username=" + username);
                }

                try {
                    Users databaseUser = userService.getUserByUsername(username);
                    if (databaseUser != null) {
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        databaseUser, databaseUser.getPassword(), databaseUser.getAuthorities());
                        authentication.setDetails(databaseUser);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                } catch (UsernameNotFoundException ex) {
                    log.error("User not found in database on JWT filter: username=" + username);
                }

                response.addHeader(HttpHeaders.AUTHORIZATION, jwt);
            }
        } catch (Exception ex) {
            log.error("Failed on set user authentication", ex);
        }


        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
