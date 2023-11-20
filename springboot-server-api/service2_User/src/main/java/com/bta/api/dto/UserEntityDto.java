package com.bta.api.dto;

import com.bta.api.base.BaseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntityDto extends BaseDto {

    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private boolean isMale;
    private Date dob;
    private String citizenId;

    private Set<RoleDto> roles;
}
