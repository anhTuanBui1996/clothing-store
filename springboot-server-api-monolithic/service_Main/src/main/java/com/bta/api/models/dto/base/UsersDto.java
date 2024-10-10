package com.bta.api.models.dto.base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersDto {

	private UUID id;

	private String username;
	private String password;
	private boolean isAdmin;

	private String email;
	private String firstName;
	private String lastName;
	private boolean isMale;
	private Date dob;
	private String citizenId;
	private String phoneNumber;
	private String avatar;

	private List<UUID> roles;
	private String authorities;

	private boolean accountNonExpired;
	private boolean accountNonLocked;
	private boolean credentialsNonExpired;
	private boolean enabled;

}
