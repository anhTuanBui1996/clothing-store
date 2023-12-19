package com.api.service.repository;

import org.springframework.data.repository.CrudRepository;

import com.api.service.entities.OrderDetail;
import com.api.service.entities.composite.OrderDetailKey;

public interface OrderDetailRepository extends CrudRepository<OrderDetail, OrderDetailKey> {

}
