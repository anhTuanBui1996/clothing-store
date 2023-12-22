package com.bta.api.service;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.Promotion;
import com.bta.api.models.dto.admin.PromotionDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class PromotionService implements CRUDService<Promotion, PromotionDto> {

    @Override
    public List<PromotionDto> getAll() {
        return null;
    }

    @Override
    public PromotionDto getById(UUID id) {
        return null;
    }

    @Override
    public PromotionDto save(PromotionDto dto) {
        return null;
    }

    @Override
    public List<PromotionDto> saveCollection(List<PromotionDto> dtos) {
        return null;
    }

    @Override
    public boolean delete(UUID id) {
        return false;
    }

    @Override
    public List<UUID> deleteCollection(Set<UUID> ids) {
        return null;
    }

    @Override
    public Promotion applyChangesFromDto(PromotionDto dto) {
        return null;
    }

}
