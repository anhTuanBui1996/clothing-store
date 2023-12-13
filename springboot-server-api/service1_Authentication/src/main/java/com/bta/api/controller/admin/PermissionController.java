package com.bta.api.controller.admin;

import com.bta.api.entities.views.PermissionView;
import com.bta.api.models.dto.PermissionsDto;
import com.bta.api.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin/permission")
public class PermissionController {

    @Autowired
    PermissionService permissionService;

    @GetMapping(path = "/")
    public Collection<PermissionView> getAllPermissionView() {
        return permissionService.getAll();
    }

    @GetMapping(path = "/{roleId}")
    public ResponseEntity<Collection<PermissionView>> getPermissionViewOfRole(@PathVariable(name = "roleId") UUID id) {
        return ResponseEntity.ok(permissionService.getByRole(id));
    }

    @PutMapping(path = "/")
    public ResponseEntity<List<PermissionsDto>> savePermissions(@RequestBody List<PermissionsDto> dtos) {
        return ResponseEntity.ok(permissionService.saveCollection(dtos));
    }

}
