package com.bta.api.entities;

import com.bta.api.base.BaseEntity;
import com.bta.api.models.dto.base.UsersDto;
import com.bta.api.models.dto.projection.UserInfoDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.List;

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

    @NaturalId(mutable = true)
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
    private String avatar;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "Authorities",
            joinColumns = @JoinColumn(name = "user"),
            inverseJoinColumns = @JoinColumn(name = "role"))
    private List<Roles> roles;

    @Override
    public UsersDto toDto() {
        UsersDto userDto = new UsersDto();
        userDto.setId(id);
        userDto.setUsername(username);
        userDto.setAdmin(isAdmin);

        userDto.setEmail(email);
        userDto.setMale(isMale);
        userDto.setDob(dob);
        userDto.setFirstName(firstName);
        userDto.setLastName(lastName);
        userDto.setCitizenId(citizenId);
        userDto.setPhoneNumber(phoneNumber);
        userDto.setRoles(roles.stream().map(BaseEntity::getId).toList());
        userDto.setAuthorities(String.join(",",
                roles.stream().map(Roles::getRoleCode).toList()));
        userDto.setAvatar(avatar);

        userDto.setAccountNonExpired(isAccountNonExpired());
        userDto.setAccountNonLocked(isAccountNonLocked());
        userDto.setCredentialsNonExpired(isCredentialsNonExpired());
        userDto.setEnabled(isEnabled());
        return userDto;
    }

    public UserInfoDto toUserInfoDto() {
        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.setId(id);
        userInfoDto.setFirstName(firstName);
        userInfoDto.setLastName(lastName);
        userInfoDto.setMale(isMale);
        userInfoDto.setAvatar(avatar);
        return userInfoDto;
    }

    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;

}