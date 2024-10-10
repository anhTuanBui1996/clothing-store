package com.bta.api.entities;

import java.util.List;
import java.util.stream.Collectors;

import com.bta.api.base.BaseEntity;
import com.bta.api.models.CategoryDto;
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
public class Category extends BaseEntity<CategoryDto> {

	private String categoryName;

	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Product> products;

	@Override
	public CategoryDto toDto() {
		CategoryDto dto = new CategoryDto();
		dto.setCategoryName(categoryName);
		dto.setProducts(products.stream().map(BaseEntity::getId).collect(Collectors.toList()));
		return dto;
	}
}
