package com.bta.api.entities.owner;

import java.util.Set;

import com.bta.api.base.BaseEntity;
import com.bta.api.entities.dependencies.Permissions;
import com.bta.api.models.dto.RolesDto;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"roleName"}))
public class Roles extends BaseEntity<RolesDto> {

    private String roleCode;
    private String roleName;
    private String description;

    @OneToMany(mappedBy = "roles", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Permissions> permissions;

    @ManyToMany(mappedBy = "authorities", fetch = FetchType.LAZY)
    private Set<Users> users;

    @Override
    public RolesDto toDto() {
        RolesDto rolesDto = new RolesDto();
        rolesDto.setRoleName(roleName);
        rolesDto.setDescription(description);
        return rolesDto;
    }

}
