package com.bta.api.entity;

import java.util.List;

import com.bta.api.base.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Menu extends BaseEntity {

	private String menuName;
	private String description;

	@OneToMany(mappedBy = "menu", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private List<Permission> permission;

}
