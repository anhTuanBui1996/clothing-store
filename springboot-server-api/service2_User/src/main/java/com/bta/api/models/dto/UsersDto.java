package com.bta.api.models.dto;

import java.util.Date;

import com.bta.api.base.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersDto extends BaseDto {

	private String email;
	private String firstName;
	private String lastName;
	private boolean isMale;
	private Date dob;

	private String authorities;

}
