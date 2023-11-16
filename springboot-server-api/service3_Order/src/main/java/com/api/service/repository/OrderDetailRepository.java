package com.api.service.repository;

import org.springframework.data.repository.CrudRepository;

import com.api.service.entity.OrderDetail;
import com.api.service.entity.composite.OrderDetailKey;

public interface OrderDetailRepository extends CrudRepository<OrderDetail, OrderDetailKey> {

}
