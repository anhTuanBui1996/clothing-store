package com.bta.api.service.data;

import java.util.*;
import java.util.stream.Collectors;

import com.bta.api.base.CRUDService;
import com.bta.api.models.dto.base.BrandDto;
import com.bta.api.repository.BrandRepository;
import com.bta.api.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bta.api.entities.Brand;

@Service
public class BrandService implements CRUDService<Brand, BrandDto> {

	@Autowired
    BrandRepository brandRepository;

    @Autowired
    ProductRepository productRepository;

    @Override
    public List<BrandDto> getAll() {
        List<BrandDto> brandDtos = new ArrayList<>();
        brandRepository.findAll().forEach(brand -> brandDtos.add(brand.toDto()));
        return brandDtos;
    }

    @Override
    public BrandDto getById(UUID id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Brand not found: id=" + id))
                .toDto();
    }

    @Override
    public BrandDto save(BrandDto dto) {
        return brandRepository.save(applyChangesFromDto(dto)).toDto();
    }

    @Override
    public List<BrandDto> saveCollection(List<BrandDto> dtos) {
        List<Brand> brands = new ArrayList<>();
        dtos.forEach(brandDto -> brands.add(applyChangesFromDto(brandDto)));
        List<BrandDto> brandDtos = new ArrayList<>();
        brandRepository.saveAll(brands).forEach(brand -> brandDtos.add(brand.toDto()));
        return brandDtos;
    }

    @Override
    public boolean delete(UUID id) {
        if (!brandRepository.existsById(id)) {
            throw new EntityNotFoundException("Brand not found: id=" + id);
        }
        brandRepository.deleteById(id);
        return true;
    }

    @Override
    public List<UUID> deleteCollection(Set<UUID> ids) {
        List<UUID> result = new ArrayList<>(ids);
        result.forEach(uuid -> {
            if (!brandRepository.existsById(uuid)) {
                result.remove(uuid);
            }
        });
        brandRepository.deleteAllById(ids);
        return result;
    }

    @Override
    public Brand applyChangesFromDto(BrandDto dto) {
        Optional<Brand> foundBrand = brandRepository.findById(dto.getId());
        Brand brand = foundBrand.orElseGet(Brand::new);
        brand.setBrandName(dto.getBrandName());
        brand.setNation(dto.getNation());
        brand.setProducts(dto.getProducts().stream().map(uuid -> productRepository.findById(uuid)
                .orElseThrow(() -> new EntityNotFoundException("Product not found: id=" + uuid)))
                .collect(Collectors.toSet()));
        return brand;
    }
}
