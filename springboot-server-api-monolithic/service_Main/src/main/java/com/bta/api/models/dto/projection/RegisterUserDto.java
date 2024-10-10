package com.bta.api.models.dto.projection;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserDto {

    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private boolean isMale;
    private Date dob;
    private String citizenId;
    private String phoneNumber;

}
