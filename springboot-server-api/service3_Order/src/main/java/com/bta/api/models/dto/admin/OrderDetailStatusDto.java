package com.bta.api.models.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailStatusDto {

    private String statusCode;
    private String statusName;
    private String description;

}
