package com.bta.api.models;

import java.util.Set;

import com.bta.api.base.BaseDto;
import com.bta.api.entities.dependencies.Permissions;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuDto extends BaseDto {

	private String menuCode;
	private String menuName;
	private String description;

}
