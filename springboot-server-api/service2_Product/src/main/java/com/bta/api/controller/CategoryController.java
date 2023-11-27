package com.bta.api.controller;

import java.util.List;

import com.bta.api.service.CategoryService;
import com.bta.api.entities.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {
	@Autowired
    CategoryService categoryService;

	@PostMapping("/category")
	public boolean insertNew(Category category) {
		return categoryService.createCategory(category);
	}

	@GetMapping("/category")
	public List<Category> getAll() {
		return categoryService.getAllCategory();
	}

	@GetMapping("/category/{id}")
	public Category getCategoryById(@PathVariable("id") Long id) {
		return categoryService.getCategoryById(id);
	}

	@PutMapping("/category/{id}")
	public boolean updateExisting(@PathVariable("id") Long id, @RequestBody(required = true) Category category) {
		return categoryService.updateCategory(id, category);
	}

	@DeleteMapping("/category/{id}")
	public boolean deleteExisting(@PathVariable("id") Long id) {
		return categoryService.deleteCategory(id);
	}
}
