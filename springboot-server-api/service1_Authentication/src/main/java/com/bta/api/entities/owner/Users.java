package com.bta.api.entities.owner;

import com.bta.api.base.BaseEntity;
import com.bta.api.models.dto.UsersDto;
import com.bta.api.repository.RoleRepository;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.userdetails.UserDetails;

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

    private String email;
    private String firstName;
    private String lastName;
    private boolean isMale;
    private Date dob;
    private String citizenId;
    private String phoneNumber;

    @ManyToMany
    @JoinTable(name = "Authorities",
            joinColumns = @JoinColumn(name = "user"),
            inverseJoinColumns = @JoinColumn(name = "role"))
    private Set<Roles> authorities;

    @Override
    public UsersDto toDto() {
        UsersDto userDto = new UsersDto();
        userDto.setId(id);
        userDto.setEmail(email);
        userDto.setMale(isMale);
        userDto.setDob(dob);
        userDto.setFirstName(firstName);
        userDto.setLastName(lastName);
        userDto.setAuthorities(String.join(",",
                authorities.stream().map(Roles::getRoleCode).toList()));
        return userDto;
    }

    public Set<Roles> getAuthoritiesFromDto(String authorities) {
        return Arrays.stream(authorities.split(","))
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