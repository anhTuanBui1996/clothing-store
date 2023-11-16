package com.bta.api.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import com.bta.api.entity.Role;

public interface RoleRepository extends CrudRepository<Role, UUID> {

}
