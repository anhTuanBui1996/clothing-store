package com.bta.api.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.bta.api.base.BaseResponse;
import com.bta.api.dto.PermissionDto;
import com.bta.api.enums.ResponseStatus;
import com.bta.api.exception.UserServiceCustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bta.api.service.PermissionImplService;
import com.bta.api.entity.Permission;

@RestController
@RequestMapping(path = "/permission")
public class PermissionController {

    @Autowired
    PermissionImplService permissionService;

    @PostMapping(path = "/")
    public BaseResponse savePermission(@RequestBody PermissionDto permissionDto) {
        try {
            return new BaseResponse(ResponseStatus.UpdatedSuccessfully, "Updated a Menu successfully", new Date(), permissionService.update(permissionDto));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.UpdatedFailed, "Updated a Menu failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @PostMapping(path = "/saveByList")
    public BaseResponse savePermissions(@RequestBody List<PermissionDto> permissionDtos) {
        try {
            List<Permission> entities = new ArrayList<>();
            permissionDtos.forEach((PermissionDto dto) -> entities.add(permissionService.convertFromDtoToEntity(dto)));
            return new BaseResponse(ResponseStatus.UpdatedSuccessfully, "Updated a Menu successfully", new Date(), entities);
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.UpdatedFailed, "Updated a Menu failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @GetMapping(path = "/byRole/{id}")
    public BaseResponse getPermissionByRoleId(@PathVariable UUID id) {
        try {
            return new BaseResponse(ResponseStatus.ReadSuccessfully, "Read Menu by id successfully", new Date(), permissionService.getPermissionByRoleId(id));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.ReadFailed, "Read Menu by id failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @GetMapping(path = "/byMenu/{id}")
    public BaseResponse getPermissionByMenuId(@PathVariable UUID id) {
        try {
            return new BaseResponse(ResponseStatus.ReadSuccessfully, "Read Menu by id successfully", new Date(), permissionService.getPermissionByMenuId(id));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.ReadFailed, "Read Menu by id failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

}
