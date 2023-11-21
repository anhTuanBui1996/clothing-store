package com.bta.api.controller.admin;

import com.bta.api.entity.dto.LoginUserDto;
import com.bta.api.entity.dto.UserDto;
import com.bta.api.service.UserCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    UserCRUDService userService;

    @PostMapping("/login")
    public ResponseEntity<UserDto> loginByCredentials(LoginUserDto dto) {
        return new ResponseEntity<>(new UserDto(), HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

}
