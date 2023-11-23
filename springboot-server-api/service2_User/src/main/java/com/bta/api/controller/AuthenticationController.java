package com.bta.api.controller;

import com.bta.api.entities.dto.LoginUserDto;
import com.bta.api.provider.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider tokenProvider;

    SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<String> loginWithCredentials(@RequestBody LoginUserDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken((Users) authentication.getPrincipal());
        return new ResponseEntity<>(jwt, HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        logoutHandler.logout(request, response, authentication);
        return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

    @GetMapping("/validate")
    public ResponseEntity<?> testValidate() {
        return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

}
