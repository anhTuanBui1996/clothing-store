package com.bta.api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BrandDto {

    private UUID id;

    private String brandName;
    private String nation;

    private List<UUID> products;

}
