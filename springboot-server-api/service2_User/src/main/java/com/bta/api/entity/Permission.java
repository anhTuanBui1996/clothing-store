package com.bta.api.entity;

import com.bta.api.base.BaseEntity;

import com.bta.api.dto.PermissionDto;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Permission extends BaseEntity<Permission, PermissionDto> {

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("id")
	@JoinColumn(name = "role")
	Role role;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("id")
	@JoinColumn(name = "menu")
	Menu menu;

	private boolean canCreate = false;
	private boolean canRead = false;
	private boolean canUpdate = false;
	private boolean canDelete = false;

	@Override
	public Permission applyChanges(PermissionDto dto) {
		role = new Role().applyChanges(dto.getRole());
		menu = new Menu().applyChanges(dto.getMenu());
		canCreate = dto.isCanCreate();
		canRead = dto.isCanRead();
		canUpdate = dto.isCanUpdate();
		canDelete = dto.isCanDelete();
		return this;
	}

	@Override
	public PermissionDto toDto() {
		PermissionDto permissionDto = new PermissionDto();
		permissionDto.setId(id);
		permissionDto.setRole(role.toDto());
		permissionDto.setMenu(menu.toDto());
		permissionDto.setCanCreate(canCreate);
		permissionDto.setCanRead(canRead);
		permissionDto.setCanUpdate(canUpdate);
		permissionDto.setCanDelete(canDelete);
		return permissionDto;
	}
}
