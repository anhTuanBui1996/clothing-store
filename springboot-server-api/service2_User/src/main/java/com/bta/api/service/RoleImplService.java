package com.bta.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.bta.api.base.ImplService;
import com.bta.api.entity.User;
import com.bta.api.repository.PermissionRepository;
import com.bta.api.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bta.api.dto.RoleDto;
import com.bta.api.entity.Permission;
import com.bta.api.entity.Role;
import com.bta.api.exception.UserServiceCustomException;
import com.bta.api.repository.UserRepository;

@Service
public class RoleImplService implements ImplService<Role, RoleDto> {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PermissionRepository permissionRepository;

    @Autowired
    UserRepository usersRepository;

    public Role createRole(Role role) {
        if (roleRepository.findById(role.getId()).isPresent()) {
            throw new UserServiceCustomException("Role with given Id is already existed", "ROLE_EXISTED");
        }
        return roleRepository.save(role);
    }

    public List<Role> getAllRole() {
        List<Role> roles = new ArrayList<>();
        roleRepository.findAll().forEach(roles::add);
        return roles;
    }

    public Role getRoleById(UUID id) {
        return roleRepository.findById(id).orElseThrow(() -> new UserServiceCustomException("Role with given Id not found", "ROLE_NOT_FOUND"));
    }

    public Role updateRole(Role role) {
        Role entity = roleRepository.findById(role.getId()).orElseThrow(() -> new UserServiceCustomException("Role with given Id not found", "ROLE_NOT_FOUND"));
        if (entity != null) {
            return roleRepository.save(role);
        }
        return null;
    }

    public boolean deleteRole(UUID id) {
        Role entity = roleRepository.findById(id).orElseThrow(() -> new UserServiceCustomException("Role with given Id not found", "ROLE_NOT_FOUND"));
        if (entity != null) {
            roleRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Role convertFromDtoToEntity(RoleDto dto) {
        Role entity = new Role();
        entity.setId(dto.getId());
        entity.setCreatedDate(dto.getCreatedDate());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setLastModifiedDate(dto.getLastModifiedDate());
        entity.setLastModifiedBy(dto.getLastModifiedBy());

        entity.setRoleName(dto.getRoleName());
        entity.setDescription(dto.getDescription());
        List<Permission> permissionList = permissionRepository.findByRoleId(dto.getId());
        List<User> userList = usersRepository.findByRoleId(dto.getId());
        entity.setPermissions(permissionList);
        entity.setUsers(userList);

        return entity;
    }
}
