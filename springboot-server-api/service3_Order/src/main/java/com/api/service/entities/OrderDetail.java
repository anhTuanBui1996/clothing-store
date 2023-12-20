package com.api.service.entities;

import com.api.service.base.BaseEntity;
import com.api.service.entities.composite.OrderDetailKey;

import com.api.service.models.dto.admin.OrderDetailDto;
import com.api.service.models.dto.services.Product;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OrderDetail extends BaseEntity<OrderDetailDto> {

	@EmbeddedId
	private OrderDetailKey id;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("order")
	private Order order;
	private Product product;

	private int quantity;
	private String description;
	private OrderDetailStatus status;

	@Override
	public OrderDetailDto toDto() {
		OrderDetailDto dto = new OrderDetailDto();
		dto.setOrderId(id.getOrderId());
		dto.setProductId(id.getProductId());
		dto.setProductName(product.getName());
		dto.setQuantity(quantity);
		dto.setDescription(description);
		dto.setStatusName(status.getStatusName());
		return dto;
	}
}
