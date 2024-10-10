package com.bta.api.service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.Orders;
import com.bta.api.entities.OrderDetail;
import com.bta.api.entities.Promotion;
import com.bta.api.models.dto.base.OrderDto;
import com.bta.api.models.dto.projection.MakeOrderDto;
import com.bta.api.models.dto.projection.OrderInfoDto;
import com.bta.api.models.template.User;
import com.bta.api.repository.OrderRepository;
import com.bta.api.repository.PromotionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OrderService implements CRUDService<Orders, OrderDto> {

	@Autowired
    OrderRepository orderRepository;

	@Autowired
	OrderDetailService orderDetailService;

	@Autowired
	PromotionRepository promotionRepository;

	@Autowired
	RestTemplate restTemplate;

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
		List<Orders> orders = new ArrayList<>();
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
	public Orders applyChangesFromDto(OrderDto dto) {
		Optional<Orders> foundOrder = orderRepository.findById(dto.getId());
		Orders order = foundOrder.orElseGet(Orders::new);
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

	public OrderInfoDto makeANewOrder(MakeOrderDto dto) {
		Orders order = new Orders();
		OrderInfoDto orderInfoDto = new OrderInfoDto();

		User user = restTemplate.getForObject("http://AUTHENTICATION_SERVICE/validate/userInfo", User.class);
		if (user != null) {
			order.setUserMadeId(user.getId());
			order.setPredictCompletedDate(dto.getPredictCompletedDate());
			order.setFromAddress(dto.getFromAddress());
			order.setToAddress(dto.getToAddress());
			order.setTotalShipmentPrice(dto.getTotalShipmentPrice());
			Promotion promotion = promotionRepository.findById(dto.getPromotionId())
					.orElseThrow(() -> new EntityNotFoundException("Promotion not found: id=" + dto.getPromotionId()));
			order.setPromotion(promotion);
			order.setDetails(dto.getDetails().stream()
					.map(orderDetailDto -> orderDetailService.applyChangesFromDto(orderDetailDto))
					.collect(Collectors.toList()));

			Orders createdOrder = orderRepository.save(order);
			orderInfoDto.setId(createdOrder.getId());
			orderInfoDto.setUserMakeFullName(user.getFirstName() + " " + user.getLastName());
			orderInfoDto.setOrderDate(createdOrder.getCreatedDate());
			orderInfoDto.setPredictCompletedDate(createdOrder.getPredictCompletedDate());
			orderInfoDto.setFromAddress(createdOrder.getFromAddress());
			orderInfoDto.setToAddress(createdOrder.getToAddress());
			orderInfoDto.setTotalShipmentPrice(createdOrder.getTotalShipmentPrice());
			orderInfoDto.setDetails(createdOrder.getDetails().stream()
					.map(OrderDetail::toDto).collect(Collectors.toList()));

			AtomicLong totalProductPrice = new AtomicLong();
			createdOrder.getDetails().forEach(orderDetail ->
					totalProductPrice.addAndGet(orderDetail.product().getPrice()));
			orderInfoDto.setTotalProductPrice(totalProductPrice.get());

			orderInfoDto.setPromotion(createdOrder.getPromotion().toDto());
			return orderInfoDto;
		} else {
			throw new RuntimeException("Can't get current user info to make an order");
		}

	}

}
