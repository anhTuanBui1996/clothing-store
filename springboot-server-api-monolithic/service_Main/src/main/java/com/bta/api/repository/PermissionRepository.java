package com.bta.api.repository;

import com.bta.api.entities.Roles;
import com.bta.api.entities.composites.RoleMenuKey;
import com.bta.api.entities.Permissions;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PermissionRepository extends CrudRepository<Permissions, RoleMenuKey> {

    List<Permissions> findByRoles(Roles role);

}
