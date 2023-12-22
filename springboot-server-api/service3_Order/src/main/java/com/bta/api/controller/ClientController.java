package com.bta.api.controller;

import com.bta.api.models.dto.admin.OrderDto;
import com.bta.api.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClientController {

    @Autowired
    OrderService orderService;

    @PostMapping("/makeOrder")
    public ResponseEntity<OrderDto> makeAnOrder(@RequestBody OrderDto dto) {
        return ResponseEntity.ok(orderService.save(dto));
    }

}
