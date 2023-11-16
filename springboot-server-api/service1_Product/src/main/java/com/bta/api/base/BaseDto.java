package com.bta.api.base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

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
