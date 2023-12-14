package com.bta.api.models.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;
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

	private Set<UUID> roles;
	private String authorities;

	public String getPassword() {
		return null;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
