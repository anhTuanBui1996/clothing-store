package com.bta.api.controller.admin;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.bta.api.models.dto.admin.OrderDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bta.api.service.OrderService;

@RestController
@RequestMapping(path = "/admin")
public class OrderController {
	@Autowired
	OrderService orderService;

	@GetMapping(path = "/")
	public ResponseEntity<List<OrderDto>> getAll() {
		return ResponseEntity.ok(orderService.getAll());
	}

	@GetMapping(path = "/{id}")
	public ResponseEntity<OrderDto> getOrderById(@PathVariable("id") UUID id) {
		try {
			return ResponseEntity.ok(orderService.getById(id));
		} catch (EntityNotFoundException ex) {
			return ResponseEntity.notFound().build();
		}
	}

	@PutMapping(path = "/{id}")
	public ResponseEntity<OrderDto> updateOrder(@PathVariable("id") UUID id, @RequestBody OrderDto dto) {
		dto.setId(id);
		return ResponseEntity.ok(orderService.save(dto));
	}

	@PutMapping(path = "/")
	public ResponseEntity<List<OrderDto>> saveAllMenu(@RequestBody List<OrderDto> dtos) {
		return ResponseEntity.ok(orderService.saveCollection(dtos));
	}

	@DeleteMapping(path = "/{id}")
	public ResponseEntity<?> deleteOrder(@PathVariable("id") UUID id) {
		if (orderService.delete(id)) {
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

	@DeleteMapping(path = "/")
	public ResponseEntity<List<UUID>> deleteAllOrder(@RequestBody Set<UUID> ids) {
		return ResponseEntity.ok(orderService.deleteCollection(ids));
	}

}
