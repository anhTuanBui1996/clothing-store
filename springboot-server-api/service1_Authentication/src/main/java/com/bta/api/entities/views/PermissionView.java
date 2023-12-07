package com.bta.api.entities.views;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Immutable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PermissionView {

    @Id
    private UUID id;
    private String menuName;
    private boolean canModified;
    private boolean canView;

}
