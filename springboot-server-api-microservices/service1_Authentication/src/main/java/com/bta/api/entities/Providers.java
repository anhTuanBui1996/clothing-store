package com.bta.api.entities;

import com.bta.api.base.BaseEntity;
import com.bta.api.entities.composites.ProviderUserKey;
import com.bta.api.models.dto.base.ProvidersDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Providers extends BaseEntity<ProvidersDto> {

    @EmbeddedId
    private ProviderUserKey providerUserKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private Users user;

    @Override
    public ProvidersDto toDto() {
        ProvidersDto providersDto = new ProvidersDto();
        providersDto.setId(id);
        providersDto.setProvider(String.valueOf(providerUserKey.getProvider()));
        providersDto.setUserId(user.getId());
        return providersDto;
    }
}
