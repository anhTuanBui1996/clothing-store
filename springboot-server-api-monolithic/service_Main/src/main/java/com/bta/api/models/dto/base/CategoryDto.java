package com.bta.api.models.dto.base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {

    private UUID id;

    private String categoryName;

    private List<UUID> products;

}
