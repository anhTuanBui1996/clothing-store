package com.bta.api.repository;

import org.springframework.data.repository.CrudRepository;

import com.bta.api.entities.Orders;

import java.util.UUID;


public interface OrderRepository extends CrudRepository<Orders, UUID> {

}
