package com.bta.api.dto;

import java.util.UUID;

import com.bta.api.base.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class PermissionDto extends BaseDto {

	private UUID role;
	private UUID menu;

	private boolean canCreate;
	private boolean canRead;
	private boolean canUpdate;
	private boolean canDelete;

}
