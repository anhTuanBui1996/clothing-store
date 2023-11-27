package com.bta.api.repository;

import org.springframework.data.repository.CrudRepository;

import com.bta.api.entities.Brand;

import java.util.UUID;

public interface BrandRepository extends CrudRepository<Brand, UUID> {

}
