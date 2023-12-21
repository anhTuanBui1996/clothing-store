package com.bta.api.service;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.Brand;
import com.bta.api.entities.Category;
import com.bta.api.entities.Product;
import com.bta.api.models.dto.admin.ProductDto;
import com.bta.api.repository.BrandRepository;
import com.bta.api.repository.CategoryRepository;
import com.bta.api.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService implements CRUDService<Product, ProductDto> {

	@Autowired
	ProductRepository productRepository;

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	BrandRepository brandRepository;

	@Override
	public List<ProductDto> getAll() {
		List<ProductDto> productDtos = new ArrayList<>();
		productRepository.findAll().forEach(product -> productDtos.add(product.toDto()));
		return productDtos;
	}

	@Override
	public ProductDto getById(UUID id) {
		return productRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Product not found: id=" + id))
				.toDto();
	}

	@Override
	public ProductDto save(ProductDto dto) {
		return productRepository.save(applyChangesFromDto(dto)).toDto();
	}

	@Override
	public List<ProductDto> saveCollection(List<ProductDto> dtos) {
		List<Product> products = new ArrayList<>();
		dtos.forEach(productDto -> products.add(applyChangesFromDto(productDto)));
		List<ProductDto> productDtos = new ArrayList<>();
		productRepository.saveAll(products).forEach(product -> productDtos.add(product.toDto()));
		return productDtos;
	}

	@Override
	public boolean delete(UUID id) {
		if (!productRepository.existsById(id)) {
			throw new EntityNotFoundException("Product not found: id=" + id);
		}
		productRepository.deleteById(id);
		return true;
	}

	@Override
	public List<UUID> deleteCollection(Set<UUID> ids) {
		List<UUID> result = new ArrayList<>(ids);
		result.forEach(uuid -> {
			if (!productRepository.existsById(uuid)) {
				result.remove(uuid);
			}
		});
		productRepository.deleteAllById(ids);
		return result;
	}

	@Override
	public Product applyChangesFromDto(ProductDto dto) {
		Optional<Product> foundProduct = productRepository.findById(dto.getId());
		Product product = foundProduct.orElseGet(Product::new);
		product.setName(dto.getName());
		product.setQuantity(dto.getQuantity());
		product.setPrice(dto.getPrice());
		product.setCategory(categoryRepository.findById(dto.getCategory())
				.orElseThrow(() -> new EntityNotFoundException("Category not found: id=" + dto.getCategory())));
		product.setBrand(brandRepository.findById(dto.getBrand())
				.orElseThrow(() -> new EntityNotFoundException("Brand not found: id=" + dto.getBrand())));
		return product;
	}

	public List<ProductDto> getAllByBrandAndCategory(UUID brandId, UUID categoryId) {
		Brand brand = brandRepository.findById(brandId)
				.orElseThrow(() -> new EntityNotFoundException("Brand not found: id=" + brandId));
		Category category  =  categoryRepository.findById(categoryId)
				.orElseThrow(() -> new EntityNotFoundException("Category not found id=" + categoryId));
		return productRepository.findByBrandAndCategory(brand, category)
				.stream().map(Product::toDto)
				.collect(Collectors.toList());
	}

}
