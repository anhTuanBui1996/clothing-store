package com.bta.api.controller;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.bta.api.base.BaseResponse;
import com.bta.api.entity.User;
import com.bta.api.enums.ResponseStatus;
import com.bta.api.exception.UserServiceCustomException;
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
    public BaseResponse getAllUser() {
        try {
            return new BaseResponse(ResponseStatus.ReadSuccessfully, "Read all User successfully", new Date(), userService.getAllUserDto());
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.ReadFailed, "Read all User failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @GetMapping(path = "/{id}")
    public BaseResponse getUserById(@PathVariable("id") UUID id) {
        try {
            return new BaseResponse(ResponseStatus.ReadSuccessfully, "Read an existing User successfully", new Date(), userService.getUserDtoById(id));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.ReadFailed, "Read an existing User failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @PostMapping(path = "/")
    public BaseResponse createUser(@RequestBody(required = true) User user) {
        try {
            return new BaseResponse(ResponseStatus.CreatedSuccessfully, "Read an existing User successfully", new Date(), userService.create(user));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.CreatedFailed, "Read an existing User failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @PutMapping(path = "/")
    public BaseResponse updateUser(@RequestBody(required = true) UserDto user) {
        try {
            return new BaseResponse(ResponseStatus.UpdatedSuccessfully, "Updated an existing User successfully", new Date(), userService.updateUser(user));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.UpdatedFailed, "Updated an existing User failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @DeleteMapping(path = "/{id}")
    public BaseResponse deleteUser(@PathVariable("id") UUID id) {
        try {
            return new BaseResponse(ResponseStatus.DeletedSuccessfully, "Deleted an existing User successfully", new Date(), userService.deleteUser(id));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.DeletedFailed, "Deleted an existing User failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @PostMapping(path = "/auth/credentials")
    public BaseResponse loginByCredentials(boolean isAdmin, String email, String password) {
        try {
            return new BaseResponse(ResponseStatus.UpdatedSuccessfully, "Login by credentials successfully", new Date(), userService.getUserByEmailAndPassword(isAdmin, email, password));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.UpdatedFailed, "Login by credentials failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @PostMapping(path = "/auth/credentials/changePassword")
    public BaseResponse changeUserPassword(@RequestBody(required = true) ChangeUserPasswordDto dto) {
        try {
            return new BaseResponse(ResponseStatus.UpdatedSuccessfully, "Change user password successfully", new Date(), userService.updateUserPassword(dto.getId(), dto.getOldPassword(), dto.getNewPassword()));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.UpdatedFailed, "Change user password failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

}
