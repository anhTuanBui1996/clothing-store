package com.api.service.entities;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.api.service.base.BaseEntity;
import com.api.service.models.dto.admin.OrderDto;
import com.api.service.models.dto.services.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Order extends BaseEntity<OrderDto> {

	private User userMake;

	private Date predictCompleteDate;
	private Date completedDate;
	private Date predictCompletedDate;
	private String fromAddress;
	private String toAddress;
	private long totalShipmentPrice;

	private Promotion promotion;

	@OneToMany(mappedBy = "order", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderDetail> details;

	@Override
	public OrderDto toDto() {
		OrderDto dto = new OrderDto();
		dto.setId(id);
		dto.setUserMakeFullName(userMake.getFirstName() + " " + userMake.getLastName());
		dto.setOrderDate(createdDate);
		dto.setCompletedDate(completedDate);
		dto.setPredictCompletedDate(predictCompletedDate);
		dto.setFromAddress(fromAddress);
		dto.setToAddress(toAddress);



		dto.setTotalShipmentPrice(totalShipmentPrice);
		return null;
	}

}
