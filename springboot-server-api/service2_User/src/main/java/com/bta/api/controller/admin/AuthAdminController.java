package com.bta.api.controller.admin;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/auth")
public class AuthController {

    @GetMapping("/")
    public ResponseEntity<Boolean> validate() {
        return new ResponseEntity<>(true, HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

}
