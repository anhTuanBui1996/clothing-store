package com.bta.api.entity;

import java.util.HashSet;
import java.util.Set;

import com.bta.api.base.BaseEntity;
import com.bta.api.dto.PermissionDto;
import com.bta.api.dto.RoleDto;
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
public class Role extends BaseEntity<Role, RoleDto> implements GrantedAuthority {

    private String roleName;
    private String description;

    @OneToMany(mappedBy = "role", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Permission> permissions;

    @ManyToMany
    private Set<User> users;

    @Override
    public String getAuthority() {
        return roleName;
    }

    public Role applyChanges(RoleDto roleDto) {
        id = roleDto.getId();
        roleName = roleDto.getRoleName();
        description = roleDto.getDescription();
        permissions.clear();
        roleDto.getPermissions().forEach(permissionDto -> permissions.add(new Permission().applyChanges(permissionDto)));
        return this;
    }

    @Override
    public RoleDto toDto() {
        RoleDto roleDto = new RoleDto();
        roleDto.setRoleName(roleName);
        roleDto.setDescription(description);
        Set<PermissionDto> permissionDtoSet = new HashSet<>();
        permissions.forEach(permission -> permissionDtoSet.add(permission.toDto()));
        roleDto.setPermissions(permissionDtoSet);
        return roleDto;
    }

}
