package com.bta.api.repository;

import com.bta.api.entities.views.PermissionView;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface PermissionViewRepository extends Repository<PermissionView, UUID> {

    @Query(nativeQuery = true,
            value = "SELECT " +
                    "   m.`id`" +
                    "   , m.`menuName`" +
                    "   , IFNULL(p.`canModified`, false)" +
                    "   , IFNULL(p.`canView`, false) FROM `menu` m " +
                    "LEFT JOIN `roles` r ON r.`id` = :roleId " +
                    "LEFT JOIN `permissions` p ON r.`id` = p.`role` AND m.`id` = p.`menu`")
    public List<PermissionView> findPermissionsByRoleId(@Param("roleId") UUID roleId);

}
