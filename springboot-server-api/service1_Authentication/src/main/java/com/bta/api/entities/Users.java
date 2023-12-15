package com.bta.api.entities;

import com.bta.api.base.BaseEntity;
import com.bta.api.models.dto.admin.UsersDto;
import com.bta.api.models.dto.auth.UserInfoDto;
import com.bta.api.repository.RoleRepository;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.*;
import java.util.stream.Collectors;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(indexes = {
        @Index(columnList = "username", unique = true),
        @Index(columnList = "email", unique = true),
        @Index(columnList = "phoneNumber", unique = true)
})
@EntityListeners(AuditingEntityListener.class)
public class Users extends BaseEntity<UsersDto> {

    @Transient
    RoleRepository roleRepository;

    @NaturalId
    @Column(unique = true)
    private String username;
    private String password;
    private boolean isAdmin;

    private String email;
    private String firstName;
    private String lastName;
    private boolean isMale;
    private Date dob;
    private String citizenId;
    private String phoneNumber;

    @ManyToMany
    @JoinTable(name = "authorities",
            joinColumns = @JoinColumn(name = "user"),
            inverseJoinColumns = @JoinColumn(name = "role"))
    private Set<Roles> roles;

    @Override
    public UsersDto toDto() {
        UsersDto userDto = new UsersDto();
        userDto.setId(id);
        userDto.setEmail(email);
        userDto.setMale(isMale);
        userDto.setDob(dob);
        userDto.setFirstName(firstName);
        userDto.setLastName(lastName);
        userDto.setRoles(roles.stream().map(BaseEntity::getId).collect(Collectors.toSet()));
        userDto.setAuthorities(String.join(",",
                roles.stream().map(Roles::getRoleCode).toList()));
        return userDto;
    }

    public UserInfoDto toUserInfoDto() {
        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.setAdmin(isAdmin);
        userInfoDto.setEmail(email);
        userInfoDto.setFirstName(firstName);
        userInfoDto.setLastName(lastName);
        userInfoDto.setAuthorities(String.join(",",
                roles.stream().map(Roles::getRoleCode).toList()));
        return userInfoDto;
    }

    public void setAuthoritiesFromDto(String authorities) {
        this.roles = Arrays.stream(authorities.split(","))
                .map(s -> roleRepository
                        .findByRoleCode(s)
                        .orElseThrow(() -> new EntityNotFoundException("Role not found: roleCode=" + s)))
                .collect(Collectors.toSet());
    }

    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;

}