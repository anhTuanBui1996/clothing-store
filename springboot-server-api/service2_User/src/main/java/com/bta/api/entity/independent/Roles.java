package com.bta.api.entity.independent;

import java.util.Set;

import com.bta.api.base.BaseEntity;
import com.bta.api.entity.relationship.Permission;
import com.bta.api.entity.dto.RoleDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"roleName"}))
public class Roles extends BaseEntity<Roles, RoleDto> implements GrantedAuthority {

    private String roleName;
    private String description;

    @OneToMany(mappedBy = "roles", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Permission> permissions;

    @ManyToMany
    private Set<Users> users;

    @Override
    public String getAuthority() {
        return roleName;
    }

    public Roles applyChanges(RoleDto roleDto) {
        id = roleDto.getId();
        roleName = roleDto.getRoleName();
        description = roleDto.getDescription();
        permissions = roleDto.getPermissions();
        return this;
    }

    @Override
    public RoleDto toDto() {
        RoleDto roleDto = new RoleDto();
        roleDto.setRoleName(roleName);
        roleDto.setDescription(description);
        roleDto.setPermissions(permissions);
        return roleDto;
    }

}
