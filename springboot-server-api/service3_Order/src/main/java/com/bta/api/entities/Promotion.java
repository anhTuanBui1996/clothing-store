package com.bta.api.entities;

import com.bta.api.base.BaseEntity;
import com.bta.api.models.dto.admin.PromotionDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Promotion extends BaseEntity<PromotionDto> {

    private String name;
    private float reductionPercentage;
    private String description;
    private int expireTimeInMinute;

    @Override
    public PromotionDto toDto() {
        PromotionDto dto = new PromotionDto();
        dto.setId(id);
        dto.setName(name);
        dto.setReductionPercentage(reductionPercentage);
        dto.setDescription(description);
        dto.setExpireTimeInMinute(expireTimeInMinute);
        return dto;
    }
}
