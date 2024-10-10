package com.bta.api.service.data;

import java.util.*;
import java.util.stream.Collectors;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.Category;
import com.bta.api.models.dto.base.CategoryDto;
import com.bta.api.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bta.api.repository.CategoryRepository;

@Service
public class CategoryService implements CRUDService<Category, CategoryDto> {

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	ProductRepository productRepository;

	@Override
	public List<CategoryDto> getAll() {
		List<CategoryDto> categoryDtos = new ArrayList<>();
		categoryRepository.findAll().forEach(category -> categoryDtos.add(category.toDto()));
		return categoryDtos;
	}

	@Override
	public CategoryDto getById(UUID id) {
		return categoryRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Category not found: id=" + id))
				.toDto();
	}

	@Override
	public CategoryDto save(CategoryDto dto) {
		return categoryRepository.save(applyChangesFromDto(dto)).toDto();
	}

	@Override
	public List<CategoryDto> saveCollection(List<CategoryDto> dtos) {
		List<Category> categories = new ArrayList<>();
		dtos.forEach(categoryDto -> categories.add(applyChangesFromDto(categoryDto)));
		List<CategoryDto> categoryDtos = new ArrayList<>();
		categories.forEach(category -> categoryDtos.add(category.toDto()));
		return categoryDtos;
	}

	@Override
	public boolean delete(UUID id) {
		if (!categoryRepository.existsById(id)) {
			throw new EntityNotFoundException("Category not found: id=" + id);
		}
		categoryRepository.deleteById(id);
		return true;
	}

	@Override
	public List<UUID> deleteCollection(Set<UUID> ids) {
		List<UUID> result = new ArrayList<>(ids);
		result.forEach(uuid -> {
			if (!categoryRepository.existsById(uuid)) {
				result.remove(uuid);
			}
		});
		categoryRepository.deleteAllById(ids);
		return result;
	}

	@Override
	public Category applyChangesFromDto(CategoryDto dto) {
		Optional<Category> foundCategory = categoryRepository.findById(dto.getId());
		Category category = foundCategory.orElseGet(Category::new);
		category.setCategoryName(dto.getCategoryName());
		category.setProducts(dto.getProducts().stream().map(uuid -> productRepository.findById(uuid)
				.orElseThrow(() -> new EntityNotFoundException("Category not found: id=" + uuid)))
				.collect(Collectors.toList()));
		return category;
	}
}
