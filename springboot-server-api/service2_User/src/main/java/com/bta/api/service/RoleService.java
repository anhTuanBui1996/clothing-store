package com.bta.api.service;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.owner.Roles;
import com.bta.api.repository.PermissionRepository;
import com.bta.api.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bta.api.models.dto.RolesDto;
import com.bta.api.exception.UserServiceCustomException;
import com.bta.api.repository.UserRepository;

@Service
public class RoleService implements CRUDService<RolesDto> {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PermissionRepository permissionRepository;

    @Autowired
    UserRepository usersRepository;

    @Override
    public List<RolesDto> getAll() {
        List<RolesDto> rolesDtos = new ArrayList<>();
        roleRepository.findAll().forEach(role -> rolesDtos.add(role.toDto()));
        return rolesDtos;
    }

    @Override
    public RolesDto getById(UUID id) {
        return roleRepository.findById(id).orElseThrow(() -> new UserServiceCustomException("Roles with given Id not found", "ROLE_NOT_FOUND")).toDto();
    }

    @Override
    public RolesDto save(RolesDto dto) {
        return roleRepository.save(new Roles().applyChanges(dto)).toDto();
    }

    @Override
    public List<RolesDto> saveCollection(List<RolesDto> dtos) {
        List<Roles> roles = new ArrayList<>();
        dtos.forEach((RolesDto dto) -> {
            roles.add(new Roles().applyChanges(dto));
        });
        List<RolesDto> rolesDtos = new ArrayList<>();
        roleRepository.saveAll(roles).forEach(role -> rolesDtos.add(role.toDto()));
        return rolesDtos;
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
