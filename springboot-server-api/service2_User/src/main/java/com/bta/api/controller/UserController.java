package com.bta.api.controller;

import com.bta.api.dto.ChangeUserPasswordDto;
import com.bta.api.dto.LoginUserDto;
import com.bta.api.dto.UserDto;
import com.bta.api.exception.UserServiceCustomException;
import com.bta.api.service.UserCRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    UserCRUDService userService;

    @GetMapping(path = "/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") UUID id) {
        try {
            return new ResponseEntity<>(userService.getById(id), HttpStatusCode.valueOf(HttpStatus.FOUND.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_FOUND.value()));
        }
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<UserDto>> getAllUser() {
        try {
            return new ResponseEntity<>(userService.getAll(), HttpStatusCode.valueOf(HttpStatus.FOUND.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_FOUND.value()));
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable UUID id, @RequestBody UserDto dto) {
        dto.setId(id);
        try {
            return new ResponseEntity<>(userService.save(dto), HttpStatusCode.valueOf(HttpStatus.OK.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_MODIFIED.value()));
        }
    }

    @PutMapping(path = "/")
    public ResponseEntity<List<UserDto>> updateAllUser(@RequestBody List<UserDto> dtos) {
        return new ResponseEntity<>(userService.saveCollection(dtos), HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(userService.delete(id), HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

    @DeleteMapping(path = "/")
    public ResponseEntity<Boolean> deleteAllUser(@RequestBody Set<UUID> ids) {
        return new ResponseEntity<>(userService.deleteCollection(ids), HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

    @PostMapping(path = "/auth/credentials")
    public ResponseEntity<UserDto> loginByCredentials(@RequestBody LoginUserDto dto) {
        userService.loadUserByUsername()
    }

    @PostMapping(path = "/auth/credentials/changePassword/{id}")
    public BaseResponse changeUserPassword(@PathVariable(name = "id") UUID id, @RequestBody ChangeUserPasswordDto dto) {
        dto.setId(id);
        try {
            return new BaseResponse(ResponseStatus.UpdatedSuccessfully, "Change user password successfully", new Date(), userService.updateUserPassword(dto.getId(), dto.getOldPassword(), dto.getNewPassword()));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.UpdatedFailed, "Change user password failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

}
