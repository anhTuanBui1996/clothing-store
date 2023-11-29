package com.bta.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ValidationController {

    @GetMapping("/admin")
    public ResponseEntity<?> validateAdmin() {
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/client")
    public ResponseEntity<?> validateClient() {
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
