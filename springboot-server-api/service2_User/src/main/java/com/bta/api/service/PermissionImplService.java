package com.bta.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.bta.api.base.ImplService;
import com.bta.api.dto.PermissionDto;
import com.bta.api.entity.Menu;
import com.bta.api.repository.MenuRepository;
import com.bta.api.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bta.api.entity.Role;
import com.bta.api.entity.Permission;
import com.bta.api.exception.UserServiceCustomException;
import com.bta.api.repository.PermissionRepository;

@Service
public class PermissionImplService implements ImplService<Permission, PermissionDto> {

	@Autowired
	PermissionRepository permissionRepository;

	@Autowired
    RoleRepository roleRepository;

	@Autowired
    MenuRepository menuRepository;

	public List<Permission> getPermissionByRoleId(UUID roleId) {
		if (roleRepository.existsById(roleId)) {
			return permissionRepository.findByRoleId(roleId);
		}
		throw new UserServiceCustomException("Role with given Id not found", "ROLE_NOT_FOUND");
	}

	public List<Permission> getPermissionByMenuId(UUID menuId) {
		if (menuRepository.existsById(menuId)) {
			return permissionRepository.findByMenuId(menuId);
		}
		throw new UserServiceCustomException("Menu with given Id not found", "MENU_NOT_FOUND");
	}

	public Permission savePermission(PermissionDto dto) {
		Permission entity = convertFromDtoToEntity(dto);
		if (entity != null) {
			return permissionRepository.save(entity);
		}
		return null;
	}

	public List<Permission>	saveAllPermission(List<PermissionDto> dtos) {
		List<Permission> entities = new ArrayList<>();
		dtos.forEach((PermissionDto dto) -> entities.add(convertFromDtoToEntity(dto)));
		return permissionRepository.saveAll(entities);
	}

	@Override
	public Permission convertFromDtoToEntity(PermissionDto dto) {
		Permission entity = new Permission();
		entity.setId(dto.getId());
		entity.setCreatedDate(dto.getCreatedDate());
		entity.setCreatedBy(dto.getCreatedBy());
		entity.setLastModifiedDate(dto.getLastModifiedDate());
		entity.setLastModifiedBy(dto.getLastModifiedBy());

		Role role = roleRepository.findById(dto.getRole())
				.orElseThrow(() -> new UserServiceCustomException("Role with given Id not found", "ROLE_NOT_FOUND"));
		Menu menu = menuRepository.findById(dto.getMenu())
				.orElseThrow(() -> new UserServiceCustomException("Menu with given Id not found", "MENU_NOT_FOUND"));
		entity.setRole(role);
		entity.setMenu(menu);

		return entity;
	}

}
