package com.bta.api.models.implement;

import com.bta.api.entities.Users;
import lombok.Builder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Builder
public class UserDetailsImpl implements UserDetails {

    public UserDetailsImpl(Users users) {
        dbUsers = users;
    }

    public Users dbUsers;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<AuthorityImpl> authorities = new ArrayList<>(dbUsers.getRoles()
                .stream().map(AuthorityImpl::new).toList());
        if (dbUsers.isAdmin()) {
            authorities.add(new AuthorityImpl("ADMIN"));
        }
        return authorities;
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
        return dbUsers.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return dbUsers.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return dbUsers.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return dbUsers.isEnabled();
    }

}
