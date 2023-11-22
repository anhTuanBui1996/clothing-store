package com.bta.api.controller.client;

import com.bta.api.entity.dto.ChangeUserPasswordDto;
import com.bta.api.entity.dto.RegisterUserDto;
import com.bta.api.entity.dto.UserDto;
import com.bta.api.service.UserCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/client")
public class UserInfoController {

    @Autowired
    UserCRUDService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerNewUser(RegisterUserDto dto) {
        UserDto user = userService.registerNewUser(dto);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatusCode.valueOf(HttpStatus.OK.value()));
        }
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(HttpStatus.NOT_EXTENDED.value()));
    }

    @PostMapping("/changePassword")
    public ResponseEntity<Boolean> saveNewPasswordForUser(ChangeUserPasswordDto dto) {
        boolean res = userService.saveUserPassword(dto);
        if (res) {
            return new ResponseEntity<>(true, HttpStatusCode.valueOf(HttpStatus.OK.value()));
        }
        return new ResponseEntity<>(false, HttpStatusCode.valueOf(HttpStatus.NOT_MODIFIED.value()));
    }

    @PostMapping("/updateInfo")
    public ResponseEntity<UserDto> updateUserInfo(UserDto dto) {
        UserDto user = userService.save(dto);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatusCode.valueOf(HttpStatus.OK.value()));
        }
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(HttpStatus.NOT_EXTENDED.value()));
    }

}
