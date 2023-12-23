package com.bta.api.entities;

import com.bta.api.entities.composite.OrderDetailKey;

import com.bta.api.entities.enums.OrderDetailStatus;
import com.bta.api.models.dto.admin.OrderDetailDto;
import com.bta.api.models.template.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.client.RestTemplate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OrderDetail {

	@EmbeddedId
	private OrderDetailKey id;

	@Transient
	RestTemplate restTemplate;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("order")
	private Orders order;

	@Transient
	public Product product() {
		return restTemplate.getForObject("http://PRODUCT_SERVICE/api/admin/product/" + id.getProductId(),
				Product.class);
	}

	private int quantity;
	private String description;

	@Enumerated(EnumType.STRING)
	private OrderDetailStatus status;


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
