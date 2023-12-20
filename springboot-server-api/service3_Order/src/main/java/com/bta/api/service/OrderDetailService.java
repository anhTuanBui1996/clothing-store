package com.bta.api.service;

import com.bta.api.base.CRUDService;
import com.bta.api.entities.OrderDetail;
import com.bta.api.models.dto.admin.OrderDetailDto;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public class OrderDetailService {
    
    public OrderDetailDto getByOrderId(UUID id) {
        return null;
    }
    
    public OrderDetailDto save(OrderDetailDto dto) {
        return null;
    }
    
    public List<OrderDetailDto> saveCollection(List<OrderDetailDto> dtos) {
        return null;
    }

    public boolean delete(UUID id) {
        return false;
    }

    public List<UUID> deleteCollection(Set<UUID> ids) {
        return null;
    }

    public OrderDetail applyChangesFromDto(OrderDetailDto dto) {
        return null;
    }

}
