package com.bta.api.controller.client;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client/auth")
public class AuthController {

    public ResponseEntity<Boolean> validate() {
        return new ResponseEntity<>(true, HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

}
