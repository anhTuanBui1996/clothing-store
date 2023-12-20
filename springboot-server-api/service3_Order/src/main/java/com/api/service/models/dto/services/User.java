package com.api.service.models.dto.services;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    private String firstName;
    private String lastName;
    private boolean isMale;
    private String avatar;

}
