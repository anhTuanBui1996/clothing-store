package com.bta.api.repository;

import com.bta.api.entities.composites.RoleMenuKey;
import com.bta.api.entities.dependencies.Permissions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface PermissionRepository extends CrudRepository<Permissions, RoleMenuKey> {

}
