package com.bta.api.base;

import java.util.Date;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class BaseDto {

	protected UUID id;
	protected Date createdDate;
	protected String createdBy;
	protected Date lastModifiedDate;
	protected String lastModifiedBy;
	
}
