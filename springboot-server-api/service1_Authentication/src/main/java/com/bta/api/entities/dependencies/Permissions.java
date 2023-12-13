package com.bta.api.entities.dependencies;

import com.bta.api.entities.composites.RoleMenuKey;
import com.bta.api.entities.owner.Menu;
import com.bta.api.entities.owner.Roles;
import com.bta.api.models.dto.PermissionsDto;
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
        return new PermissionsDto(id.getRoleId(), id.getMenuId(), canModified, canView);
    }

}
