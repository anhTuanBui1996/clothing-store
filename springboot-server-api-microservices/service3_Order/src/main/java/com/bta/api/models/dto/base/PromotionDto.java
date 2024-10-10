package com.bta.api.models.dto.base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromotionDto {

    private UUID id;
    private String name;
    private float reductionPercentage;
    private String description;
    private int expireTimeInMinute;

}
