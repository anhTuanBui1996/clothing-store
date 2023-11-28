package com.bta.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<?> home() {
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
