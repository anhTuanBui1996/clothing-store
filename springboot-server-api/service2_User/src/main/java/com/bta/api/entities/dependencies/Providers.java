package com.bta.api.entities.dependencies;

import com.bta.api.entities.composites.ProviderUserKey;
import com.bta.api.entities.owner.Users;
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
