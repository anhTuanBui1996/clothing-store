package com.bta.api.service;

import com.bta.api.base.BaseEntity;
import com.bta.api.base.CRUDService;
import com.bta.api.entities.Order;
import com.bta.api.entities.OrderDetail;
import com.bta.api.entities.composite.OrderDetailKey;
import com.bta.api.models.dto.admin.OrderDetailDto;
import com.bta.api.models.dto.admin.OrderDto;
import com.bta.api.repository.OrderDetailRepository;
import com.bta.api.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;
import java.util.stream.Collectors;

public class OrderDetailService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    public List<OrderDetailDto> getCollectionByOrderId(UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found: id=" + orderId));
        return orderDetailRepository.findByOrder(order).stream().map(OrderDetail::toDto).collect(Collectors.toList());
    }
    
    public List<OrderDetailDto> saveCollection(List<OrderDetailDto> dtos) {
        List<OrderDetail> orderDetails = new ArrayList<>();
        dtos.forEach(orderDetailDto -> orderDetails.add(applyChangesFromDto(orderDetailDto)));
        List<OrderDetailDto> orderDetailDtos = new ArrayList<>();
        orderDetails.forEach(orderDetail -> orderDetailDtos.add(orderDetail.toDto()));
        return orderDetailDtos;
    }

    public List<OrderDetailKey> deleteCollection(List<OrderDetailKey> ids) {
        List<OrderDetailKey> result = new ArrayList<>(ids);
        result.forEach((OrderDetailKey id) -> {
            if (!orderDetailRepository.existsById(id)) {
                result.remove(id);
            }
        });
        orderDetailRepository.deleteAllById(ids);
        return result;
    }

    public OrderDetail applyChangesFromDto(OrderDetailDto dto) {
        Optional<OrderDetail> foundOrderDetail = orderDetailRepository.findById(new OrderDetailKey(dto.getOrderId(), dto.getProductId()));
        OrderDetail orderDetail = foundOrderDetail.orElseGet(OrderDetail::new);
        Order order = orderRepository.findById(dto.getOrderId()).orElseGet(Order::new);
        orderDetail.setOrder(order);
        orderDetail.setQuantity(dto.getQuantity());
        orderDetail.setDescription(dto.getDescription());
        orderDetail.setStatus(dto.getStatus());
        return orderDetail;
    }

}
