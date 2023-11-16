package com.api.service.entity.composite;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class OrderDetailKey implements Serializable {

	private static final long serialVersionUID = 6005489460800080826L;

	@Column(name = "ORDER_ID")
	private Long orderId;
	
	@Column(name = "PRODUCT_ID")
	private Long productId;

	public OrderDetailKey() {

	}

	public OrderDetailKey(Long orderId, Long productId) {
		super();
		this.orderId = orderId;
		this.productId = productId;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrder(Long orderId) {
		this.orderId = orderId;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == this)
			return true;
		if (obj == null || obj.getClass() != getClass())
			return false;
		OrderDetailKey castedObj = (OrderDetailKey) obj;
		return orderId.equals(castedObj.orderId) && productId.equals(castedObj.productId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(orderId, productId);
	}
}
