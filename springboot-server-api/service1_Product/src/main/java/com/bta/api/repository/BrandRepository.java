package com.bta.api.repository;

import org.springframework.data.repository.CrudRepository;

import com.bta.api.entity.Brand;

import java.util.UUID;

public interface BrandRepository extends CrudRepository<Brand, UUID> {

}
