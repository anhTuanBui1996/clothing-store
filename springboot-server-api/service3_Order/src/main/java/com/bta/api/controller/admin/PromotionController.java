package com.bta.api.controller.admin;

import com.bta.api.models.dto.admin.PromotionDto;
import com.bta.api.service.PromotionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(path = "/admin/promotion")
public class PromotionController {

    @Autowired
    PromotionService promotionService;

    @GetMapping("/")
    public ResponseEntity<List<PromotionDto>> getAllPromotion() {
        return ResponseEntity.ok(promotionService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PromotionDto> getPromotionById(@PathVariable("id") UUID id) {
        try {
            return ResponseEntity.ok(promotionService.getById(id));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PromotionDto> savePromotion(@PathVariable("id") UUID id,
                                                      @RequestBody PromotionDto dto) {
        dto.setId(id);
        return ResponseEntity.ok(promotionService.save(dto));
    }

    @PutMapping("/")
    public ResponseEntity<List<PromotionDto>> saveCollection(@RequestBody List<PromotionDto> dtos) {
        return ResponseEntity.ok(promotionService.saveCollection(dtos));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePromotion(@PathVariable("id") UUID id) {
        if (promotionService.delete(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/")
    public ResponseEntity<List<UUID>> deleteCollection(@RequestBody Set<UUID> ids) {
        return ResponseEntity.ok(promotionService.deleteCollection(ids));
    }

}
