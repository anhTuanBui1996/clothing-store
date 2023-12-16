package com.bta.api.controller;

import com.bta.api.models.dto.admin.UsersDto;
import com.bta.api.models.dto.auth.ChangeUserPasswordDto;
import com.bta.api.models.dto.auth.LoginUserDto;
import com.bta.api.models.dto.auth.RegisterUserDto;
import com.bta.api.service.CredentialsService;
import com.bta.api.service.JwtTokenService;
import jakarta.persistence.EntityExistsException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    CredentialsService credentialsService;

    @Autowired
    JwtTokenService jwtTokenService;

    @Autowired
    AuthenticationManager authenticationManager;

    private final SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
    private final SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

    @PostMapping("/login")
    public ResponseEntity<?> loginWithCredentials(@RequestBody LoginUserDto dto, HttpServletRequest request, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.unauthenticated(
                dto.getUsername(), dto.getPassword());
        try {
            Authentication authentication = authenticationManager.authenticate(token);
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);
            securityContextRepository.saveContext(context, request, response);
            if (authentication.isAuthenticated()) {
                String jwtToken = jwtTokenService.generateToken(authentication.getName());
                return ResponseEntity.status(HttpStatus.OK).body(jwtToken);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        logoutHandler.logout(request, response, authentication);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //    For client user
    @PostMapping("/register")
    public ResponseEntity<UsersDto> registerNewUser(@RequestBody RegisterUserDto dto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(credentialsService.registerNewUser(dto));
        } catch (EntityExistsException ex) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changeUserPassword(@RequestBody ChangeUserPasswordDto dto) {
        try {
            if (credentialsService.saveUserPassword(dto)) {
                return ResponseEntity.status(HttpStatus.OK).build();
            }
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
