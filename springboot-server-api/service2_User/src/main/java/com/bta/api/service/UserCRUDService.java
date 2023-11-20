package com.bta.api.service;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

import com.bta.api.base.CRUDService;
import com.bta.api.dto.*;
import com.bta.api.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bta.api.exception.UserServiceCustomException;
import com.bta.api.repository.RoleRepository;
import com.bta.api.repository.UserRepository;

@Service
public class UserCRUDService implements CRUDService<UserDto>, UserDetailsService {

    @Autowired
    UserRepository usersRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public List<UserDto> getAll() {
        List<UserDto> userDtos = new ArrayList<>();
        usersRepository.findAll().forEach(user -> userDtos.add(user.toDto()));
        return userDtos;
    }

    public List<User> getAllEntity() {
        List<User> users = new ArrayList<>();
        usersRepository.findAll().forEach(users::add);
        return users;
    }

    @Override
    public UserDto getById(UUID id) {
        return usersRepository.findById(id)
                .orElseThrow(() -> new UserServiceCustomException("User with given Id not found", "USER_NOT_FOUND")).toDto();
    }

    @Override
    public UserDto save(UserDto dto) {
        return usersRepository.save(new User().applyChanges(dto)).toDto();
    }

    @Override
    public List<UserDto> saveCollection(List<UserDto> dtos) {
        List<User> users = new ArrayList<>();
        dtos.forEach((UserDto dto) -> {
            users.add(new User().applyChanges(dto));
        });
        List<UserDto> userDtos = new ArrayList<>();
        usersRepository.saveAll(users).forEach(user -> userDtos.add(user.toDto()));
        return userDtos;
    }

    public List<User> saveEntityCollection(List<UserEntityDto> dtos) {
        List<User> users = new ArrayList<>();
        dtos.forEach((UserEntityDto dto) -> {
            users.add(new User().applyChanges(dto, passwordEncoder));
        });
        List<User> resultUsers = new ArrayList<>();
        usersRepository.saveAll(users).forEach(resultUsers::add);
        return resultUsers;
    }

    @Override
    public boolean delete(UUID id) {
        if (!usersRepository.existsById(id)) {
            throw new UserServiceCustomException("User with given Id not found", "USER_NOT_FOUND");
        }
        usersRepository.deleteById(id);
        return true;
    }

    @Override
    public boolean deleteCollection(Set<UUID> ids) {
        AtomicBoolean result = new AtomicBoolean(true);
        ids.forEach((UUID id) -> {
            if (usersRepository.existsById(id)) {
                result.set(false);
                throw new UserServiceCustomException("User with given Id not found", "USER_NOT_FOUND");
            }
        });
        usersRepository.deleteAllById(ids);
        return result.get();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<User> users = usersRepository.findByEmail(username);
        if (users.isEmpty()) {
            throw new UsernameNotFoundException("Username not found");
        }
        return users.get(0);
    }

    public UserDto registerNewUser(RegisterUserDto dto) throws UserServiceCustomException {
        if (usersRepository.existsById(dto.getId())) {
            throw new UserServiceCustomException("Duplicate user creation, please try again", "DUPLICATE_USER_CREATION");
        }
        return usersRepository.save(new User().applyChanges(dto, passwordEncoder)).toDto();
    }

    public boolean loginByCredentials(LoginUserDto dto) throws UsernameNotFoundException {
        User user = (User) loadUserByUsername(dto.getEmail());
        return passwordEncoder.encode(dto.getPassword()).equals(user.getPassword());
    }

    public boolean saveUserPassword(ChangeUserPasswordDto dto) throws UsernameNotFoundException {
        User user = (User) loadUserByUsername(dto.getEmail());
        if (passwordEncoder.encode(dto.getOldPassword()).equals(user.getPassword())) {
            user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            usersRepository.save(user);
            return true;
        }
        return false;
    }
}
