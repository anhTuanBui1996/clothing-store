package com.bta.api.models.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RolesDto {

    private UUID id;

    private String roleCode;
    private String roleName;
    private String description;

    private List<PermissionsDto> permissions;

}
