package com.bta.api.entity;

import com.bta.api.base.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Product extends BaseEntity {

	private String name;
	private long quantity;
	private long price;

	@ManyToOne
	@MapsId("id")
	@JoinColumn(name = "category", nullable = false)
	private Category category;

	@ManyToOne
	@MapsId("id")
	@JoinColumn(name = "brand", nullable = false)
	private Brand brand;

}
