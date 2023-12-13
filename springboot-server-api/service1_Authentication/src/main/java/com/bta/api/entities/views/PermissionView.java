package com.bta.api.entities.views;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PermissionView {

    private UUID role;
    private String roleName;
    private UUID menu;
    private String menuName;
    private boolean canModified;
    private boolean canView;

}
