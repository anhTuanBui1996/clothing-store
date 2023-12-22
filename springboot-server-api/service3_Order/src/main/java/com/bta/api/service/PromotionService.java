package com.bta.api.service;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.Promotion;
import com.bta.api.models.dto.admin.PromotionDto;
import com.bta.api.repository.PromotionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PromotionService implements CRUDService<Promotion, PromotionDto> {

    @Autowired
    PromotionRepository promotionRepository;

    @Override
    public List<PromotionDto> getAll() {
        List<PromotionDto> promotionDtos = new ArrayList<>();
        promotionRepository.findAll().forEach(promotion -> promotionDtos.add(promotion.toDto()));
        return promotionDtos;
    }

    @Override
    public PromotionDto getById(UUID id) throws EntityNotFoundException {
        return promotionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Promotion not found: id=" + id))
                .toDto();
    }

    @Override
    public PromotionDto save(PromotionDto dto) {
        return promotionRepository.save(applyChangesFromDto(dto)).toDto();
    }

    @Override
    public List<PromotionDto> saveCollection(List<PromotionDto> dtos) {
        List<Promotion> promotions = new ArrayList<>();
        dtos.forEach((PromotionDto dto) -> {
            promotions.add(applyChangesFromDto(dto));
        });
        List<PromotionDto> promotionDtos = new ArrayList<>();
        promotionRepository.saveAll(promotions)
                .forEach(promotion -> promotionDtos.add(promotion.toDto()));
        return promotionDtos;
    }

    @Override
    public boolean delete(UUID id) {
        if (!promotionRepository.existsById(id)) {
            throw new EntityNotFoundException("Promotion not found: id=" + id);
        }
        promotionRepository.deleteById(id);
        return true;
    }

    @Override
    public List<UUID> deleteCollection(Set<UUID> ids) {
        List<UUID> result = new ArrayList<>(ids);
        result.forEach((UUID id) -> {
            if (!promotionRepository.existsById(id)) {
                result.remove(id);
            }
        });
        promotionRepository.deleteAllById(ids);
        return result;
    }

    @Override
    public Promotion applyChangesFromDto(PromotionDto dto) {
        Optional<Promotion> foundPromotion = promotionRepository.findById(dto.getId());
        Promotion promotion = foundPromotion.orElseGet(Promotion::new);
        promotion.setName(dto.getName());
        promotion.setDescription(dto.getDescription());
        promotion.setExpireTimeInMinute(dto.getExpireTimeInMinute());
        promotion.setReductionPercentage(dto.getReductionPercentage());
        return promotion;
    }

}
