package com.bta.api.repository;

import com.bta.api.entity.Menu;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface MenuRepository extends CrudRepository<Menu, UUID> {

}
