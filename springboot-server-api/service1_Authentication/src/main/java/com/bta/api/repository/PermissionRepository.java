package com.bta.api.repository;

import com.bta.api.entities.composites.RoleMenuKey;
import com.bta.api.entities.dependencies.Permissions;
import com.bta.api.entities.views.PermissionView;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PermissionRepository extends CrudRepository<Permissions, RoleMenuKey> {

    @Query(nativeQuery = true,
            value = "SELECT " +
                    "   m.id" +
                    "   , m.menuName" +
                    "   , IFNULL(p.canModified, false) as canModified" +
                    "   , IFNULL(p.canView, false) as canView " +
                    "FROM menu m " +
                    "LEFT JOIN roles r ON r.id = :roleId " +
                    "LEFT JOIN permissions p ON r.id = p.role AND m.id = p.menu")
    public List<PermissionView> findPermissionsByRoleId(@Param("roleId") String roleId);

    @Query(nativeQuery = true,
            value = "SELECT " +
                    "   r.id as roleId, r.roleName" +
                    "   , m.id as menuId , m.menuName" +
                    "   , IFNULL(p.canModified, false) as canModified" +
                    "   , IFNULL(p.canView, false) as canView " +
                    "FROM menu m " +
                    "LEFT JOIN permissions p ON r.id = p.role AND m.id = p.menu" +
                    "LEFT JOIN roles r ON r.id = p.role")
    public List<PermissionView> findAllPermissions();

}
