package com.bta.api.models.implement;

import com.bta.api.entities.owner.Users;
import lombok.Builder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Builder
public class UserDetailsImpl implements UserDetails {

    public UserDetailsImpl(Users users) {
        dbUsers = users;
    }

    public Users dbUsers;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return dbUsers.getAuthorities().stream().map(AuthorityImpl::new).toList();
    }

    @Override
    public String getPassword() {
        return dbUsers.getPassword();
    }

    @Override
    public String getUsername() {
        return dbUsers.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
