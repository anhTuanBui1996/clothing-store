package com.bta.api.repository;

import com.bta.api.entities.owner.Users;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends CrudRepository<Users, UUID> {

	public List<Users> findByUsername(String email);

}
