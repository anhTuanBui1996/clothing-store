package com.bta.api.dto;

import java.util.UUID;

import com.bta.api.base.BaseDto;
import com.bta.api.base.BaseEntity;
import com.bta.api.entity.Permission;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermissionDto extends BaseDto {

	private RoleDto role;
	private MenuDto menu;

	private boolean canCreate;
	private boolean canRead;
	private boolean canUpdate;
	private boolean canDelete;

}
