package com.bta.api.service;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.owner.Menu;
import com.bta.api.models.dto.MenuDto;
import com.bta.api.repository.MenuRepository;
import com.bta.api.repository.PermissionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class MenuService implements CRUDService<Menu, MenuDto> {

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    PermissionRepository permissionRepository;

    @Override
    public Menu applyChangesFromDto(MenuDto dto) {
        Optional<Menu> foundMenu = menuRepository.findById(dto.getId());
        Menu menu = foundMenu.orElseGet(Menu::new);
        menu.setMenuCode(dto.getMenuCode());
        menu.setMenuName(dto.getMenuName());
        menu.setDescription(dto.getDescription());
        return menu;
    }

	@Override
    public List<MenuDto> getAll() {
        List<MenuDto> menuDtos = new ArrayList<>();
        menuRepository.findAll().forEach(menu -> menuDtos.add(menu.toDto()));
        return menuDtos;
    }

	@Override
    public MenuDto getById(UUID id) {
        return menuRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Menu not found: id=" + id))
                .toDto();
    }

    @Override
    public MenuDto save(MenuDto dto) {
        return menuRepository.save(applyChangesFromDto(dto)).toDto();
    }

    @Override
    public List<MenuDto> saveCollection(List<MenuDto> dtos) {
        List<Menu> menus = new ArrayList<>();
        dtos.forEach((MenuDto dto) -> {
            menus.add(applyChangesFromDto(dto));
        });
        List<MenuDto> menuDtos = new ArrayList<>();
		menuRepository.saveAll(menus).forEach(menu -> menuDtos.add(menu.toDto()));
        return menuDtos;
    }

	@Override
    public boolean delete(UUID id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Menu not found: id=" + id));
        if (menu != null) {
            menuRepository.delete(menu);
            return true;
        }
        return false;
    }

    @Override
    public List<UUID> deleteCollection(Set<UUID> ids) {
		List<UUID> result = new ArrayList<>(ids);
        result.forEach((UUID id) -> {
            if (!menuRepository.existsById(id)) {
				result.remove(id);
            }
        });
        menuRepository.deleteAllById(ids);
        return result;
    }

}
