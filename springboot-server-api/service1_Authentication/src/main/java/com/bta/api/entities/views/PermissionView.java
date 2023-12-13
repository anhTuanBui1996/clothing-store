package com.bta.api.entities.views;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface PermissionView {

    @Value("#{target.id.role}")
    UUID roleId();
    @Value("#{target.role.roleName}")
    String roleName();
    @Value("#{target.id.menu}")
    UUID menuId();
    @Value("#{target.menu.menuName}")
    String menuName();
    boolean canModified();
    boolean canView();

}
