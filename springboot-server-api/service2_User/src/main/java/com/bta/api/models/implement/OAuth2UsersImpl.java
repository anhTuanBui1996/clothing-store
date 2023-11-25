package com.bta.api.models.implement;

import com.bta.api.entities.owner.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Arrays;
import java.util.Collection;
import java.util.Map;

public class OAuth2UsersImpl implements OAuth2User {

    public OAuth2UsersImpl(Users users) {
        dbUsers = users;
    }

    public Users dbUsers;

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(dbUsers.getAuthorities().split(",")).map(SimpleGrantedAuthority::new).toList();
    }

    @Override
    public String getName() {
        return dbUsers.getUsername();
    }

}
