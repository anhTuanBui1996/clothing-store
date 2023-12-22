package com.bta.api.controller.admin;

import com.bta.api.models.dto.admin.MenuDto;
import com.bta.api.service.MenuService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(path = "/admin/menu")
public class MenuController {

    @Autowired
    MenuService menuService;

    @GetMapping(path = "/{id}")
    public ResponseEntity<MenuDto> getMenu(@PathVariable UUID id) {
        try {
            return ResponseEntity.ok(menuService.getById(id));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<MenuDto>> getAllMenu() {
        return ResponseEntity.ok(menuService.getAll());
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<MenuDto> saveMenu(@PathVariable UUID id, @RequestBody MenuDto dto) {
        dto.setId(id);
        return ResponseEntity.ok(menuService.save(dto));
    }

    @PutMapping(path = "/")
    public ResponseEntity<List<MenuDto>> saveAllMenu(@RequestBody List<MenuDto> dtos) {
        return ResponseEntity.ok(menuService.saveCollection(dtos));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteMenu(@PathVariable UUID id) {
        if (menuService.delete(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping(path = "/")
    public ResponseEntity<List<UUID>> deleteAllMenu(@RequestBody Set<UUID> ids) {
        return ResponseEntity.ok(menuService.deleteCollection(ids));
    }

}
