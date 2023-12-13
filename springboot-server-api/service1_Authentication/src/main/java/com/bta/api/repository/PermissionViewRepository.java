package com.bta.api.repository;

import com.bta.api.entities.composites.RoleMenuKey;
import com.bta.api.entities.dependencies.Permissions;
import com.bta.api.entities.views.PermissionView;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface PermissionViewRepository extends Repository<Permissions, RoleMenuKey> {

    @Query(nativeQuery = true,
            value = "SELECT " +
                    "   r.id as roleId, r.roleName" +
                    "   , m.id as menuId , m.menuName" +
                    "   , IFNULL(p.canModified, false) as canModified" +
                    "   , IFNULL(p.canView, false) as canView " +
                    "FROM menu m " +
                    "LEFT JOIN permissions p ON m.id = p.menu " +
                    "LEFT JOIN roles r ON r.id = p.role " +
                    "WHERE r.id = :roleId")
    Collection<PermissionView> findPermissionsByRoleId(@Param("roleId") String roleId);

    @Query(nativeQuery = true,
            value = "SELECT " +
                    "   r.id as roleId, r.roleName" +
                    "   , m.id as menuId , m.menuName" +
                    "   , IFNULL(p.canModified, false) as canModified" +
                    "   , IFNULL(p.canView, false) as canView " +
                    "FROM menu m " +
                    "LEFT JOIN permissions p ON m.id = p.menu " +
                    "LEFT JOIN roles r ON r.id = p.role")
    Collection<PermissionView> findAllPermissions();

}
