package com.bta.api.controller.admin;

import com.bta.api.models.dto.base.CategoryDto;
import com.bta.api.service.data.CategoryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(path = "/admin/category")
public class CategoryController {
	
	@Autowired
    CategoryService categoryService;

	@GetMapping(path = "/{id}")
	public ResponseEntity<CategoryDto> getCategory(@PathVariable(name = "id") UUID id) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(categoryService.getById(id));
		} catch (EntityNotFoundException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@GetMapping(path = "/")
	public ResponseEntity<List<CategoryDto>> getAllCategory() {
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAll());
	}

	@PutMapping(path = "/{id}")
	public ResponseEntity<CategoryDto> saveCategory(@PathVariable(name = "id") UUID id, @RequestBody CategoryDto dto) {
		dto.setId(id);
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.save(dto));
	}

	@PutMapping(path = "/")
	public ResponseEntity<List<CategoryDto>> saveAllCategory(@RequestBody List<CategoryDto> dtos) {
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.saveCollection(dtos));
	}

	@DeleteMapping(path = "/{id}")
	public ResponseEntity<Boolean> deleteCategory(@PathVariable(name = "id") UUID id) {
		if (categoryService.delete(id)) {
			return ResponseEntity.status(HttpStatus.OK).build();
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@DeleteMapping(path = "/")
	public ResponseEntity<List<UUID>> deleteAllCategory(@RequestBody Set<UUID> ids) {
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.deleteCollection(ids));
	}
	
}
