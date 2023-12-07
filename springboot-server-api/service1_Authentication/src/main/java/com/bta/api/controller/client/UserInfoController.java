package com.bta.api.controller.client;

import com.bta.api.models.dto.UsersDto;
import com.bta.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/client/user")
public class UserInfoController {

    @Autowired
    UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<UsersDto> getUserInfo(String username) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.getUserByUsername(username).toDto());
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
