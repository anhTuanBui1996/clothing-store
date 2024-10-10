package com.bta.api.repository;

import com.bta.api.entities.Brand;
import com.bta.api.entities.Sessions;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface SessionRepository extends CrudRepository<Sessions, UUID> {

}
