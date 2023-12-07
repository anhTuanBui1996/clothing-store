package com.bta.api.entities.owner;

import com.bta.api.base.BaseEntity;
import com.bta.api.entities.dependencies.Permissions;
import com.bta.api.models.dto.RolesDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;

import java.util.Set;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"roleName"}))
@EntityListeners(AuditingEntityListener.class)
public class Roles extends BaseEntity<RolesDto> implements GrantedAuthority {

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

    @Override
    public String getAuthority() {
        return roleCode;
    }

}
