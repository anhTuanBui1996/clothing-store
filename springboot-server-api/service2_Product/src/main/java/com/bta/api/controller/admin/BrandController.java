package com.bta.api.controller.admin;

import com.bta.api.models.dto.admin.BrandDto;
import com.bta.api.service.BrandService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(path = "/admin/brand")
public class BrandController {

	@Autowired
    BrandService brandService;

	@GetMapping(path = "/{id}")
	public ResponseEntity<BrandDto> getBrand(@PathVariable(name = "id") UUID id) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(brandService.getById(id));
		} catch (EntityNotFoundException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@GetMapping(path = "/")
	public ResponseEntity<List<BrandDto>> getAllBrand() {
		return ResponseEntity.status(HttpStatus.OK).body(brandService.getAll());
	}

	@PutMapping(path = "/{id}")
	public ResponseEntity<BrandDto> saveBrand(@PathVariable(name = "id") UUID id, @RequestBody BrandDto dto) {
		dto.setId(id);
		return ResponseEntity.status(HttpStatus.OK).body(brandService.save(dto));
	}

	@PutMapping(path = "/")
	public ResponseEntity<List<BrandDto>> saveAllBrand(@RequestBody List<BrandDto> dtos) {
		return ResponseEntity.status(HttpStatus.OK).body(brandService.saveCollection(dtos));
	}

	@DeleteMapping(path = "/{id}")
	public ResponseEntity<Boolean> deleteBrand(@PathVariable(name = "id") UUID id) {
		if (brandService.delete(id)) {
			return ResponseEntity.status(HttpStatus.OK).build();
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}

	@DeleteMapping(path = "/")
	public ResponseEntity<List<UUID>> deleteAllBrand(@RequestBody Set<UUID> ids) {
		return ResponseEntity.status(HttpStatus.OK).body(brandService.deleteCollection(ids));
	}

}
