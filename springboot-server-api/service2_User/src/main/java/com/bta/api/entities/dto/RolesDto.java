package com.bta.api.entities.dto;

import com.bta.api.base.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto extends BaseDto {

    private String roleName;
    private String description;
    private Set<Permission> permissions;
    private Set<UserDto> users;

}
