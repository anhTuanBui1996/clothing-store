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

    @EmbeddedId
    private ProviderUserKey providerUserKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private Users user;

    private String sessionToken;

    @Override
    public SessionsDto toDto() {
        SessionsDto sessionsDto = new SessionsDto();
        sessionsDto.setUsersId(providerUserKey.getUserId());
        sessionsDto.setProvider(providerUserKey.getProvider());
        sessionsDto.setSessionToken(sessionToken);
        return sessionsDto;
    }
}
