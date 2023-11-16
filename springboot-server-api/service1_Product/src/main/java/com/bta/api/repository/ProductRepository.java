package com.bta.api.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bta.api.entity.Product;

public interface ProductRepository extends CrudRepository<Product, UUID> {

	@Query(value = "SELECT p.* FROM Product p WHERE p.brand=?1 AND p.category=?2", nativeQuery = true)
	public List<Product> findByBrandIdAndCategoryId(Long brandId, Long categoryId);
}
