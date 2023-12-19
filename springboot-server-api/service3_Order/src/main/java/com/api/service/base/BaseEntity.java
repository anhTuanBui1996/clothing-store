package com.api.service.base;

import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.UUID;

@MappedSuperclass
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class BaseEntity<D> {

	@Id
	@UuidGenerator
	protected UUID id;

	@CreatedDate
	protected Date createdDate;

	@CreatedBy
	protected String createdBy;

	@LastModifiedDate
	protected Date lastModifiedDate;

	@LastModifiedBy
	protected String lastModifiedBy;

	public abstract D toDto();

}
