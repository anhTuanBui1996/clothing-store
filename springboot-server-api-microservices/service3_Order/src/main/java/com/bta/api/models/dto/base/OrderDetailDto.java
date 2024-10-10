package com.bta.api.models.dto.base;

import com.bta.api.entities.enums.OrderDetailStatus;
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
    private OrderDetailStatus status;

}
