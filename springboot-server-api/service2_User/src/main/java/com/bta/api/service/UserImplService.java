package com.bta.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.bta.api.base.ImplService;
import com.bta.api.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bta.api.dto.UserDto;
import com.bta.api.entity.Role;
import com.bta.api.exception.UserServiceCustomException;
import com.bta.api.repository.RoleRepository;
import com.bta.api.repository.UserRepository;

@Service
public class UserImplService implements ImplService<User, UserDto> {

	@Autowired
	UserRepository usersRepository;

	@Autowired
	RoleRepository roleRepository;

	public UserDto getUserDtoById(UUID id) {
		User user = usersRepository.findById(id)
				.orElseThrow(() -> new UserServiceCustomException("User with given Id not found", "USER_NOT_FOUND"));
		return convertFromEntityToDto(user);
	}

	public UserDto getUserByEmailAndPassword(boolean isAdmin, String email, String password) {
		User foundUser = usersRepository.findByIsAdminAndEmailAndPassword(isAdmin, email, password);
		if (foundUser == null) {
			throw new UserServiceCustomException("User with given username and password not found",
					"USER_NOT_FOUND_EMAIL_PASSWORD");
		}
		return convertFromEntityToDto(foundUser);
	}

	public UserDto updateUser(UserDto dto) {
		User user = usersRepository.findById(dto.getId())
				.orElseThrow(() -> new UserServiceCustomException("User with given Id not found", "USER_NOT_FOUND"));
		if (user != null) {
			return convertFromEntityToDto(usersRepository.save(convertFromDtoToEntity(dto)));
		}
		return null;
	}

	public boolean updateUserPassword(UUID userId, String oldPassword, String newPassword) {
		User user = usersRepository.findById(userId)
				.orElseThrow(() -> new UserServiceCustomException("User with givent Id not found", "USER_NOT_FOUND"));
		if (user.getPassword() == oldPassword) {
			user.setPassword(newPassword);
			return true;
		}
		throw new UserServiceCustomException("User with given Id doesn't match with provided password",
				"USER_PASSWORD_MISMATCH");
	}

	public boolean deleteUser(UUID userId) {
		if (usersRepository.existsById(userId)) {
			usersRepository.deleteById(userId);
			return true;
		}
		throw new UserServiceCustomException("User with given Id not found", "USER_NOT_FOUND");
	}

	@Override
	public List<User> getAll() {
		List<User> users = new ArrayList<>();
		usersRepository.findAll().forEach(users::add);
		return users;
	}

	public List<UserDto> getAllUserDto() {
		List<UserDto> users = new ArrayList<>();
		usersRepository.findAll().forEach(user -> users.add(convertFromEntityToDto(user)));
		return users;
	}

	@Override
	public User getById(UUID id) {
		return null;
	}

	@Override
	public User create(UserDto dto) {
		if (usersRepository.existsById(dto.getId())) {
			throw new UserServiceCustomException("User with given Id is already existed", "USER_EXISTED");
		}
		return usersRepository.save(convertFromDtoToEntity(dto));
	}

	public User create(User entity) {
		if (usersRepository.existsById(entity.getId())) {
			throw new UserServiceCustomException("User with given Id is already existed", "USER_EXISTED");
		}
		return usersRepository.save(entity);
	}

	@Override
	public User update(UserDto dto) {
		return null;
	}

	@Override
	public List<User> updateCollection(List<UserDto> dtos) {
		return null;
	}

	@Override
	public boolean delete(UUID id) {
		return false;
	}

	@Override
	public List<Boolean> deleteCollection(List<UUID> ids) {
		return null;
	}

	@Override
	public User convertFromDtoToEntity(UserDto dto) {
		User entity = new User();
		Optional<User> foundEntity = usersRepository.findById(dto.getId());
		if (foundEntity.isPresent()) {
			entity = foundEntity.get();
		} else {
			entity.setId(dto.getId());
		}
		entity.setCreatedDate(dto.getCreatedDate());
		entity.setCreatedBy(dto.getCreatedBy());
		entity.setLastModifiedDate(dto.getLastModifiedDate());
		entity.setLastModifiedBy(dto.getLastModifiedBy());

		entity.setAdmin(dto.isAdmin());
		entity.setEmail(dto.getEmail());
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setMale(dto.isMale());
		entity.setDob(dto.getDob());
		entity.setCitizenId(dto.getCitizenId());
		Role role = roleRepository.findById(dto.getRoleId())
				.orElseThrow(() -> new UserServiceCustomException("Role with given Id not found", "ROLE_NOT_FOUND"));
		Optional<User> foundUser = usersRepository.findById(dto.getId());
		if (foundUser.isPresent()) {
			entity.setPassword(foundUser.get().getPassword());
		}

		entity.setRole(role);

		return entity;
	}

	public UserDto convertFromEntityToDto(User entity) {
		UserDto dto = new UserDto();
		dto.setId(entity.getId());
		dto.setCreatedDate(entity.getCreatedDate());
		dto.setCreatedBy(entity.getCreatedBy());
		dto.setLastModifiedDate(entity.getLastModifiedDate());
		dto.setLastModifiedBy(entity.getLastModifiedBy());

		dto.setAdmin(entity.isAdmin());
		dto.setEmail(entity.getEmail());
		dto.setFirstName(entity.getFirstName());
		dto.setLastName(entity.getLastName());
		dto.setMale(entity.isMale());
		dto.setDob(entity.getDob());
		dto.setCitizenId(entity.getCitizenId());
		dto.setRoleId(entity.getRole().getId());

		return dto;
	}

}
