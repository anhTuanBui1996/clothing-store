package com.bta.api.entity;

import java.util.HashSet;
import java.util.Set;

import com.bta.api.base.BaseEntity;
import com.bta.api.dto.MenuDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Menu extends BaseEntity<Menu, MenuDto> {

    private String menuCode;
    private String menuName;
    private String description;

    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Permission> permissions;

    @Override
    public Menu applyChanges(MenuDto dto) {
        menuCode = dto.getMenuCode();
        menuName = dto.getMenuName();
        permissions = dto.getPermissions();
        return this;
    }

    @Override
    public MenuDto toDto() {
		MenuDto menuDto = new MenuDto();
		menuDto.setId(id);
		menuDto.setMenuCode(menuCode);
		menuDto.setMenuName(menuName);
		menuDto.setDescription(description);
		menuDto.setPermissions(permissions);
        return menuDto;
    }
}
