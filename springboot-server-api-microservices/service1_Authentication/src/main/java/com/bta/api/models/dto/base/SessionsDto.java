package com.bta.api.models.dto.base;

import com.bta.api.entities.enums.Provider;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionsDto {

    private UUID usersId;
    private Provider provider;

    private String sessionToken;

}
