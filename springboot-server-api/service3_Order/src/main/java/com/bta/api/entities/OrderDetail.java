package com.bta.api.entities;

import com.bta.api.base.BaseEntity;
import com.bta.api.entities.composite.OrderDetailKey;

import com.bta.api.entities.enums.OrderDetailStatus;
import com.bta.api.models.dto.admin.OrderDetailDto;
import com.bta.api.models.dto.services.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.client.RestTemplate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OrderDetail extends BaseEntity<OrderDetailDto> {

	@EmbeddedId
	private OrderDetailKey id;

	@Transient
	RestTemplate restTemplate;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("order")
	private Order order;

	@Transient
	public Product product() {
		return restTemplate.getForObject("http://PRODUCT_SERVICE/api/admin/product/" + id.getProductId(),
				Product.class);
	}

	private int quantity;
	private String description;

	@Enumerated(EnumType.STRING)
	private OrderDetailStatus status;


	@Override
	public OrderDetailDto toDto() {
		OrderDetailDto dto = new OrderDetailDto();
		dto.setOrderId(id.getOrderId());
		dto.setProductId(id.getProductId());

		dto.setProductName(product().getName());
		dto.setQuantity(quantity);
		dto.setDescription(description);
		dto.setStatus(status);
		return dto;
	}
}
