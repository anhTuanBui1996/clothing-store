package com.bta.api.repository;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends CrudRepository<Users, UUID> {

	public List<Users> findByEmail(String email);

}
