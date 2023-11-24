package com.bta.api.models;

import com.bta.api.base.BaseDto;
import com.bta.api.entities.dependencies.Permissions;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RolesDto extends BaseDto {

    private String roleName;
    private String description;

}
