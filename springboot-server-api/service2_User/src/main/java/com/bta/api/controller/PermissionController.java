package com.bta.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.bta.api.dto.PermissionDto;
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
    public Permission savePermission(@RequestBody PermissionDto permissionDto) {
        return permissionService.savePermission(permissionDto);
    }

    @PostMapping(path = "/saveByList")
    public List<Permission> savePermissions(@RequestBody List<PermissionDto> permissionDtos) {
        List<Permission> entities = new ArrayList<>();
        permissionDtos.forEach((PermissionDto dto) -> entities.add(permissionService.convertFromDtoToEntity(dto)));
        return entities;
    }

    @GetMapping(path = "/byRole/{id}")
    public List<Permission> getPermissionByRoleId(@PathVariable UUID id) {
        return permissionService.getPermissionByRoleId(id);
    }

    @GetMapping(path = "/byMenu/{id}")
    public List<Permission> getPermissionByMenuId(@PathVariable UUID id) {
        return permissionService.getPermissionByMenuId(id);
    }

}
