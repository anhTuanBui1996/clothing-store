package com.bta.api.controller;

import com.bta.api.service.data.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(path = "/client")
public class ClientController {

    @Autowired
    ProductService productService;

    @GetMapping(path = "/product/reduceInStock")
    public ResponseEntity<Long> reduceProductQuantityInStock(@RequestParam("productId") UUID productId,
                                                             @RequestParam("reduceQuantity") long quantity) {
        try {
            return ResponseEntity.ok(productService.reduceProductQuantityInStock(productId, quantity));
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/product/addInStock")
    public ResponseEntity<Long> addProductQuantityInStock(@RequestParam("productId") UUID productId,
                                                          @RequestParam("addQuantity") long quantity) {
        try {
            return ResponseEntity.ok(productService.addProductQuantityInStock(productId, quantity));
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

}
