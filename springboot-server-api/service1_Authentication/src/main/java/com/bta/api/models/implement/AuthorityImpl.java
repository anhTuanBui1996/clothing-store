package com.bta.api.models.implement;

import com.bta.api.entities.Roles;
import org.springframework.security.core.GrantedAuthority;

public class AuthorityImpl implements GrantedAuthority {

    Roles dbRole;
    String roleCode;

    public AuthorityImpl(String roleCode) {
        this.roleCode = roleCode;
    }

    public AuthorityImpl(Roles role) {
        dbRole = role;
        roleCode = role.getRoleCode();
    }

    @Override
    public String getAuthority() {
        return "ROLE_" + roleCode;
    }

}
