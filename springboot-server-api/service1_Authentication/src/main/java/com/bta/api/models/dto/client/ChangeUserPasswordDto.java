package com.bta.api.models.dto.client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangeUserPasswordDto {

    private String name;
    private String oldPassword;
    private String newPassword;

}
