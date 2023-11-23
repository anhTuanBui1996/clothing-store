package com.bta.api.service;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

import com.bta.api.base.CRUDService;
import com.bta.api.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bta.api.entity.dto.MenuDto;
import com.bta.api.entity.independent.Menu;
import com.bta.api.exception.UserServiceCustomException;
import com.bta.api.repository.PermissionRepository;

@Service
public class MenuCRUDService implements CRUDService<MenuDto> {

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    PermissionRepository permissionRepository;

	@Override
    public List<MenuDto> getAll() {
        List<MenuDto> menuDtos = new ArrayList<>();
        menuRepository.findAll().forEach(menu -> menuDtos.add(menu.toDto()));
        return menuDtos;
    }

	@Override
    public MenuDto getById(UUID id) {
        return menuRepository.findById(id)
                .orElseThrow(() -> new UserServiceCustomException("Menu with given Id not found", "MENU_NOT_FOUND")).toDto();
    }

    @Override
    public MenuDto save(MenuDto dto) {
        return menuRepository.save(new Menu().applyChanges(dto)).toDto();
    }

    @Override
    public List<MenuDto> saveCollection(List<MenuDto> dtos) {
        List<Menu> menus = new ArrayList<>();
        dtos.forEach((MenuDto dto) -> {
            menus.add(new Menu().applyChanges(dto));
        });
        List<MenuDto> menuDtos = new ArrayList<>();
		menuRepository.saveAll(menus).forEach(menu -> menuDtos.add(menu.toDto()));
        return menuDtos;
    }

	@Override
    public boolean delete(UUID rowId) {
        Menu menu = menuRepository.findById(rowId)
                .orElseThrow(() -> new UserServiceCustomException("Menu with given Id not found", "MENU_NOT_FOUND"));
        if (menu != null) {
            menuRepository.delete(menu);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteCollection(Set<UUID> ids) {
		AtomicBoolean result = new AtomicBoolean(true);
        ids.forEach((UUID id) -> {
            if (!menuRepository.existsById(id)) {
				result.set(false);
                throw new UserServiceCustomException("Menu with given Id not found", "MENU_NOT_FOUND");
            }
        });
        menuRepository.deleteAllById(ids);
        return result.get();
    }

}
