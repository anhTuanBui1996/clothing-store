package com.bta.api.controller;

import java.util.List;

import com.bta.api.service.ProductService;
import com.bta.api.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
	@Autowired
    ProductService productService;

	@PostMapping("/product")
	public boolean insertNew(@RequestBody(required = true) Product product) {
		return productService.createProduct(product);
	}

	@PostMapping("/product/many")
	public boolean insertNewMany(@RequestBody(required = true) List<Product> products) {
		return productService.createProducts(products);
	}

	@GetMapping("/product")
	public List<Product> getAll() {
		return productService.getAllProduct();
	}

	@GetMapping("/product/{id}")
	public Product getProductById(@PathVariable("id") Long id) {
		return productService.getProductById(id);
	}

	@PutMapping("/product/{id}")
	public boolean updateExisting(@PathVariable("id") Long id, @RequestBody(required = true) Product product) {
		return productService.updateProduct(id, product);
	}

	@DeleteMapping("/product/{id}")
	public boolean deleteExisting(@PathVariable("id") Long id) {
		return productService.deleteProduct(id);
	}
}
