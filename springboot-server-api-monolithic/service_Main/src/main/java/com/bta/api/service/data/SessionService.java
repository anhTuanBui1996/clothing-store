package com.bta.api.service.data;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.Providers;
import com.bta.api.entities.Sessions;
import com.bta.api.entities.Users;
import com.bta.api.entities.composites.ProviderUserKey;
import com.bta.api.models.dto.base.SessionsDto;
import com.bta.api.repository.SessionRepository;
import com.bta.api.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.SessionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SessionService implements CRUDService<Sessions, SessionsDto> {

    @Autowired
    SessionRepository sessionRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public Sessions applyChangesFromDto(SessionsDto dto) {
        Optional<Sessions> foundSession = sessionRepository.findById(dto.getId());
        Sessions sessions = foundSession.orElseGet(Sessions::new);
        sessions.setId(dto.getId());
        Users users = userRepository.findById(dto.getUserId()).orElseThrow(() -> new UsernameNotFoundException("User not found: " + dto.getUserId()));
        Providers providers = new Providers(new ProviderUserKey(dto.getUserId(), dto.getProvider()), users);
        sessions.setProvider(providers);
        return sessions;
    }

    @Override
    public List<SessionsDto> getAll() {
        List<SessionsDto> sessionsDtos = new ArrayList<>();
        sessionRepository.findAll().forEach(user -> sessionsDtos.add(user.toDto()));
        return sessionsDtos;
    }

    @Override
    public SessionsDto getById(UUID id) {
        return sessionRepository.findById(id)
                .orElseThrow(() -> new SessionException("Session not found: " + id))
                .toDto();
    }

    @Override
    public SessionsDto save(SessionsDto dto) {
        return sessionRepository.save(applyChangesFromDto(dto)).toDto();
    }

    @Override
    public List<SessionsDto> saveCollection(List<SessionsDto> dtos) {
        List<Sessions> sessions = new ArrayList<>();
        dtos.forEach((SessionsDto dto) -> {
            sessions.add(applyChangesFromDto(dto));
        });
        List<SessionsDto> sessionsDtos = new ArrayList<>();
        sessionRepository.saveAll(sessions).forEach(session -> sessionsDtos.add(session.toDto()));
        return sessionsDtos;
    }

    @Override
    public boolean delete(UUID id) {
        if (!sessionRepository.existsById(id)) {
            throw new EntityNotFoundException("Session not found: id=" + id);
        }
        sessionRepository.deleteById(id);
        return true;
    }

    @Override
    public List<UUID> deleteCollection(Set<UUID> ids) {
        List<UUID> result = new ArrayList<>(ids);
        result.forEach((UUID id) -> {
            if (!sessionRepository.existsById(id)) {
                result.remove(id);
            }
        });
        sessionRepository.deleteAllById(ids);
        return result;
    }

}
