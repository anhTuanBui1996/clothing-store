package com.bta.api.entity.composites;

import com.bta.api.entity.independent.Menu;
import com.bta.api.entity.independent.Roles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class RoleMenuKey implements Serializable {

    private UUID roleId;
    private UUID menuId;

}
