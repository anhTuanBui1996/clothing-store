package com.bta.api.controller;

import java.util.List;
import java.util.UUID;

import com.bta.api.entity.User;
import com.bta.api.service.UserImplService;
import com.bta.api.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bta.api.dto.ChangeUserPasswordDto;

@RestController
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    UserImplService userService;

    @GetMapping(path = "/")
    public List<UserDto> getAllUser() {
        return userService.getAllUserDto();
    }

    @GetMapping(path = "/{id}")
    public UserDto getUserById(@PathVariable("id") UUID id) {
        return userService.getUserDtoById(id);
    }

    @PostMapping(path = "/")
    public UserDto createUser(@RequestBody(required = true) User user) {
        return userService.convertFromEntityToDto(userService.createUser(user));
    }

    @PutMapping(path = "/")
    public UserDto updateUser(@RequestBody(required = true) UserDto user) {
        return userService.updateUser(user);
    }

    @DeleteMapping(path = "/{id}")
    public boolean deleteUser(@PathVariable("id") UUID id) {
        return userService.deleteUser(id);
    }

    @PostMapping(path = "/auth/credentials")
    public UserDto loginByCredentials(boolean isAdmin, String email, String password) {
        return userService.getUserByEmailAndPassword(isAdmin, email, password);
    }

    @PostMapping(path = "/auth/credentials/changePassword")
    public boolean loginByCredentials(@RequestBody(required = true) ChangeUserPasswordDto dto) {
        return userService.updateUserPassword(dto.getId(), dto.getOldPassword(), dto.getNewPassword());
    }

}
