package com.bta.api.models.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {

    private boolean isAdmin;
    private String email;
    private String firstName;
    private String lastName;
    private boolean isMale;
    private String authorities;
    private String jwtToken;

}
