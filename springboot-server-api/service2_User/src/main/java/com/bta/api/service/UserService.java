package com.bta.api.service;

import com.bta.api.base.CRUDService;
import com.bta.api.models.dto.ChangeUserPasswordDto;
import com.bta.api.models.dto.RegisterUserDto;
import com.bta.api.models.dto.UsersDto;
import com.bta.api.entities.owner.Users;
import com.bta.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class UserService implements CRUDService<UsersDto>, UserDetailsService {

    @Autowired
    InMemoryUserDetailsManager userDetailsManager;

    @Autowired
    UserRepository usersRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    private Users applyChangesFromDto(UsersDto dto) {
        Optional<Users> foundUsers = usersRepository.findById(dto.getId());
        Users users = foundUsers.orElseGet(Users::new);
        users.setUsername();
    }

    @Override
    public List<UsersDto> getAll() {
        List<UsersDto> usersDtos = new ArrayList<>();
        usersRepository.findAll().forEach(user -> usersDtos.add(user.toDto()));
        return usersDtos;
    }

    public List<Users> getAllEntity() {
        List<Users> users = new ArrayList<>();
        usersRepository.findAll().forEach(users::add);
        return users;
    }

    @Override
    public UsersDto getById(UUID id) {
        return usersRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Users not found: " + id)).toDto();
    }

    @Override
    public UsersDto save(UsersDto dto) {
        return usersRepository.save(new Users().applyChanges(dto)).toDto();
    }

    @Override
    public List<UsersDto> saveCollection(List<UsersDto> dtos) {
        List<Users> users = new ArrayList<>();
        dtos.forEach((UsersDto dto) -> {
            users.add(new Users().applyChanges(dto));
        });
        List<UsersDto> usersDtos = new ArrayList<>();
        usersRepository.saveAll(users).forEach(user -> usersDtos.add(user.toDto()));
        return usersDtos;
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
        List<Users> users = usersRepository.findByUsername(username);
        if (users.isEmpty()) {
            throw new UsernameNotFoundException("Username not found");
        }
        return users.get(0);
    }

    public UsersDto registerNewUser(RegisterUserDto dto) throws UserServiceCustomException {
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
