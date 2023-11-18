package com.bta.api.controller;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.bta.api.base.BaseResponse;
import com.bta.api.dto.RoleDto;
import com.bta.api.enums.ResponseStatus;
import com.bta.api.exception.UserServiceCustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bta.api.service.RoleImplService;
import com.bta.api.entity.Role;

@RestController
@RequestMapping(path = "/role")
public class RoleController {

    @Autowired
    RoleImplService roleService;

    @PostMapping(path = "/")
    public BaseResponse createRole(@RequestBody(required = true) RoleDto role) {
        try {
            return new BaseResponse(ResponseStatus.CreatedSuccessfully, "Created a new Role successfully", new Date(), roleService.create(role));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.CreatedFailed, "Created a new Role failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @GetMapping(path = "/")
    public BaseResponse getAllRole() {
        try {
            return new BaseResponse(ResponseStatus.ReadSuccessfully, "Read all Role successfully", new Date(), roleService.getAll());
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.ReadFailed, "Read all new Role failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @GetMapping(path = "/{id}")
    public BaseResponse getRoleById(@PathVariable(name = "id") UUID id) {
        try {
            return new BaseResponse(ResponseStatus.ReadSuccessfully, "Read all Role successfully", new Date(), roleService.getById(id));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.ReadFailed, "Read all new Role failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @PutMapping(path = "/{id}")
    public BaseResponse updateRole(@PathVariable(name = "id") UUID id, @RequestBody RoleDto role) {
        role.setId(id);
        try {
            return new BaseResponse(ResponseStatus.UpdatedSuccessfully, "Updated an existing Role successfully", new Date(), roleService.update(role));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.UpdatedFailed, "Updated an existing Role failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @PutMapping(path = "/")
    public BaseResponse updateAllRole(@RequestBody List<RoleDto> roles) {
        try {
            return new BaseResponse(ResponseStatus.UpdatedSuccessfully, "Updated an existing Role successfully", new Date(), roleService.updateCollection(roles));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.UpdatedFailed, "Updated an existing Role failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @DeleteMapping(path = "/{id}")
    public BaseResponse deleteRole(@PathVariable(name = "id") UUID id) {
        try {
            return new BaseResponse(ResponseStatus.DeletedSuccessfully, "Deleted an existing Role successfully", new Date(), roleService.delete(id));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.DeletedFailed, "Deleted an existing Role failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @DeleteMapping(path = "/")
    public BaseResponse deleteAllRole(@RequestBody List<UUID> ids) {
        try {
            return new BaseResponse(ResponseStatus.DeletedSuccessfully, "Deleted list of Role successfully", new Date(), roleService.deleteCollection(ids));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.DeletedFailed, "Deleted list of Role failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

}
