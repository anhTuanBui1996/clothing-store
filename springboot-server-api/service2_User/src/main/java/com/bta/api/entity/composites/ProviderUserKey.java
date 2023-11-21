package com.bta.api.entity;

import com.bta.api.enums.Provider;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Providers implements Serializable {

    @ManyToOne
    private Users userId;

    @Enumerated(EnumType.STRING)
    private Provider provider;

}
