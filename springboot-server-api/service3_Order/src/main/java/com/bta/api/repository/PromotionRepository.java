package com.bta.api.repository;

import com.bta.api.entities.Promotion;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface PromotionRepository extends CrudRepository<Promotion, UUID> {
}
