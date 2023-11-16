package com.api.service.entity;

import com.api.service.entity.composite.OrderDetailKey;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

@Entity
public class OrderDetail {

	@EmbeddedId
	private OrderDetailKey id;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("order")
	@JoinColumn(name = "ROLE")
	private Order order;
	
	@Column(name = "QUANTITY")
	private int quantity;

	public OrderDetail() {

	}

	public OrderDetail(OrderDetailKey id, Order order, int quantity) {
		super();
		this.id = id;
		this.order = order;
		this.quantity = quantity;
	}

	public OrderDetailKey getId() {
		return id;
	}

	public void setId(OrderDetailKey id) {
		this.id = id;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

}
