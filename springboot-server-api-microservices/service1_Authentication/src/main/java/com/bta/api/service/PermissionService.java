package com.bta.api.service;

import com.bta.api.entities.Menu;
import com.bta.api.entities.Permissions;
import com.bta.api.entities.Roles;
import com.bta.api.entities.composites.RoleMenuKey;
import com.bta.api.models.dto.base.PermissionsDto;
import com.bta.api.repository.MenuRepository;
import com.bta.api.repository.PermissionRepository;
import com.bta.api.repository.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class PermissionService {

    @Autowired
    PermissionRepository permissionRepository;

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    RoleRepository roleRepository;

    public List<PermissionsDto> getAll() {
        List<PermissionsDto> permissionsDtos = new ArrayList<>();
        roleRepository.findAll().iterator().forEachRemaining(roles -> {
            permissionsDtos.addAll(getByRole(roles.getId()));
        });
        return permissionsDtos;
    }

    public List<PermissionsDto> getByRole(UUID roleId) {
        Optional<Roles> foundRoles = roleRepository.findById(roleId);
        List<PermissionsDto> permissionsDtos = new ArrayList<>();
        foundRoles.ifPresent(roles -> permissionRepository.findByRole(roles).forEach(permissions -> {
            permissionsDtos.add(permissions.toDto());
        }));

        for (Menu menu : menuRepository.findAll()) {
            AtomicBoolean isExisted = new AtomicBoolean(false);
            for (PermissionsDto permissionsDto : permissionsDtos) {
                if (permissionsDto.getMenuId().equals(menu.getId())) {
                    isExisted.set(true);
                    break;
                }
            }
            if (!isExisted.get()) {
                PermissionsDto dto = new PermissionsDto();
                dto.setRoleId(roleId);
                foundRoles.ifPresent(roles -> {
                    dto.setRoleCode(roles.getRoleCode());
                    dto.setRoleName(roles.getRoleName());
                });
                dto.setMenuId(menu.getId());
                dto.setMenuName(menu.getMenuName());
                permissionsDtos.add(dto);
            }
        }

        return permissionsDtos;
    }

    public PermissionsDto save(PermissionsDto dto) {
        return permissionRepository.save(applyChangesFromDto(dto)).toDto();
    }

    public List<PermissionsDto> saveCollection(List<PermissionsDto> dtos) {
        List<Permissions> permissions = new ArrayList<>();
        dtos.forEach(permissionsDto -> permissions.add(applyChangesFromDto(permissionsDto)));
        List<PermissionsDto> permissionsDtos = new ArrayList<>();
        permissionRepository.saveAll(permissions).forEach(permission -> permissionsDtos.add(permission.toDto()));
        return permissionsDtos;
    }

    public Permissions applyChangesFromDto(PermissionsDto dto) {
        RoleMenuKey key = new RoleMenuKey(dto.getRoleId(), dto.getMenuId());
        Optional<Permissions> foundPermissions = permissionRepository.findById(key);
        Permissions permissions = foundPermissions.orElseGet(Permissions::new);
        permissions.setId(key);
        permissions.setCanModified(dto.isCanModified());
        permissions.setCanView(dto.isCanView());
        permissions.setRole(roleRepository.findById(dto.getRoleId()).orElseThrow(() ->
                new EntityNotFoundException("Couldn't find Role when saving Permission: id=" + dto.getRoleId())));
        permissions.setMenu(menuRepository.findById(dto.getMenuId()).orElseThrow(() ->
                new EntityNotFoundException("Couldn't find Menu when saving Permission: id=" + dto.getMenuId())));
        return permissions;
    }

}
