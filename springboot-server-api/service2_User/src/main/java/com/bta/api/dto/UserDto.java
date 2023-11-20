package com.bta.api.dto;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

import com.bta.api.base.BaseDto;
import com.bta.api.entity.Role;
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
	private String citizenId;

	private Set<RoleDto> roles;

}
