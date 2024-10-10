package com.bta.api.models.dto.base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private UUID id;

    private String name;
    private long quantity;
    private long price;

    private UUID category;
    private UUID brand;

}
