package com.bta.api.entities.owner;

import java.util.Set;

import com.bta.api.base.BaseEntity;
import com.bta.api.entities.dependencies.Permissions;
import com.bta.api.entities.dto.MenuDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Menu extends BaseEntity<MenuDto> {

    @NaturalId
    private String menuCode;
    private String menuName;
    private String description;

    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Permissions> permissions;

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
