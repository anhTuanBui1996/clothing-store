package com.bta.api.repository;

import com.bta.api.entities.Orders;
import org.springframework.data.repository.CrudRepository;

import com.bta.api.entities.OrderDetail;
import com.bta.api.entities.composite.OrderDetailKey;

import java.util.List;

public interface OrderDetailRepository extends CrudRepository<OrderDetail, OrderDetailKey> {

    public List<OrderDetail> findByOrder(Orders order);

}
