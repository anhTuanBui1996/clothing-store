package com.bta.api.controller;

import com.bta.api.models.dto.ChangeUserPasswordDto;
import com.bta.api.models.dto.RegisterUserDto;
import com.bta.api.models.dto.UsersDto;
import com.bta.api.service.UserService;
import jakarta.persistence.EntityExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @Autowired
    UserService userService;

    @GetMapping("/validate")
    public ResponseEntity<?> testValidate() {
        return ResponseEntity.status(HttpStatus.OK).build();
    }

//    For client user
    @PostMapping("/register")
    public ResponseEntity<UsersDto> registerNewUser(RegisterUserDto dto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerNewUser(dto));
        } catch (EntityExistsException ex) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changeUserPassword(ChangeUserPasswordDto dto) {
        try {
            if (userService.saveUserPassword(dto)) {
                return ResponseEntity.status(HttpStatus.OK).build();
            }
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



}
