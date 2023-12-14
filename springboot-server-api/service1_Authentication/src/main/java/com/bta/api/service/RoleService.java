package com.bta.api.service;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.Roles;
import com.bta.api.models.dto.admin.RolesDto;
import com.bta.api.repository.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoleService implements CRUDService<Roles, RolesDto> {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public Roles applyChangesFromDto(RolesDto dto) {
        Optional<Roles> foundRole = roleRepository.findById(dto.getId());
        Roles role = foundRole.orElseGet(Roles::new);
        role.setRoleCode(dto.getRoleCode());
        role.setRoleName(dto.getRoleName());
        role.setDescription(dto.getDescription());
        return role;
    }

    @Override
    public List<RolesDto> getAll() {
        List<RolesDto> rolesDtos = new ArrayList<>();
        roleRepository.findAll().forEach(role -> rolesDtos.add(role.toDto()));
        return rolesDtos;
    }

    @Override
    public RolesDto getById(UUID id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Roles not found: " + id))
                .toDto();
    }

    @Override
    public RolesDto save(RolesDto dto) {
        return roleRepository.save(applyChangesFromDto(dto)).toDto();
    }

    @Override
    public List<RolesDto> saveCollection(List<RolesDto> dtos) {
        List<Roles> roles = new ArrayList<>();
        dtos.forEach((RolesDto dto) -> {
            roles.add(applyChangesFromDto(dto));
        });
        List<RolesDto> rolesDtos = new ArrayList<>();
        roleRepository.saveAll(roles).forEach(role -> rolesDtos.add(role.toDto()));
        return rolesDtos;
    }

    @Override
    public boolean delete(UUID id) {
        if (!roleRepository.existsById(id)) {
            throw new EntityNotFoundException("Role not found: id=" + id);
        }
        roleRepository.deleteById(id);
        return true;
    }

    @Override
    public List<UUID> deleteCollection(Set<UUID> ids) {
        List<UUID> result = new ArrayList<>(ids);
        result.forEach((UUID id) -> {
            if (!roleRepository.existsById(id)) {
                result.remove(id);
            }
        });
        roleRepository.deleteAllById(ids);
        return result;
    }

}
