package com.bta.api.models.dto.base;

import com.bta.api.entities.enums.Provider;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionsDto {

    @UuidGenerator
    private UUID id;

    private UUID userId;
    private Provider provider;

    private String jsonWebToken;

}
