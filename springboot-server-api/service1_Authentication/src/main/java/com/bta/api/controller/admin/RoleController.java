package com.bta.api.controller.admin;

import com.bta.api.models.dto.admin.RolesDto;
import com.bta.api.service.RoleService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(path = "/admin/role")
public class RoleController {

    @Autowired
    RoleService roleService;

    @GetMapping(path = "/{id}")
    public ResponseEntity<RolesDto> getRole(@PathVariable(name = "id") UUID id) {
        try {
            return ResponseEntity.ok(roleService.getById(id));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<RolesDto>> getAllRole() {
        return ResponseEntity.ok(roleService.getAll());
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<RolesDto> saveRole(@PathVariable(name = "id") UUID id, @RequestBody RolesDto dto) {
        dto.setId(id);
        return ResponseEntity.ok(roleService.save(dto));
    }

    @PutMapping(path = "/")
    public ResponseEntity<List<RolesDto>> saveAllRole(@RequestBody List<RolesDto> dtos) {
        return ResponseEntity.ok(roleService.saveCollection(dtos));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteRole(@PathVariable(name = "id") UUID id) {
        if (roleService.delete(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping(path = "/")
    public ResponseEntity<List<UUID>> deleteAllRole(@RequestBody Set<UUID> ids) {
        return ResponseEntity.ok(roleService.deleteCollection(ids));
    }

}
