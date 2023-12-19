package com.bta.api.entities;

import com.bta.api.base.BaseEntity;
import com.bta.api.models.dto.admin.ProductDto;
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
public class Product extends BaseEntity<ProductDto> {

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

	@Override
	public ProductDto toDto() {
		ProductDto dto = new ProductDto();
		dto.setId(id);
		dto.setName(name);
		dto.setQuantity(quantity);
		dto.setPrice(price);
		dto.setCategory(category.getId());
		dto.setBrand(brand.getId());
		return null;
	}
}
