package com.bta.api.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangeUserPasswordDto {

    private String email;
    private String oldPassword;
    private String newPassword;

}
