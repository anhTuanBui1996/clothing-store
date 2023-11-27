package com.bta.api.service;

import java.util.List;
import java.util.Optional;

import com.bta.api.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bta.api.entities.Brand;

@Service
public class BrandService {
	@Autowired
    BrandRepository brandRepository;

	public Brand createBrand(Brand brand) {
		if (brand.getBrandId() != null || brand == null) {
			return false;
		}
		brandRepository.save(brand);
		return true;
	}

	public List<Brand> getAllBrand() {
		return brandRepository.findAll().;
	}

	public Brand getBrandById(Long id) {
		if (id == null) {
			return null;
		}
		Optional<Brand> res = brandRepository.findById(id);
		if (res.isEmpty()) {
			return null;
		}
		return res.get();
	}

	public boolean updateBrand(Long id, Brand brand) {
		if (!brandRepository.existsById(id) || id == null || brand == null) {
			return false;
		}
		brandRepository.save(brand);
		return true;
	}

	public boolean deleteBrand(Long id) {
		if (!brandRepository.existsById(id) || id == null) {
			return false;
		}
		brandRepository.deleteById(id);
		return true;
	}
}
