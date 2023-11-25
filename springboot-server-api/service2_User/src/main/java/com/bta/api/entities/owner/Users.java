package com.bta.api.entities.owner;

import com.bta.api.base.BaseEntity;
import com.bta.api.models.dto.UsersDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.util.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(indexes = @Index(columnList = "username", unique = true))
public class Users extends BaseEntity<UsersDto> {

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
    private String authorities;

    @Override
    public UsersDto toDto() {
        UsersDto userDto = new UsersDto();
        userDto.setId(id);
        userDto.setEmail(email);
        userDto.setMale(isMale);
        userDto.setDob(dob);
        userDto.setFirstName(firstName);
        userDto.setLastName(lastName);
        userDto.setAuthorities(authorities);
        return userDto;
    }
}