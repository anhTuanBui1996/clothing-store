package com.bta.api.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RolesDto {

    private UUID id;

    private String roleCode;
    private String roleName;
    private String description;

}
