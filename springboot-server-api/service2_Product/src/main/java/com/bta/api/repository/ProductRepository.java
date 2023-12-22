package com.bta.api.repository;

import java.util.List;
import java.util.UUID;

import com.bta.api.entities.Brand;
import com.bta.api.entities.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bta.api.entities.Product;

public interface ProductRepository extends CrudRepository<Product, UUID> {

	public List<Product> findByBrandAndCategory(Brand brand, Category category);

	public List<Product> findByBrand(Brand brand);

	public List<Product> findByCategory(Category category);

}
