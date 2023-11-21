package com.bta.api.controller.admin;

import com.bta.api.dto.ChangeUserPasswordDto;
import com.bta.api.dto.LoginUserDto;
import com.bta.api.dto.RegisterUserDto;
import com.bta.api.dto.UserDto;
import com.bta.api.entity.User;
import com.bta.api.exception.UserServiceCustomException;
import com.bta.api.service.UserCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/admin/auth")
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserCRUDService userService;

    @GetMapping(path = "/")
    public ResponseEntity<UserDto> validate() {
        return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

    @PostMapping(path = "/credentials")
    public ResponseEntity<UserDto> loginByCredentials(@RequestBody LoginUserDto dto) {
        try {
            User user = (User) userService.loadUserByUsername(dto.getEmail());
            String encodedPassword = passwordEncoder.encode(dto.getPassword());
            if (encodedPassword.equals(user.getPassword())) {
                return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.CONTINUE.value()));
            }
            throw new UserServiceCustomException("Incorrect password with given email", "INVALID_LOGIN");
        } catch (UsernameNotFoundException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_FOUND.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.UNAUTHORIZED.value()));
        }
    }

    @PostMapping(path = "/credentials/register/")
    public ResponseEntity<UserDto> registerNewUser(@RequestBody RegisterUserDto dto) {
        try {
            return new ResponseEntity<>(userService.registerNewUser(dto), HttpStatusCode.valueOf(HttpStatus.OK.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_MODIFIED.value()));
        }
    }

    @PostMapping(path = "/credentials/changePassword/")
    public ResponseEntity<Boolean> changeUserPassword(@RequestBody ChangeUserPasswordDto dto) {
        try {
            return new ResponseEntity<>(userService.saveUserPassword(dto), HttpStatusCode.valueOf(HttpStatus.OK.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_MODIFIED.value()));
        }
    }

}
