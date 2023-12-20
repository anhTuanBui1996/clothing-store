package com.bta.api.repository;

import org.springframework.data.repository.CrudRepository;

import com.bta.api.entities.Order;

import java.util.UUID;


public interface OrderRepository extends CrudRepository<Order, UUID> {

}
