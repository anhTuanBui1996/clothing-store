package com.bta.api.models.template;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    private UUID id;

    private String firstName;
    private String lastName;
    private boolean isMale;
    private String avatar;

}
