package com.api.service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.service.OrderService;
import com.api.service.entity.Order;

@RestController
public class OrderController {
	@Autowired
	OrderService orderService;

	@GetMapping(path = "/", headers = { "X-Api-Key=vushop@clothes!" })
	public List<Order> getAll() {
		return orderService.getAllOrder();
	}

	@GetMapping(path = "/{id}", headers = { "X-Api-Key=vushop@clothes!" })
	public Order getOrderById(@PathVariable("id") Long id) {
		return orderService.getOrderById(id);
	}

	@PostMapping(path = "/{id}", headers = { "X-Api-Key=vushop@clothes!" })
	public Order updateOrder(@PathVariable("id") Long id, @RequestBody(required = true) Order order) {
		return orderService.updateOrder(id, order);
	}

	@DeleteMapping(path = "/{id}", headers = { "X-Api-Key=vushop@clothes!" })
	public boolean deleteOrder(@PathVariable("id") Long id) {
		return orderService.deleteOrder(id);
	}
}
