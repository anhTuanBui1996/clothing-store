package com.bta.api.controller.admin;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.bta.api.models.dto.admin.ProductDto;
import com.bta.api.service.ProductService;
import com.bta.api.entities.Product;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/admin/product")
public class ProductController {
	
	@Autowired
    ProductService productService;

	@GetMapping(path = "/{id}")
	public ResponseEntity<ProductDto> getProduct(@PathVariable(name = "id") UUID id) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(productService.getById(id));
		} catch (EntityNotFoundException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@GetMapping(path = "/")
	public ResponseEntity<List<ProductDto>> getAllProduct() {
		return ResponseEntity.status(HttpStatus.OK).body(productService.getAll());
	}

	@PutMapping(path = "/{id}")
	public ResponseEntity<ProductDto> saveProduct(@PathVariable(name = "id") UUID id, @RequestBody ProductDto dto) {
		dto.setId(id);
		return ResponseEntity.status(HttpStatus.OK).body(productService.save(dto));
	}

	@PutMapping(path = "/")
	public ResponseEntity<List<ProductDto>> saveAllProduct(@RequestBody List<ProductDto> dtos) {
		return ResponseEntity.status(HttpStatus.OK).body(productService.saveCollection(dtos));
	}

	@DeleteMapping(path = "/{id}")
	public ResponseEntity<Boolean> deleteProduct(@PathVariable(name = "id") UUID id) {
		if (productService.delete(id)) {
			return ResponseEntity.status(HttpStatus.OK).build();
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@DeleteMapping(path = "/")
	public ResponseEntity<List<UUID>> deleteAllProduct(@RequestBody Set<UUID> ids) {
		return ResponseEntity.status(HttpStatus.OK).body(productService.deleteCollection(ids));
	}
	
}
