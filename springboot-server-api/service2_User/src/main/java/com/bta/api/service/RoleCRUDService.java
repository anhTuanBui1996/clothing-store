package com.bta.api.service;

import java.util.*;

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

    @Override
    public List<Role> getAll() {
        List<Role> roles = new ArrayList<>();
        roleRepository.findAll().forEach(roles::add);
        return roles;
    }

    @Override
    public Role getById(UUID id) {
        return roleRepository.findById(id).orElseThrow(() -> new UserServiceCustomException("Role with given Id not found", "ROLE_NOT_FOUND"));
    }

    @Override
    public Role create(RoleDto dto) {
        if (roleRepository.existsById(dto.getId())) {
            throw new UserServiceCustomException("Role with given Id is already ", "ROLE_NOT_FOUND");
        }
        return roleRepository.save(convertFromDtoToEntity(dto));
    }

    @Override
    public Role update(RoleDto dto) {
        Role entity = roleRepository.findById(dto.getId()).orElseThrow(() -> new UserServiceCustomException("Role with given Id not found", "ROLE_NOT_FOUND"));
        if (entity != null) {
            return roleRepository.save(convertFromDtoToEntity(dto));
        }
        return null;
    }

    @Override
    public List<Role> updateCollection(List<RoleDto> dtos) {
        List<Role> entities = new ArrayList<>();
        dtos.forEach((RoleDto dto) -> {
            if (!roleRepository.existsById(dto.getId())) {
                throw new UserServiceCustomException("Role with given Id not found", "ROLE_NOT_FOUND");
            }
            entities.add(convertFromDtoToEntity(dto));
        });
        return (List<Role>) roleRepository.saveAll(entities);
    }

    @Override
    public boolean delete(UUID id) {
        Role entity = roleRepository.findById(id).orElseThrow(() -> new UserServiceCustomException("Role with given Id not found", "ROLE_NOT_FOUND"));
        if (entity != null) {
            roleRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Boolean> deleteCollection(List<UUID> ids) {
        List<Boolean> resList = new ArrayList<>();
        ids.forEach((UUID id) -> {
            if (roleRepository.existsById(id)) {
                resList.add(true);
            } else {
                resList.add(false);
                throw new UserServiceCustomException("Role with given Id not found", "ROLE_NOT_FOUND");
            }
        });
        roleRepository.deleteAllById(ids);
        return resList;
    }

    @Override
    public Role convertFromDtoToEntity(RoleDto dto) {
        Role entity = new Role();
        Optional<Role> foundEntity = roleRepository.findById(dto.getId());
        if (foundEntity.isPresent()) {
            entity = foundEntity.get();
        } else {
            entity.setId(dto.getId());
        }
        entity.setCreatedDate(dto.getCreatedDate());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setLastModifiedDate(dto.getLastModifiedDate());
        entity.setLastModifiedBy(dto.getLastModifiedBy());

        entity.setRoleName(dto.getRoleName());
        entity.setDescription(dto.getDescription());
        List<Permission> permissionList = new ArrayList<>();
        dto.getPermissions().forEach((UUID id) -> {
            Permission foundPermission = permissionRepository.findById(id).orElseThrow(
                    () -> new UserServiceCustomException("Permission with given Id not found", "PERMISSION_NOT_FOUND"));
            permissionList.add(foundPermission);
        });
        entity.setPermissions(permissionList);
        Set<User> userList = usersRepository.findByRoleId(dto.getId());
        entity.setUsers(userList);

        return entity;
    }
}
