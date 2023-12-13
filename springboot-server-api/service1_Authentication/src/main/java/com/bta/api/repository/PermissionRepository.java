package com.bta.api.repository;

import com.bta.api.entities.composites.RoleMenuKey;
import com.bta.api.entities.dependencies.Permissions;
import com.bta.api.entities.views.PermissionView;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface PermissionRepository extends CrudRepository<Permissions, RoleMenuKey> {

}
