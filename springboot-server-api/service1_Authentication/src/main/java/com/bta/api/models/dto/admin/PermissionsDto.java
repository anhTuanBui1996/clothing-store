package com.bta.api.models.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PermissionsDto {

    private UUID id = UUID.randomUUID();
    private UUID roleId;
    private String roleCode;
    private String roleName;
    private UUID menuId;
    private String menuName;
    private boolean canModified;
    private boolean canView;

}
