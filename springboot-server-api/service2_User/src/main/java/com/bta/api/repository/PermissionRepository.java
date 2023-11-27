package com.bta.api.repository;

import com.bta.api.entities.dependencies.Permissions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PermissionRepository extends JpaRepository<Permissions, UUID> {

}
