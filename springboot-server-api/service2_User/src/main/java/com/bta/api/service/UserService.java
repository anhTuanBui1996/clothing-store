package com.bta.api.service;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.owner.Roles;
import com.bta.api.entities.owner.Users;
import com.bta.api.models.dto.ChangeUserPasswordDto;
import com.bta.api.models.dto.RegisterUserDto;
import com.bta.api.models.dto.UsersDto;
import com.bta.api.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class UserService implements CRUDService<Users, UsersDto> {

    @Autowired
    UserRepository usersRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Users applyChangesFromDto(UsersDto dto) {
        Optional<Users> foundUsers = usersRepository.findById(dto.getId());
        Users users = foundUsers.orElseGet(Users::new);
        users.setUsername(dto.getUsername());
        users.setEmail(dto.getEmail());
        users.setMale(dto.isMale());
        users.setDob(dto.getDob());
        users.setFirstName(dto.getFirstName());
        users.setLastName(dto.getLastName());
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
        dtos.forEach((UsersDto dto) -> {
            users.add(applyChangesFromDto(dto));
        });
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

    public UsersDto registerNewUser(RegisterUserDto dto) throws EntityExistsException {
        usersRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new EntityExistsException("User already existed: email=" + dto.getEmail()));
        usersRepository.findByPhoneNumber(dto.getPhoneNumber())
                .orElseThrow(() -> new EntityExistsException("User already existed: phoneNumber=" + dto.getPhoneNumber()));
        String newUsername = Normalizer.normalize(dto.getLastName().toLowerCase(), Normalizer.Form.NFKC).trim()
                + String.join("", Arrays.stream(dto.getFirstName().split(" ")).map(s -> String.valueOf(s.charAt(0))).toList()).toUpperCase().trim();
//        Assign username with new unique index
        List<Users> foundStartingUsername = usersRepository.findByUsernameStartingWithOrderByUsernameAsc(newUsername);
        int existedUsers = foundStartingUsername.size();
        if (existedUsers > 0) {
            for (int i = 0; i < existedUsers; i++) {
                String existedUsername = foundStartingUsername.get(i).getUsername();
                String indexAsString = existedUsername.replace(newUsername, "");
                if (indexAsString.isEmpty() && i == 0) {
                    continue;
                }
                int existedIndex = Integer.parseInt(indexAsString);
                if (existedIndex != i) {
                    newUsername += i;
                }
            } ;

        }
        Users newUser = Users.builder()
                .username(newUsername)
                .password(passwordEncoder.encode(dto.getPassword()))
                .email(dto.getEmail())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .dob(dto.getDob())
                .isMale(dto.isMale())
                .citizenId(dto.getCitizenId())
                .phoneNumber(dto.getPhoneNumber())
                .authorities(Set.of(Roles.builder()
                        .roleCode("CLIENT")
                        .roleName("Client user")
                        .description("For client user in Web-client")
                        .build()))
                .build();
        return usersRepository.save(newUser).toDto();
    }

    public boolean saveUserPassword(ChangeUserPasswordDto dto) throws UsernameNotFoundException {
        Users user = usersRepository.findByUsername(dto.getName())
                .orElseGet(() -> usersRepository.findByEmail(dto.getName())
                        .orElseGet(() -> usersRepository.findByPhoneNumber(dto.getName())
                                .orElseThrow(() -> new UsernameNotFoundException("User not found: name=" + dto.getName()))));
        if (user.toDto().getAuthorities().contains("ADMIN")) {
            return false;
        }
        if (passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            usersRepository.save(user);
            return true;
        }
        return false;
    }

}
