package com.bta.api.entities;

import com.bta.api.base.BaseEntity;
import com.bta.api.models.dto.admin.OrderDetailStatusDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailStatus extends BaseEntity<OrderDetailStatusDto> {

    private String statusCode;
    private String statusName;
    private String description;

    @Override
    public OrderDetailStatusDto toDto() {
        OrderDetailStatusDto dto = new OrderDetailStatusDto();
        dto.setStatusCode(statusCode);
        dto.setStatusName(statusName);
        dto.setDescription(description);
        return dto;
    }
}
