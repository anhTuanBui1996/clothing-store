package com.bta.api.entities;

import com.bta.api.entities.composites.RoleMenuKey;
import com.bta.api.models.dto.base.PermissionsDto;
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
    @JoinColumn(name = "roles")
    private Roles roles;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("menuId")
    @JoinColumn(name = "menus")
    private Menu menus;

    private boolean canView = false;
    private boolean canModified = false;

    public PermissionsDto toDto() {
        PermissionsDto dto = new PermissionsDto();
        dto.setRoleId(id.getRoleId());
        dto.setRoleCode(roles.getRoleCode());
        dto.setRoleName(roles.getRoleName());
        dto.setMenuId(id.getMenuId());
        dto.setMenuName(menus.getMenuName());
        dto.setCanView(canView);
        dto.setCanModified(canModified);
        return dto;
    }

}
