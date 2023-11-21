package com.bta.api.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import com.bta.api.entity.independent.Roles;

public interface RoleRepository extends CrudRepository<Roles, UUID> {

}
