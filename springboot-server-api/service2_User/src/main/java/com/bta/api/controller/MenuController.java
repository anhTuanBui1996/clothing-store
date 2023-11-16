package com.bta.api.controller;

import java.util.List;
import java.util.UUID;

import com.bta.api.dto.MenuDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bta.api.service.MenuImplService;
import com.bta.api.entity.Menu;

@RestController
@RequestMapping(path = "/menu")
public class MenuController {

    @Autowired
    MenuImplService menuService;

    @GetMapping(path = "/")
    public List<Menu> getAllMenu() {
        return menuService.getAll();
    }

    @PostMapping(path = "/")
    public Menu createMenu(@RequestBody Menu dto) {
        return menuService.create(dto);
    }

    @PutMapping(path = "/")
    public Menu updateMenu(@RequestBody MenuDto dto) {
        return menuService.update(dto);
    }

    @DeleteMapping(path = "/{id}")
    public boolean deleteMenu(@RequestParam UUID id) {
        return menuService.delete(id);
    }

}
