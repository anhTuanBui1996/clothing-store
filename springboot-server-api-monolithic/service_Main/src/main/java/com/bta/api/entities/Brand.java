package com.bta.api.entities;

import java.util.Set;
import java.util.stream.Collectors;

import com.bta.api.base.BaseEntity;
import com.bta.api.models.dto.base.BrandDto;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
public class Brand extends BaseEntity<BrandDto> {

	private String brandName;
	private String nation;

	@OneToMany(mappedBy = "brand", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<Product> products;

	@Override
	public BrandDto toDto() {
		BrandDto dto = new BrandDto();
		dto.setId(id);
		dto.setBrandName(brandName);
		dto.setNation(nation);
		dto.setProducts(products.stream().map(BaseEntity::getId).collect(Collectors.toList()));
		return dto;
	}
}
