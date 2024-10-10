package com.bta.api.entities;

import com.bta.api.base.BaseEntity;
import com.bta.api.models.dto.base.RolesDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"roleName"}))
@EntityListeners(AuditingEntityListener.class)
public class Roles extends BaseEntity<RolesDto> implements GrantedAuthority {

    @NaturalId(mutable = true)
    private String roleCode;
    private String roleName;
    private String description;

    @OneToMany(mappedBy = "roles", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Permissions> permissions;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.EAGER)
    private List<Users> users;

    @Override
    public RolesDto toDto() {
        RolesDto rolesDto = new RolesDto();
        rolesDto.setId(id);
        rolesDto.setRoleCode(roleCode);
        rolesDto.setRoleName(roleName);
        rolesDto.setDescription(description);
        if (permissions != null) {
            rolesDto.setPermissions(permissions.stream()
                    .map(Permissions::toDto)
                    .collect(Collectors.toList()));
        } else {
            rolesDto.setPermissions(new ArrayList<>());
        }
        return rolesDto;
    }

    @Override
    public String getAuthority() {
        return roleCode;
    }

}
