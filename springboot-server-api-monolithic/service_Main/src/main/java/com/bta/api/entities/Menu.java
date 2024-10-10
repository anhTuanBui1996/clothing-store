package com.bta.api.entities;

import java.util.Set;

import com.bta.api.base.BaseEntity;
import com.bta.api.models.dto.base.MenuDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Menu extends BaseEntity<MenuDto> {

    private String menuName;
    private String description;

    @OneToMany(mappedBy = "menus", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Permissions> permissions;

    @Override
    public MenuDto toDto() {
		MenuDto menuDto = new MenuDto();
		menuDto.setId(id);
		menuDto.setMenuName(menuName);
		menuDto.setDescription(description);
        return menuDto;
    }
}
