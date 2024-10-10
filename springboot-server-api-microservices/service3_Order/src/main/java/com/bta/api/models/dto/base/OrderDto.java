package com.bta.api.models.dto.base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {

    private UUID id;

    private UUID userMadeId;
    private String userMadeFullName;
    private Date orderDate;

    private List<OrderDetailDto> details;

    private Date completedDate;
    private Date predictCompletedDate;
    private String fromAddress;
    private String toAddress;
    private long totalProductPrice;
    private long totalShipmentPrice;
    private UUID promotionId;

}
