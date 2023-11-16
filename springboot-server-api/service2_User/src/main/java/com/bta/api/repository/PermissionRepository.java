package com.bta.api.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bta.api.entity.Permission;

public interface PermissionRepository extends JpaRepository<Permission, UUID> {

	public List<Permission> findByMenuId(UUID menuId);

	public List<Permission> findByRoleId(UUID roleId);

}
