package com.bta.api.entity.relationship;

import com.bta.api.entity.composites.RoleMenuKey;
import com.bta.api.entity.independent.Menu;
import com.bta.api.entity.independent.Roles;
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
