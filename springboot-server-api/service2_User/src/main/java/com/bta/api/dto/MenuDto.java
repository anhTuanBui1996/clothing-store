package com.bta.api.dto;

import java.util.List;
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
public class MenuDto extends BaseDto {

	private String menuName;
	private String description;
	private List<UUID> permissions;

}
