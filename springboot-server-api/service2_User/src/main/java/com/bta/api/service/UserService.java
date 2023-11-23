package com.bta.api.service;

import com.bta.api.base.CRUDService;
import com.bta.api.entity.dto.ChangeUserPasswordDto;
import com.bta.api.entity.dto.RegisterUserDto;
import com.bta.api.entity.dto.UserDto;
import com.bta.api.entity.dto.UserEntityDto;
import com.bta.api.entity.independent.Users;
import com.bta.api.exception.UserServiceCustomException;
import com.bta.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class UserCRUDService implements CRUDService<UserDto> {

    @Autowired
    InMemoryUserDetailsManager userDetailsManager;

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

    public List<Users> getAllEntity() {
        List<Users> users = new ArrayList<>();
        usersRepository.findAll().forEach(users::add);
        return users;
    }

    @Override
    public UserDto getById(UUID id) {
        return usersRepository.findById(id)
                .orElseThrow(() -> new UserServiceCustomException("Users with given Id not found", "USER_NOT_FOUND")).toDto();
    }

    @Override
    public UserDto save(UserDto dto) {
        return usersRepository.save(new Users().applyChanges(dto)).toDto();
    }

    @Override
    public List<UserDto> saveCollection(List<UserDto> dtos) {
        List<Users> users = new ArrayList<>();
        dtos.forEach((UserDto dto) -> {
            users.add(new Users().applyChanges(dto));
        });
        List<UserDto> userDtos = new ArrayList<>();
        usersRepository.saveAll(users).forEach(user -> userDtos.add(user.toDto()));
        return userDtos;
    }

    public List<Users> saveEntityCollection(List<UserEntityDto> dtos) {
        List<Users> users = new ArrayList<>();
        dtos.forEach((UserEntityDto dto) -> {
            users.add(new Users().applyChanges(dto, passwordEncoder));
        });
        List<Users> resultUsers = new ArrayList<>();
        usersRepository.saveAll(users).forEach(resultUsers::add);
        return resultUsers;
    }

    @Override
    public boolean delete(UUID id) {
        if (!usersRepository.existsById(id)) {
            throw new UserServiceCustomException("Users with given Id not found", "USER_NOT_FOUND");
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
                throw new UserServiceCustomException("Users with given Id not found", "USER_NOT_FOUND");
            }
        });
        usersRepository.deleteAllById(ids);
        return result.get();
    }

    public UserDetails getUserByUsername(String username) throws UsernameNotFoundException {
        if (userDetailsManager.userExists(username)) {
            return userDetailsManager.loadUserByUsername(username);
        }
        List<Users> users = usersRepository.findByEmail(username);
        if (users.isEmpty()) {
            throw new UsernameNotFoundException("Username not found");
        }
        return users.get(0);
    }

    public UserDto registerNewUser(RegisterUserDto dto) throws UserServiceCustomException {
        if (usersRepository.existsById(dto.getId())) {
            throw new UserServiceCustomException("Duplicate user creation, please try again", "DUPLICATE_USER_CREATION");
        }
        return usersRepository.save(new Users().applyChanges(dto, passwordEncoder)).toDto();
    }

    public boolean saveUserPassword(ChangeUserPasswordDto dto) throws UsernameNotFoundException {
        Users users = (Users) getUserByUsername(dto.getEmail());
        if (passwordEncoder.encode(dto.getOldPassword()).equals(users.getPassword())) {
            users.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            usersRepository.save(users);
            return true;
        }
        return false;
    }

}
