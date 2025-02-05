package com.bta.api.service;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.Users;
import com.bta.api.models.dto.admin.UsersDto;
import com.bta.api.models.dto.client.UserInfoDto;
import com.bta.api.repository.RoleRepository;
import com.bta.api.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService implements CRUDService<Users, UsersDto>, UserDetailsService {

    @Autowired
    UserRepository usersRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Users applyChangesFromDto(UsersDto dto) throws EntityNotFoundException {
        Optional<Users> foundUsers = usersRepository.findById(dto.getId());
        Users users = foundUsers.orElseGet(Users::new);

        users.setUsername(dto.getUsername());
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            users.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        users.setAdmin(dto.isAdmin());
        users.setEmail(dto.getEmail());

        users.setMale(dto.isMale());
        users.setDob(dto.getDob());
        users.setFirstName(dto.getFirstName());
        users.setLastName(dto.getLastName());
        users.setCitizenId(dto.getCitizenId());
        users.setPhoneNumber(dto.getPhoneNumber());
        users.setRoles(dto.getRoles().stream().map(uuid -> roleRepository.findById(uuid).orElseThrow(() ->
                new EntityNotFoundException("Role not found: id=" + uuid))).collect(Collectors.toList()));
        users.setAvatar(dto.getAvatar());

        users.setAccountNonExpired(dto.isAccountNonExpired());
        users.setAccountNonLocked(dto.isAccountNonLocked());
        users.setCredentialsNonExpired(dto.isCredentialsNonExpired());
        users.setEnabled(dto.isEnabled());
        return users;
    }

    @Override
    public List<UsersDto> getAll() {
        List<UsersDto> usersDtos = new ArrayList<>();
        usersRepository.findAll().forEach(user -> usersDtos.add(user.toDto()));
        return usersDtos;
    }

    @Override
    public UsersDto getById(UUID id) {
        return usersRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Users not found: " + id))
                .toDto();
    }

    @Override
    public UsersDto save(UsersDto dto) {
        return usersRepository.save(applyChangesFromDto(dto)).toDto();
    }

    @Override
    public List<UsersDto> saveCollection(List<UsersDto> dtos) {
        List<Users> users = new ArrayList<>();
        dtos.forEach((UsersDto dto) -> users.add(applyChangesFromDto(dto)));
        List<UsersDto> usersDtos = new ArrayList<>();
        usersRepository.saveAll(users).forEach(user -> usersDtos.add(user.toDto()));
        return usersDtos;
    }

    @Override
    public boolean delete(UUID id) {
        if (!usersRepository.existsById(id)) {
            throw new EntityNotFoundException("User not found: id=" + id);
        }
        usersRepository.deleteById(id);
        return true;
    }

    @Override
    public List<UUID> deleteCollection(Set<UUID> ids) {
        List<UUID> result = new ArrayList<>(ids);
        result.forEach((UUID id) -> {
            if (!usersRepository.existsById(id)) {
                result.remove(id);
            }
        });
        usersRepository.deleteAllById(ids);
        return result;
    }

    public Users getUserByUsername(String username) throws UsernameNotFoundException {
        return usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: username=" + username));
    }

    public UserInfoDto getUserInfo(String username) throws UsernameNotFoundException {
        if (username.equals("admin")) {
            return new UserInfoDto(UUID.fromString("04885fc2-2b45-47c0-8841-332155278c77"),
                    null, "Admin", true, null);
        }
        return usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: username=" + username))
                .toUserInfoDto();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
