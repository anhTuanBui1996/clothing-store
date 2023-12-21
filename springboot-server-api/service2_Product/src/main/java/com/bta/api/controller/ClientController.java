package com.bta.api.controller;

import com.bta.api.models.dto.admin.BrandDto;
import com.bta.api.models.dto.admin.CategoryDto;
import com.bta.api.models.dto.admin.ProductDto;
import com.bta.api.service.BrandService;
import com.bta.api.service.CategoryService;
import com.bta.api.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/product")
public class ClientController {

    @Autowired
    BrandService brandService;

    @Autowired
    CategoryService categoryService;

    @Autowired
    ProductService productService;

    @GetMapping(path = "/brand/{id}")
    public ResponseEntity<BrandDto> getBrand(@PathVariable(name = "id") UUID id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(brandService.getById(id));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping(path = "/brand")
    public ResponseEntity<List<BrandDto>> getAllBrand() {
        return ResponseEntity.status(HttpStatus.OK).body(brandService.getAll());
    }

    @GetMapping(path = "/category/{id}")
    public ResponseEntity<CategoryDto> getCategory(@PathVariable(name = "id") UUID id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(categoryService.getById(id));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping(path = "/category")
    public ResponseEntity<List<CategoryDto>> getAllCategory() {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAll());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable(name = "id") UUID id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(productService.getById(id));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<ProductDto>> getAllProduct(@RequestParam UUID brandId, @RequestParam UUID categoryId) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAll());
    }

}
