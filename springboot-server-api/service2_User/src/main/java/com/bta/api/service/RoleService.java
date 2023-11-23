package com.bta.api.service;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

import com.bta.api.base.CRUDService;
import com.bta.api.entity.independent.Roles;
import com.bta.api.repository.PermissionRepository;
import com.bta.api.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bta.api.entity.dto.RoleDto;
import com.bta.api.exception.UserServiceCustomException;
import com.bta.api.repository.UserRepository;

@Service
public class RoleCRUDService implements CRUDService<RoleDto> {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PermissionRepository permissionRepository;

    @Autowired
    UserRepository usersRepository;

    @Override
    public List<RoleDto> getAll() {
        List<RoleDto> roleDtos = new ArrayList<>();
        roleRepository.findAll().forEach(role -> roleDtos.add(role.toDto()));
        return roleDtos;
    }

    @Override
    public RoleDto getById(UUID id) {
        return roleRepository.findById(id).orElseThrow(() -> new UserServiceCustomException("Roles with given Id not found", "ROLE_NOT_FOUND")).toDto();
    }

    @Override
    public RoleDto save(RoleDto dto) {
        return roleRepository.save(new Roles().applyChanges(dto)).toDto();
    }

    @Override
    public List<RoleDto> saveCollection(List<RoleDto> dtos) {
        List<Roles> roles = new ArrayList<>();
        dtos.forEach((RoleDto dto) -> {
            roles.add(new Roles().applyChanges(dto));
        });
        List<RoleDto> roleDtos = new ArrayList<>();
        roleRepository.saveAll(roles).forEach(role -> roleDtos.add(role.toDto()));
        return roleDtos;
    }

    @Override
    public boolean delete(UUID id) {
        if (!roleRepository.existsById(id)) {
            throw new UserServiceCustomException("Roles with given Id not found", "ROLE_NOT_FOUND");
        }
        roleRepository.deleteById(id);
        return true;
    }

    @Override
    public boolean deleteCollection(Set<UUID> ids) {
        AtomicBoolean result = new AtomicBoolean(true);
        ids.forEach((UUID id) -> {
            if (!roleRepository.existsById(id)) {
                result.set(false);
                throw new UserServiceCustomException("Roles with given Id not found", "ROLE_NOT_FOUND");
            }
        });
        roleRepository.deleteAllById(ids);
        return result.get();
    }

}
