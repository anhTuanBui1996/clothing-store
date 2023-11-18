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

    @PostMapping(path = "/{id}")
    public BaseResponse savePermission(@PathVariable UUID id, @RequestBody PermissionDto permissionDto) {
        permissionDto.setId(id);
        try {
            return new BaseResponse(ResponseStatus.UpdatedSuccessfully, "Updated a Permission successfully", new Date(), permissionService.update(permissionDto));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.UpdatedFailed, "Updated a Permission failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @PostMapping(path = "/")
    public BaseResponse savePermissions(@RequestBody List<PermissionDto> permissionDtos) {
        try {
            List<Permission> entities = new ArrayList<>();
            permissionDtos.forEach((PermissionDto dto) -> entities.add(permissionService.convertFromDtoToEntity(dto)));
            return new BaseResponse(ResponseStatus.UpdatedSuccessfully, "Updated a list of Permission successfully", new Date(), entities);
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.UpdatedFailed, "Updated a list of Permission failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @GetMapping(path = "/byRole/{id}")
    public BaseResponse getPermissionByRoleId(@PathVariable UUID id) {
        try {
            return new BaseResponse(ResponseStatus.ReadSuccessfully, "Read Permission by Role id successfully", new Date(), permissionService.getPermissionByRoleId(id));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.ReadFailed, "Read Permission by Role id failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @GetMapping(path = "/byMenu/{id}")
    public BaseResponse getPermissionByMenuId(@PathVariable UUID id) {
        try {
            return new BaseResponse(ResponseStatus.ReadSuccessfully, "Read Permission by Menu id successfully", new Date(), permissionService.getPermissionByMenuId(id));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.ReadFailed, "Read Permission by Menu id failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

}
