package com.bta.api.controller.admin;

import com.bta.api.models.dto.base.UsersDto;
import com.bta.api.service.data.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
            return ResponseEntity.ok(userService.getById(id));
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<UsersDto>> getAllUser() {
        return ResponseEntity.ok(userService.getAll());
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<UsersDto> saveUser(@PathVariable("id") UUID id, @RequestBody UsersDto dto) {
        return ResponseEntity.ok(userService.save(dto));
    }

    @PutMapping(path = "/")
    public ResponseEntity<List<UsersDto>> saveAllUser(@RequestBody List<UsersDto> dtos) {
        return ResponseEntity.ok(userService.saveCollection(dtos));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("id") UUID id) {
        if (userService.delete(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping(path = "/")
    public ResponseEntity<List<UUID>> deleteAllUser(@RequestBody Set<UUID> ids) {
        return ResponseEntity.ok(userService.deleteCollection(ids));
    }

}
