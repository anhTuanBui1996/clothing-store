package com.bta.api.entities;

import com.bta.api.entities.composites.RoleMenuKey;
import com.bta.api.models.dto.admin.PermissionsDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Permissions {

    @EmbeddedId
    private RoleMenuKey id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("roleId")
    @JoinColumn(name = "role")
    private Roles role;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("menuId")
    @JoinColumn(name = "menu")
    private Menu menu;

    private boolean canView = false;
    private boolean canModified = false;

    public PermissionsDto toDto() {
        PermissionsDto dto = new PermissionsDto();
        dto.setRoleId(id.getRoleId());
        dto.setRoleCode(role.getRoleCode());
        dto.setRoleName(role.getRoleName());
        dto.setMenuId(id.getMenuId());
        dto.setMenuName(menu.getMenuName());
        dto.setCanView(canView);
        dto.setCanModified(canModified);
        return dto;
    }

}
