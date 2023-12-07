package com.bta.api.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PermissionsDto {

    private UUID roleId;
    private UUID menuId;
    private boolean canModified;
    private boolean canView;

}
