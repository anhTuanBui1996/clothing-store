package com.bta.api.entity.dto;

import java.util.Date;
import java.util.Set;

import com.bta.api.base.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto extends BaseDto {

	private String email;
	private String firstName;
	private String lastName;
	private boolean isMale;
	private Date dob;

	private Set<RoleDto> roles;

}
