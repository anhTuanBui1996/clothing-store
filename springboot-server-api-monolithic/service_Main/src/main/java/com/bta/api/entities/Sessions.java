package com.bta.api.entities;

import com.bta.api.base.BaseEntity;
import com.bta.api.entities.composites.ProviderUserKey;
import com.bta.api.models.dto.base.SessionsDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sessions extends BaseEntity<SessionsDto> {

    @ManyToOne
    @MapsId("providerUserKey")
    @JoinColumns({
            @JoinColumn(name = "userId", referencedColumnName = "userId"),
            @JoinColumn(name = "provider", referencedColumnName = "provider")
    })
    private Providers provider;

    private String jsonWebToken;

    @Override
    public SessionsDto toDto() {
        SessionsDto sessionsDto = new SessionsDto();
        sessionsDto.setId(id);
        sessionsDto.setUserId(provider.getProviderUserKey().getUserId());
        sessionsDto.setProvider(provider.getProviderUserKey().getProvider());
        sessionsDto.setJsonWebToken(jsonWebToken);
        return sessionsDto;
    }
}
