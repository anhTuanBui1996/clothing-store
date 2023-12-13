package com.bta.api.service;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.composites.RoleMenuKey;
import com.bta.api.entities.dependencies.Permissions;
import com.bta.api.entities.views.PermissionView;
import com.bta.api.models.dto.PermissionsDto;
import com.bta.api.repository.MenuRepository;
import com.bta.api.repository.PermissionRepository;
import com.bta.api.repository.PermissionViewRepository;
import com.bta.api.repository.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;

@Service
public class PermissionService {

    @Autowired
    PermissionViewRepository permissionViewRepository;

    @Autowired
    PermissionRepository permissionRepository;

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    RoleRepository roleRepository;

    public Collection<PermissionView> getAll() {
        return permissionViewRepository.findAllPermissions();
    }

    public Collection<PermissionView> getByRole(UUID roleId) {
        return permissionViewRepository.findPermissionsByRoleId(roleId.toString()).stream().toList();
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
