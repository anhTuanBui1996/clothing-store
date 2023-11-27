package com.bta.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.bta.api.entities.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bta.api.repository.CategoryRepository;

@Service
public class CategoryService {
	@Autowired
	CategoryRepository categoryRepository;

	public boolean createCategory(Category category) {
		if (category.getCategoryId() != null || category == null) {
			return false;
		}
		categoryRepository.save(category);
		return true;
	}

	public List<Category> getAllCategory() {
		List<Category> categorys = new ArrayList<>();
		categoryRepository.findAll().forEach(category -> categorys.add(category));
		return categorys;
	}

	public Category getCategoryById(Long id) {
		if (id == null) {
			return null;
		}
		Optional<Category> res = categoryRepository.findById(id);
		if (res.isEmpty()) {
			return null;
		}
		return res.get();
	}

	public boolean updateCategory(Long id, Category category) {
		if (!categoryRepository.existsById(id) || id == null || category == null) {
			return false;
		}
		categoryRepository.save(category);
		return true;
	}

	public boolean deleteCategory(Long id) {
		if (!categoryRepository.existsById(id) || id == null) {
			return false;
		}
		categoryRepository.deleteById(id);
		return true;
	}
}
