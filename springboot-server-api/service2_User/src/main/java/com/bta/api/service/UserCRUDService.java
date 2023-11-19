package com.bta.api.service;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

import com.bta.api.base.CRUDService;
import com.bta.api.dto.ChangeUserPasswordDto;
import com.bta.api.dto.LoginUserDto;
import com.bta.api.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bta.api.dto.UserDto;
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
            return null;
        }
        return users.getFirst();
    }

    public boolean loginByCredentials(LoginUserDto dto) {
        User user = (User) loadUserByUsername(dto.getEmail());
        if (user != null) {
            passwordEncoder.encode(dto.getPassword());
        }
        return false;
    }

    public boolean saveUserPassword(ChangeUserPasswordDto dto) {
        User user = (User) loadUserByUsername(dto.getEmail());

    }
}
