package com.bta.api.entity.composites;

import com.bta.api.entity.independent.Users;
import com.bta.api.entity.enums.Provider;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ProviderUserKey implements Serializable {

    private UUID userId;

    @Enumerated(EnumType.STRING)
    private Provider provider;

}
