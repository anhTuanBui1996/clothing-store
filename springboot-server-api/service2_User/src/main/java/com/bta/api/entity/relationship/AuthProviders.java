package com.bta.api.entity.relationship;

import com.bta.api.entity.composites.ProviderUserKey;
import com.bta.api.entity.independent.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthProviders {

    @EmbeddedId
    private ProviderUserKey providerUserKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private Users users;

}
