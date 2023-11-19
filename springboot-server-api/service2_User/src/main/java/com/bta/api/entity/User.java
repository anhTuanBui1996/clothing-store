package com.bta.api.entity;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.bta.api.base.BaseEntity;
import com.bta.api.dto.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity<User, UserDto> implements UserDetails {

    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private boolean isMale;
    private Date dob;
    private String citizenId;

    @ManyToMany
    private Set<Role> roles;

    private boolean enabled;

    @Override
    public Collection<Role> getAuthorities() {
        return getRoles();
    }

    @Override
    public String getUsername() {
        return getEmail();
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
        return enabled;
    }

    @Override
    public User applyChanges(UserDto userDto) {
        id = userDto.getId();
        email = userDto.getEmail();
        password = userDto.getPassword();
        isMale = userDto.isMale();
        dob = userDto.getDob();
        citizenId = userDto.getCitizenId();
        firstName = userDto.getFirstName();
        lastName = userDto.getLastName();
        roles.clear();
        userDto.getRoles().forEach(roleDto -> roles.add(new Role().applyChanges(roleDto)));
        return this;
    }

    @Override
    public UserDto toDto() {
        UserDto userDto = new UserDto();
        userDto.setId(id);
        userDto.setEmail(email);
        userDto.setMale(isMale);
        userDto.setDob(dob);
        userDto.setFirstName(firstName);
        userDto.setLastName(lastName);
        Set<RoleDto> roleDtoSet = new HashSet<>();
        roles.forEach(role -> roleDtoSet.add(role.toDto()));
        userDto.setRoles(roleDtoSet);
        return userDto;
    }

}
