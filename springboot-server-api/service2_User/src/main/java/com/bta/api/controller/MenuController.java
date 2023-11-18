package com.bta.api.controller;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.bta.api.base.BaseResponse;
import com.bta.api.dto.MenuDto;
import com.bta.api.enums.ResponseStatus;
import com.bta.api.exception.UserServiceCustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bta.api.service.MenuImplService;
import com.bta.api.entity.Menu;

@RestController
@RequestMapping(path = "/menu")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuController {

    @Autowired
    MenuImplService menuService;

    @GetMapping(path = "/{id}")
    public BaseResponse getMenu(@PathVariable UUID id) {
        try {
            return new BaseResponse(ResponseStatus.ReadSuccessfully, "Read a Menu successfully!", new Date(), menuService.getById(id));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.ReadFailed, "Read a Menu failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @GetMapping(path = "/")
    public BaseResponse getAllMenu() {
        try {
            return new BaseResponse(ResponseStatus.ReadSuccessfully, "Read All Menu successfully!", new Date(), menuService.getAll());
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.ReadFailed, "Read All Menu failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @PostMapping(path = "/")
    public BaseResponse createMenu(@RequestBody MenuDto dto) {
        try {
            return new BaseResponse(ResponseStatus.CreatedSuccessfully, "Created a new Menu successfully", new Date(), menuService.create(dto));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.CreatedFailed, "Created a new Menu failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @PutMapping(path = "/{id}")
    public BaseResponse updateMenu(@PathVariable UUID id, @RequestBody MenuDto dto) {
        dto.setId(id);
        try {
            return new BaseResponse(ResponseStatus.UpdatedSuccessfully, "Updated a new Menu successfully", new Date(), menuService.update(dto));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.UpdatedFailed, "Updated an existing Menu failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @PutMapping(path = "/")
    public BaseResponse updateAllMenu(@RequestBody List<MenuDto> dtos) {
        try {
            return new BaseResponse(ResponseStatus.UpdatedSuccessfully, "Updated a list of Menu successfully", new Date(), menuService.updateCollection(dtos));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.UpdatedFailed, "Updated a list of Menu failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), null);
        }
    }

    @DeleteMapping(path = "/{id}")
    public BaseResponse deleteMenu(@PathVariable UUID id) {
        try {
            return new BaseResponse(ResponseStatus.DeletedSuccessfully, "Deleted a existing Menu successfully", new Date(), menuService.delete(id));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.DeletedFailed, "Deleted an existing Menu failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), false);
        }
    }

    @DeleteMapping(path = "/")
    public BaseResponse deleteAllMenu(@RequestBody List<UUID> ids) {
        try {
            return new BaseResponse(ResponseStatus.DeletedSuccessfully, "Deleted a list of Menu successfully", new Date(), menuService.deleteCollection(ids));
        } catch (UserServiceCustomException ex) {
            return new BaseResponse(ResponseStatus.DeletedFailed, "Deleted a list of Menu failed | " + ex.getErrorCode() + " | " + ex.getMessage(), new Date(), false);
        }
    }

}
