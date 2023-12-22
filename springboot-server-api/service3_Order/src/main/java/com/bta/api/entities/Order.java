package com.bta.api.entities;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import com.bta.api.base.BaseEntity;
import com.bta.api.models.dto.admin.OrderDto;
import com.bta.api.models.template.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.web.client.RestTemplate;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Order extends BaseEntity<OrderDto> {

    private UUID userMadeId;

    private Date completedDate;
    private Date predictCompletedDate;
    private String fromAddress;
    private String toAddress;
    private long totalShipmentPrice;

    private Promotion promotion;

    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> details;

    @Transient
    RestTemplate restTemplate;

    @Override
    public OrderDto toDto() {
        OrderDto dto = new OrderDto();
        dto.setId(id);
        User userMade = restTemplate.getForObject("http://AUTH_SERVICE/admin/user" + userMadeId, User.class);
        if (userMade != null) {
            dto.setUserMadeId(userMadeId);
            dto.setUserMadeFullName(userMade.getFirstName() + " " + userMade.getLastName());
        }
        dto.setOrderDate(createdDate);
        dto.setCompletedDate(completedDate);
        dto.setPredictCompletedDate(predictCompletedDate);
        dto.setFromAddress(fromAddress);
        dto.setToAddress(toAddress);

        dto.setDetails(details.stream().map(OrderDetail::toDto).collect(Collectors.toList()));

        AtomicLong totalPrice = new AtomicLong();
        details.forEach(orderDetail -> {
            totalPrice.addAndGet(orderDetail.product().getPrice());
        });
        dto.setTotalProductPrice(totalPrice.get());
        dto.setTotalShipmentPrice(totalShipmentPrice);
        dto.setPromotionId(promotion.getId());
        return dto;
    }

}
