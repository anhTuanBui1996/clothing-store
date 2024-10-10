package com.bta.api.repository;

import com.bta.api.entities.Menu;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface MenuRepository extends CrudRepository<Menu, UUID> {

}
