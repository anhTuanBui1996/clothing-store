package com.bta.api.base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class BaseDto {

    @UuidGenerator
    private UUID id;
    private Date createdDate = new Date();
    private String createdBy = "";
    private Date lastModifiedDate = new Date();
    private String lastModifiedBy = "";

}
