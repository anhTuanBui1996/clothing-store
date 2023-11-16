package com.api.service.repository;

import org.springframework.data.repository.CrudRepository;

import com.api.service.entity.Order;


public interface OrderRepository extends CrudRepository<Order, Long> {

}
