package com.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.service.entity.Order;
import com.api.service.repository.OrderRepository;

@Service
public class OrderService {
	@Autowired
	OrderRepository orderRepository;

	public Order createOrder(Order order) {
		if (order.getOrderId() != null) {
			return null;
		}
		return orderRepository.save(order);
	}

	public List<Order> getAllOrder() {
		List<Order> order = new ArrayList<>();
		orderRepository.findAll().forEach((Order order) -> order.add(order));
		return order;
	}

	public Order getOrderById(Long id) {
		Optional<Order> res = orderRepository.findById(id);
		if (res.isEmpty()) {
			return null;
		}
		return res.get();
	}

	public Order updateOrder(Long id, Order order) {
		if (!orderRepository.existsById(id) || id == null || order == null) {
			return null;
		}
		return orderRepository.save(order);
	}

	public boolean deleteOrder(Long id) {
		if (!orderRepository.existsById(id) || id == null) {
			return false;
		}
		orderRepository.deleteById(id);
		return true;
	}
}
