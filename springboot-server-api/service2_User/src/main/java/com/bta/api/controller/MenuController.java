package com.bta.api.controller;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.bta.api.dto.MenuDto;
import com.bta.api.exception.UserServiceCustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bta.api.service.MenuCRUDService;

@RestController
@RequestMapping(path = "/menu")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuController {

    @Autowired
    MenuCRUDService menuService;

    @GetMapping(path = "/{id}")
    public ResponseEntity<MenuDto> getMenu(@PathVariable UUID id) {
        try {
            return new ResponseEntity<>(menuService.getById(id), HttpStatusCode.valueOf(HttpStatus.FOUND.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_FOUND.value()));
        }
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<MenuDto>> getAllMenu() {
        try {
            return new ResponseEntity<>(menuService.getAll(), HttpStatusCode.valueOf(HttpStatus.FOUND.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_FOUND.value()));
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<MenuDto> saveMenu(@PathVariable UUID id, @RequestBody MenuDto dto) {
        dto.setId(id);
        try {
            return new ResponseEntity<>(menuService.save(dto), HttpStatusCode.valueOf(HttpStatus.OK.value()));
        } catch (UserServiceCustomException ex) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(HttpStatus.NOT_MODIFIED.value()));
        }
    }

    @PutMapping(path = "/")
    public ResponseEntity<List<MenuDto>> saveAllMenu(@RequestBody List<MenuDto> dtos) {
        return new ResponseEntity<>(menuService.saveCollection(dtos), HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteMenu(@PathVariable UUID id) {
        return new ResponseEntity<>(menuService.delete(id), HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

    @DeleteMapping(path = "/")
    public ResponseEntity<Boolean> deleteAllMenu(@RequestBody Set<UUID> ids) {
        return new ResponseEntity<>(menuService.deleteCollection(ids), HttpStatusCode.valueOf(HttpStatus.OK.value()));
    }

}
