package com.bta.api.entities;

import com.bta.api.base.BaseEntity;
import com.bta.api.models.dto.admin.RolesDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;
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

    @NaturalId
    private String roleCode;
    private String roleName;
    private String description;

    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Permissions> permissions;

    @ManyToMany(mappedBy = "authorities", fetch = FetchType.LAZY)
    private Set<Users> users;

    @Override
    public RolesDto toDto() {
        RolesDto rolesDto = new RolesDto();
        rolesDto.setId(id);
        rolesDto.setRoleCode(roleCode);
        rolesDto.setRoleName(roleName);
        rolesDto.setDescription(description);
        return rolesDto;
    }

    @Override
    public String getAuthority() {
        return roleCode;
    }

}
