package com.bta.api.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bta.api.entity.Product;
import com.bta.api.exception.ProductServiceCustomException;
import com.bta.api.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	ProductRepository productRepository;

	public boolean createProduct(Product product) {
		if (product.getProductId() != null || product == null) {
			return false;
		}
		productRepository.save(product);
		return true;
	}

	public boolean createProducts(List<Product> products) {
		if (products.contains(null) || products == null) {
			return false;
		}
		productRepository.saveAll(products);
		return true;
	}

	public List<Product> getAllProduct() {
		List<Product> products = new ArrayList<>();
		productRepository.findAll().forEach(product -> products.add(product));
		return products;
	}

	public Product getProductById(Long id) {
		if (id == null) {
			return null;
		}
		Product res = productRepository.findById(id).orElseThrow(
				() -> new ProductServiceCustomException("Product with given Id not found", "PRODUCT_NOT_FOUND"));
		return res;
	}

	public List<Product> getAllProductByBrandAndCategory(Long brandId, Long categoryId) {
		List<Product> products = new ArrayList<>();
		productRepository.findByBrandAndCategory(brandId, categoryId).forEach(product -> products.add(product));
		return products;
	}

	public boolean updateProduct(Long id, Product product) {
		if (!productRepository.existsById(id) || id == null || product == null) {
			return false;
		}
		productRepository.save(product);
		return true;
	}

	public boolean deleteProduct(Long id) {
		if (!productRepository.existsById(id) || id == null) {
			return false;
		}
		productRepository.deleteById(id);
		return true;
	}

	public void reduceQuantity(Long id, long quantity) {
		Product product = productRepository.findById(id).orElseThrow(
				() -> new ProductServiceCustomException("Product with given Id not found", "PRODUCT_NOT_FOUND"));
		if (product != null) {
			Product foundProduct = product;
			long currentQuantity = foundProduct.getQuantity();
			if (currentQuantity >= quantity) {
				foundProduct.setQuantity(currentQuantity - quantity);
				productRepository.save(foundProduct);
			} else {
				throw new ProductServiceCustomException("Product does not have sufficient Quantity",
						"INSUFFICIENT_QUANTITY");
			}
		}
	}
}
