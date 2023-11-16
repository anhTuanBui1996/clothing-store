package com.bta.api.controller;

import java.util.List;
import java.util.UUID;

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
    public Role createRole(@RequestBody(required = true) Role role) {
        return roleService.createRole(role);
    }

    @GetMapping(path = "/")
    public List<Role> getAll() {
        return roleService.getAllRole();
    }

    @GetMapping(path = "/{id}")
    public Role getRoleById(@PathVariable("id") UUID id) {
        return roleService.getRoleById(id);
    }

    @PutMapping(path = "/")
    public Role updateRole(@RequestBody Role role) {
        return roleService.updateRole(role);
    }

    @DeleteMapping(path = "/{id}")
    public boolean deleteRole(@PathVariable(name = "id") UUID id) {
        return roleService.deleteRole(id);
    }

}
