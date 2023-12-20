package com.api.service.models.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDto {

    private UUID orderId;
    private UUID productId;
    private String productName;

    private int quantity;
    private String description;
    private String statusName;

}
