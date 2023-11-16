package com.bta.api.repository;

import com.bta.api.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends CrudRepository<User, UUID> {

	public User findByIsAdminAndEmailAndPassword(boolean isAdmin, String email, String password);

	@Query(value = "SELECT * FROM USER WHERE ROLE = ?1", nativeQuery = true)
	public List<User> findByRoleId(UUID roleId);

}
