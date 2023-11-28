package com.bta.api.controller;

import com.bta.api.models.dto.ChangeUserPasswordDto;
import com.bta.api.models.dto.RegisterUserDto;
import com.bta.api.models.dto.UsersDto;
import com.bta.api.service.CredentialsService;
import jakarta.persistence.EntityExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    CredentialsService credentialsService;

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
