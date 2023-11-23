package com.bta.api.entities.dependencies;

import com.bta.api.entities.composites.ProviderUserKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Providers {

    @EmbeddedId
    private ProviderUserKey providerUserKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private Users users;

}
