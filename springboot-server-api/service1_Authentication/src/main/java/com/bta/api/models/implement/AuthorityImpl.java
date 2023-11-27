package com.bta.api.models.implement;

import com.bta.api.entities.owner.Roles;
import org.springframework.security.core.GrantedAuthority;

public class AuthorityImpl implements GrantedAuthority {

    Roles dbRole;

    public AuthorityImpl(Roles role) {
        dbRole = role;
    }

    @Override
    public String getAuthority() {
        return dbRole.getRoleCode();
    }

}
