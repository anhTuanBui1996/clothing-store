package com.bta.api.entities.owner;

import java.util.Set;

import com.bta.api.base.BaseEntity;
import com.bta.api.entities.dependencies.Permissions;
import com.bta.api.entities.dto.RolesDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"roleName"}))
public class Roles extends BaseEntity<RolesDto> {

    private String roleCode;
    private String roleName;
    private String description;

    @OneToMany(mappedBy = "roles", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Permissions> permissions;

    @OneToMany
    private Set<Users> users;

    @Override
    public RolesDto toDto() {
        RolesDto rolesDto = new RolesDto();
        rolesDto.setRoleName(roleName);
        rolesDto.setDescription(description);
        rolesDto.setPermissions(permissions);
        return rolesDto;
    }

}
