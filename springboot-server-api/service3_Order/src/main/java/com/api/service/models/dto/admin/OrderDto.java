package com.api.service.models.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {

    private UUID id;

    private UUID userMake;
    private Date orderDate;
    private Date completedDate;
    private Date predictCompletedDate;
    private String fromAddress;
    private String toAddress;
    private long totalProductPrice;
    private long totalShipmentPrice;

}
