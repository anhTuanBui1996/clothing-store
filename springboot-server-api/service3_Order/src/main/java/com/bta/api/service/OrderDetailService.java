package com.bta.api.service;

import com.bta.api.base.BaseEntity;
import com.bta.api.base.CRUDService;
import com.bta.api.entities.Order;
import com.bta.api.entities.OrderDetail;
import com.bta.api.entities.composite.OrderDetailKey;
import com.bta.api.models.dto.admin.OrderDetailDto;
import com.bta.api.repository.OrderDetailRepository;
import com.bta.api.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public class OrderDetailService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderDetailService orderDetailService;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    public OrderDetailDto getCollectionByOrderId(UUID orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new EntityNotFoundException("Role not found: id=" + orderId);
        }
        return orderDetailService.getCollectionByOrderId(orderId);
    }
    
    public OrderDetailDto save(OrderDetailDto dto) {
        return null;
    }
    
    public List<OrderDetailDto> saveCollection(List<OrderDetailDto> dtos) {
        return null;
    }

    public boolean delete(UUID id) {
        return false;
    }

    public List<UUID> deleteCollection(Set<UUID> ids) {
        return null;
    }

    public OrderDetail applyChangesFromDto(OrderDetailDto dto) {
        Optional<OrderDetail> foundOrderDetail = orderDetailRepository.findById(new OrderDetailKey(dto.getOrderId(), dto.getProductId()));
        OrderDetail orderDetail = foundOrderDetail.orElseGet(OrderDetail::new);
        Order order = orderRepository.findById(dto.getOrderId()).orElseGet(Order::new);
        orderDetail.setOrder(order);
        orderDetail.setStatus(dto.getStatusName());
        return null;
    }

}
