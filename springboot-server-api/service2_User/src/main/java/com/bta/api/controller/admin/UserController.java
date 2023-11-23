package com.bta.api.controller.admin;

import com.bta.api.entities.dto.UsersDto;
import com.bta.api.entities.dto.UserEntityDto;
import com.bta.api.exception.UserServiceCustomException;
import com.bta.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(path = "/admin/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(path = "/{id}")
    public ResponseEntity<UsersDto> getUserById(@PathVariable("id") UUID id) {
        try {
            return new ResponseEntity<>(userService.getById(id), HttpStatusCode.valueOf(HttpStatus.FOUND.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_FOUND.value()));
        }
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<UsersDto>> getAllUser() {
        try {
            return new ResponseEntity<>(userService.getAll(), HttpStatusCode.valueOf(HttpStatus.FOUND.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_FOUND.value()));
        }
    }

    @GetMapping(path = "/forAdmin/")
    public ResponseEntity<List<Users>> getAllUserEntity() {
        try {
            return new ResponseEntity<>(userService.getAllEntity(), HttpStatusCode.valueOf(HttpStatus.FOUND.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_FOUND.value()));
        }
    }

    @PutMapping(path = "/")
    public ResponseEntity<List<UsersDto>> updateAllUser(@RequestBody List<UsersDto> dtos) {
        return new ResponseEntity<>(userService.saveCollection(dtos), HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

    @PutMapping(path = "/forAdmin/")
    public ResponseEntity<List<Users>> updateAllUserEntity(@RequestBody List<UserEntityDto> dtos) {
        return new ResponseEntity<>(userService.saveEntityCollection(dtos), HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("id") UUID id) {
        return new ResponseEntity<>(userService.delete(id), HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

    @DeleteMapping(path = "/")
    public ResponseEntity<Boolean> deleteAllUser(@RequestBody Set<UUID> ids) {
        return new ResponseEntity<>(userService.deleteCollection(ids), HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

}
