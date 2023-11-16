package com.bta.api.entity;

import java.util.Date;

import com.bta.api.base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

	private boolean isAdmin;
	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private boolean isMale;
	private Date dob;
	private String citizenId;

	@ManyToOne
	@JoinColumn(name = "role")
	private Role role;

}
