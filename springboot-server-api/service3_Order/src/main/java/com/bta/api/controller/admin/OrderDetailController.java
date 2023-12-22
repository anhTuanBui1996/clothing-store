package com.bta.api.controller.admin;

import com.bta.api.entities.composite.OrderDetailKey;
import com.bta.api.models.dto.admin.OrderDetailDto;
import com.bta.api.service.OrderDetailService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/admin/detail")
public class OrderDetailController {

    @Autowired
    OrderDetailService orderDetailService;

    @GetMapping(path = "/{id}")
    public ResponseEntity<List<OrderDetailDto>> getOrderDetails(@PathVariable UUID orderId) {
        try {
            return ResponseEntity.ok(orderDetailService.getCollectionByOrderId(orderId));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(path = "/")
    public ResponseEntity<List<OrderDetailDto>> saveAllOrderDetail(@RequestBody List<OrderDetailDto> dtos) {
        return ResponseEntity.ok(orderDetailService.saveCollection(dtos));
    }

    @DeleteMapping(path = "/")
    public ResponseEntity<List<OrderDetailKey>> deleteAllOrderDetail(@RequestBody List<OrderDetailKey> ids) {
        return ResponseEntity.ok(orderDetailService.deleteCollection(ids));
    }

}
