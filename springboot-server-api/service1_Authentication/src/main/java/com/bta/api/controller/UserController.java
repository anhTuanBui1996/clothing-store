package com.bta.api.controller;

import com.bta.api.models.dto.UsersDto;
import com.bta.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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
            return ResponseEntity.status(HttpStatus.OK).body(userService.getById(id));
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<UsersDto>> getAllUser() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAll());
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<UsersDto> saveUser(@PathVariable("id") UUID id, @RequestBody UsersDto dto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.save(dto));
    }

    @PutMapping(path = "/")
    public ResponseEntity<List<UsersDto>> saveAllUser(@RequestBody List<UsersDto> dtos) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.saveCollection(dtos));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("id") UUID id) {
        if (userService.delete(id)) {
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping(path = "/")
    public ResponseEntity<List<UUID>> deleteAllUser(@RequestBody Set<UUID> ids) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.deleteCollection(ids));
    }

}
