package com.bta.api.service;

import java.util.*;
import java.util.stream.Collectors;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.Order;
import com.bta.api.entities.OrderDetail;
import com.bta.api.models.dto.admin.OrderDto;
import com.bta.api.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService implements CRUDService<Order, OrderDto> {

	@Autowired
    OrderRepository orderRepository;

	@Autowired
	OrderDetailService orderDetailService;

	@Override
	public List<OrderDto> getAll() {
		List<OrderDto> orderDtos = new ArrayList<>();
		orderRepository.findAll().forEach(order -> orderDtos.add(order.toDto()));
		return orderDtos;
	}

	@Override
	public OrderDto getById(UUID id) {
		return orderRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Order not found: id=" + id))
				.toDto();
	}

	@Override
	public OrderDto save(OrderDto dto) {
		return orderRepository.save(applyChangesFromDto(dto)).toDto();
	}

	@Override
	public List<OrderDto> saveCollection(List<OrderDto> dtos) {
		List<Order> orders = new ArrayList<>();
		dtos.forEach(orderDto -> orders.add(applyChangesFromDto(orderDto)));
		List<OrderDto> orderDtos = new ArrayList<>();
		orders.forEach(order -> orderDtos.add(order.toDto()));
		return orderDtos;
	}

	@Override
	public boolean delete(UUID id) {
		if (!orderRepository.existsById(id)) {
			throw new EntityNotFoundException("Order not found: id=" + id);
		}
		orderRepository.deleteById(id);
		return true;
	}

	@Override
	public List<UUID> deleteCollection(Set<UUID> ids) {
		List<UUID> result = new ArrayList<>(ids);
		result.forEach((UUID id) -> {
			if (!orderRepository.existsById(id)) {
				result.remove(id);
			}
		});
		orderRepository.deleteAllById(ids);
		return result;
	}

	@Override
	public Order applyChangesFromDto(OrderDto dto) {
		Optional<Order> foundOrder = orderRepository.findById(dto.getId());
		Order order = foundOrder.orElseGet(Order::new);
		order.setUserMadeId(dto.getUserMadeId());
		order.setPredictCompletedDate(dto.getPredictCompletedDate());
		order.setCompletedDate(dto.getCompletedDate());
		order.setFromAddress(dto.getFromAddress());
		order.setToAddress(dto.getToAddress());

		order.setDetails(dto.getDetails().stream()
				.map(orderDetailDto -> orderDetailService.applyChangesFromDto(orderDetailDto))
				.collect(Collectors.toList()));
		order.setTotalShipmentPrice(dto.getTotalShipmentPrice());
		return order;
	}
}
