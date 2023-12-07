package com.bta.api.service;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.composites.RoleMenuKey;
import com.bta.api.entities.dependencies.Permissions;
import com.bta.api.entities.owner.Roles;
import com.bta.api.entities.views.PermissionView;
import com.bta.api.models.dto.PermissionsDto;
import com.bta.api.models.dto.RolesDto;
import com.bta.api.repository.MenuRepository;
import com.bta.api.repository.PermissionRepository;
import com.bta.api.repository.PermissionViewRepository;
import com.bta.api.repository.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class RoleService implements CRUDService<Roles, RolesDto> {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    PermissionViewRepository permissionViewRepository;

    @Autowired
    PermissionRepository permissionRepository;

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

    public List<PermissionView> getPermissionOfRole(UUID roleId) {
        return permissionViewRepository.findPermissionsByRoleId(roleId);
    }

    public Permissions applyChangesFromPermissionsDto(PermissionsDto dto) throws EntityNotFoundException {
        RoleMenuKey key = new RoleMenuKey(dto.getRoleId(), dto.getMenuId());
        Optional<Permissions> foundPermissions = permissionRepository.findById(key);
        Permissions permissions = foundPermissions.orElseGet(Permissions::new);
        permissions.setId(key);
        permissions.setCanModified(dto.isCanModified());
        permissions.setCanView(dto.isCanView());
        permissions.setRoles(roleRepository.findById(dto.getRoleId()).orElseThrow(() ->
                new EntityNotFoundException("Coundn't find Role when saving Permission: id=" + dto.getRoleId())));
        permissions.setMenu(menuRepository.findById(dto.getMenuId()).orElseThrow(() ->
                new EntityNotFoundException("Coundn't find Menu when saving Permission: id=" + dto.getMenuId())));
        return permissions;
    }

    public List<PermissionsDto> savePermissions(List<PermissionsDto> dtos) {
        List<Permissions> permissions = new ArrayList<>();
        dtos.forEach(permissionsDto -> permissions.add(applyChangesFromPermissionsDto(permissionsDto)));
        List<PermissionsDto> permissionsDtos = new ArrayList<>();
        permissionRepository.saveAll(permissions).forEach(permission -> permissionsDtos.add(permission.toDto()));
        return permissionsDtos;
    }

}
