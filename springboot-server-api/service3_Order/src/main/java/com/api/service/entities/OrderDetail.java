package com.api.service.entities;

import com.api.service.entities.composite.OrderDetailKey;

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
public class OrderDetail {

	@EmbeddedId
	private OrderDetailKey id;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("order")
	private Order order;

	private int quantity;

}
