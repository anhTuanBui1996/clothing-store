package com.bta.api.models.dto.client;

import com.bta.api.models.dto.admin.OrderDetailDto;
import com.bta.api.models.dto.admin.PromotionDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderInfoDto {

    private UUID id;

    private String userMakeFullName;
    private Date orderDate;
    private Date completedDate;
    private Date predictCompletedDate;
    private String fromAddress;
    private String toAddress;
    private long totalProductPrice;
    private long totalShipmentPrice;

    private List<OrderDetailDto> details;
    private PromotionDto promotion;

}
