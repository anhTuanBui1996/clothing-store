package com.bta.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.bta.api.base.ImplService;
import com.bta.api.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bta.api.dto.MenuDto;
import com.bta.api.entity.Menu;
import com.bta.api.entity.Permission;
import com.bta.api.exception.UserServiceCustomException;
import com.bta.api.repository.PermissionRepository;

@Service
public class MenuImplService implements ImplService<Menu, MenuDto> {

	@Autowired
    MenuRepository menuRepository;

	@Autowired
	PermissionRepository permissionRepository;

	public List<Menu> getAll() {
        return new ArrayList<>(menuRepository.findAll());
	}

	public Menu getById(UUID id) {
        return menuRepository.findById(id)
				.orElseThrow(() -> new UserServiceCustomException("Menu with given Id not found", "MENU_NOT_FOUND"));
	}

	public Menu create(MenuDto dto) {
		if (menuRepository.findById(dto.getId()).isEmpty()) {
			return menuRepository.save(convertFromDtoToEntity(dto));
		}
		throw new UserServiceCustomException("Menu with given Id is already existed", "MENU_EXISTED");
	}

	public Menu update(MenuDto dto) {
		Menu foundMenu = menuRepository.findById(dto.getId())
				.orElseThrow(() -> new UserServiceCustomException("Menu with given Id not found", "MENU_NOT_FOUND"));
		if (foundMenu != null) {
			return menuRepository.save(convertFromDtoToEntity(dto));
		}
		return null;
	}

	public boolean delete(UUID rowId) {
		Menu foundMenu = menuRepository.findById(rowId)
				.orElseThrow(() -> new UserServiceCustomException("Menu with given Id not found", "MENU_NOT_FOUND"));
		if (foundMenu != null) {
			menuRepository.delete(foundMenu);
			return true;
		}
		return false;
	}

	@Override
	public Menu convertFromDtoToEntity(MenuDto dto) {
		Menu entity = new Menu();
		Optional<Menu> foundEntity = menuRepository.findById(dto.getId());
		if (foundEntity.isPresent()) {
			entity = foundEntity.get();
		} else {
			entity.setId(dto.getId());
		}
		entity.setCreatedDate(dto.getCreatedDate());
		entity.setCreatedBy(dto.getCreatedBy());
		entity.setLastModifiedDate(dto.getLastModifiedDate());
		entity.setLastModifiedBy(dto.getLastModifiedBy());

		entity.setDescription(dto.getDescription());
		entity.setMenuName(dto.getMenuName());
		List<Permission> permissionList = new ArrayList<Permission>();
		dto.getPermissions().forEach((UUID id) -> {
			Permission foundPermission = permissionRepository.findById(id).orElseThrow(
					() -> new UserServiceCustomException("Permission with given Id not found", "PERMISSION_NOT_FOUND"));
			permissionList.add(foundPermission);
		});
		entity.setPermission(permissionList);

		return entity;
	}
}
