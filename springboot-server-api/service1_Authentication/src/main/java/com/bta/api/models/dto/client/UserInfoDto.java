package com.bta.api.models.dto.client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {

    private boolean isAdmin;
    private String firstName;
    private String lastName;
    private boolean isMale;
    private String authorities;
    private String avatar;

}
