package com.bta.api.dto;

import com.bta.api.base.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto extends BaseDto {

	private String roleName;
	private String description;
	private List<UUID> permissions;

}
