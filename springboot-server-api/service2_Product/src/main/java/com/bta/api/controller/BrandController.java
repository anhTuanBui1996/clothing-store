package com.bta.api.controller;

import java.util.List;

import com.bta.api.service.BrandService;
import com.bta.api.entities.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BrandController {
	@Autowired
    BrandService brandService;

	@PostMapping("/brand")
	public Brand insertNew(Brand brand) {
		return brandService.createBrand(brand);
	}

	@GetMapping("/brand")
	public List<Brand> getAll() {
		return brandService.getAllBrand();
	}

	@GetMapping("/brand/{id}")
	public Brand getBrandById(@PathVariable("id") Long id) {
		return brandService.getBrandById(id);
	}

	@PutMapping("/brand/{id}")
	public boolean updateExisting(@PathVariable("id") Long id, @RequestBody(required = true) Brand brand) {
		return brandService.updateBrand(id, brand);
	}

	@DeleteMapping("/brand/{id}")
	public boolean deleteExisting(@PathVariable("id") Long id) {
		return brandService.deleteBrand(id);
	}
}
