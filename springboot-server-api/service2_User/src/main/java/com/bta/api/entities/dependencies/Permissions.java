package com.bta.api.entities.dependencies;

import com.bta.api.entities.composites.RoleMenuKey;
import com.bta.api.entities.owner.Menu;
import com.bta.api.entities.owner.Roles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Permission {

    @EmbeddedId
    private RoleMenuKey id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("roleId")
    @JoinColumn(name = "role")
    private Roles roles;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("menuId")
    @JoinColumn(name = "menu")
    private Menu menu;

    private boolean canCreate = false;
    private boolean canRead = false;
    private boolean canUpdate = false;
    private boolean canDelete = false;

}
