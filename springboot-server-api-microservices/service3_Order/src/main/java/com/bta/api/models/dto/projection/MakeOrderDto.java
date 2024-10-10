package com.bta.api.models.dto.projection;

import com.bta.api.models.dto.base.OrderDetailDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MakeOrderDto {

    private UUID id;

    private UUID userMakeId;
    private Date orderDate;
    private Date predictCompletedDate;
    private String fromAddress;
    private String toAddress;
    private long totalShipmentPrice;

    private List<OrderDetailDto> details;
    private UUID promotionId;

}
