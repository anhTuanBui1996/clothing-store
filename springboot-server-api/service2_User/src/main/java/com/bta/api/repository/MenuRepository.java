package com.bta.api.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bta.api.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, UUID> {

}
