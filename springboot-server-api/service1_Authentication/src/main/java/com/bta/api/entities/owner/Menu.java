package com.bta.api.entities.owner;

import java.util.Set;

import com.bta.api.base.BaseEntity;
import com.bta.api.entities.dependencies.Permissions;
import com.bta.api.models.dto.MenuDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;
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

    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL, orphanRemoval = true)
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
