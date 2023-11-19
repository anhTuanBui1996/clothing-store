package com.bta.api.repository;

import com.bta.api.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends CrudRepository<User, UUID> {

	public List<User> findByEmail(String email);

}
