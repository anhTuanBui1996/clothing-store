package com.bta.api.controller.admin;

import com.bta.api.models.dto.RolesDto;
import com.bta.api.exception.UserServiceCustomException;
import com.bta.api.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
            return new ResponseEntity<>(roleService.getById(id), HttpStatusCode.valueOf(HttpStatus.FOUND.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_FOUND.value()));
        }
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<RolesDto>> getAllRole() {
        try {
            return new ResponseEntity<>(roleService.getAll(), HttpStatusCode.valueOf(HttpStatus.FOUND.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_FOUND.value()));
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<RolesDto> updateRole(@PathVariable(name = "id") UUID id, @RequestBody RolesDto dto) {
        dto.setId(id);
        try {
            return new ResponseEntity<>(roleService.save(dto), HttpStatusCode.valueOf(HttpStatus.OK.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_MODIFIED.value()));
        }
    }

    @PutMapping(path = "/")
    public ResponseEntity<List<RolesDto>> updateAllRole(@RequestBody List<RolesDto> dtos) {
        return new ResponseEntity<>(roleService.saveCollection(dtos), HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteRole(@PathVariable(name = "id") UUID id) {
        return new ResponseEntity<>(roleService.delete(id), HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

    @DeleteMapping(path = "/")
    public ResponseEntity<Boolean> deleteAllRole(@RequestBody Set<UUID> ids) {
        return new ResponseEntity<>(roleService.deleteCollection(ids), HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

}
