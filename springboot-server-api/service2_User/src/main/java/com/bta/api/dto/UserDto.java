package com.bta.api.dto;

import java.util.Date;
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
public class UserDto extends BaseDto {

	public boolean isAdmin;
	public String email;
	public String firstName;
	public String lastName;
	public boolean isMale;
	public Date dob;
	public String citizenId;

	public UUID roleId;

}
