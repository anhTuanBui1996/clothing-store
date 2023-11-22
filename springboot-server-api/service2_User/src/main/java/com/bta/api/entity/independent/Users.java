package com.bta.api.entity.independent;

import com.bta.api.base.BaseEntity;
import com.bta.api.entity.dto.RegisterUserDto;
import com.bta.api.entity.dto.RoleDto;
import com.bta.api.entity.dto.UserDto;
import com.bta.api.entity.dto.UserEntityDto;
import com.bta.api.entity.relationship.AuthProviders;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(indexes = @Index(columnList = "email", unique = true))
public class Users extends BaseEntity<Users, UserDto> implements UserDetails, OAuth2User {

    @Transient
    private OAuth2User oauth2User;

    @NaturalId
    @Column(unique = true)
    private String email;

    private String password;
    private String firstName;
    private String lastName;
    private boolean isMale;
    private Date dob;
    private String citizenId;

    @ManyToMany(mappedBy = "users")
    private Set<Roles> roles;

    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AuthProviders> providers;

    private boolean enabled;

    public Users(OAuth2User oauth2User) {
        email = oauth2User.getAttribute("email");
    }

    @Override
    public Map<String, Object> getAttributes() {
        return oauth2User.getAttributes();
    }

    @Override
    public Collection<Roles> getAuthorities() {
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
    public Users applyChanges(UserDto userDto) {
        id = userDto.getId();
        email = userDto.getEmail();
        isMale = userDto.isMale();
        dob = userDto.getDob();
        firstName = userDto.getFirstName();
        lastName = userDto.getLastName();
        roles.clear();
        userDto.getRoles().forEach(roleDto -> roles.add(new Roles().applyChanges(roleDto)));
        return this;
    }

    public Users applyChanges(UserEntityDto userDto, PasswordEncoder encoder) {
        id = userDto.getId();
        email = userDto.getEmail();
        password = encoder.encode(userDto.getPassword());
        isMale = userDto.isMale();
        dob = userDto.getDob();
        citizenId = userDto.getCitizenId();
        firstName = userDto.getFirstName();
        lastName = userDto.getLastName();
        roles.clear();
        userDto.getRoles().forEach(roleDto -> roles.add(new Roles().applyChanges(roleDto)));
        return this;
    }

    public Users applyChanges(RegisterUserDto userDto, PasswordEncoder encoder) {
        id = userDto.getId();
        email = userDto.getEmail();
        password = encoder.encode(userDto.getPassword());
        isMale = userDto.isMale();
        dob = userDto.getDob();
        citizenId = userDto.getCitizenId();
        firstName = userDto.getFirstName();
        lastName = userDto.getLastName();
        roles.clear();
        userDto.getRoles().forEach(roleDto -> roles.add(new Roles().applyChanges(roleDto)));
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

    @Override
    public String getName() {
        return email;
    }
}
