package com.bta.api.service;

import com.bta.api.entities.Roles;
import com.bta.api.entities.Users;
import com.bta.api.models.dto.auth.ChangeUserPasswordDto;
import com.bta.api.models.dto.auth.RegisterUserDto;
import com.bta.api.models.dto.admin.UsersDto;
import com.bta.api.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Service
public class CredentialsService {

    @Autowired
    UserRepository usersRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

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
                .roles(Set.of(Roles.builder()
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
