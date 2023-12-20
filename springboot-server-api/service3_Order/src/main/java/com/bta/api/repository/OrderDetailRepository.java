package com.bta.api.repository;

import org.springframework.data.repository.CrudRepository;

import com.bta.api.entities.OrderDetail;
import com.bta.api.entities.composite.OrderDetailKey;

public interface OrderDetailRepository extends CrudRepository<OrderDetail, OrderDetailKey> {

}
