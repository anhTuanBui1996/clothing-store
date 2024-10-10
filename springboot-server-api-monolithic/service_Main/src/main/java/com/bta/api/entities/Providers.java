package com.bta.api.entities;

import com.bta.api.entities.composites.ProviderUserKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Providers {

    @EmbeddedId
    private ProviderUserKey providerUserKey;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "userId")
    private Users users;

}
