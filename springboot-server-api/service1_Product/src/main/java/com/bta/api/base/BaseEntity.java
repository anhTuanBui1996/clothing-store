package com.bta.api.base;

import java.util.Date;
import java.util.UUID;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.CurrentTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

@MappedSuperclass
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(nullable = false, insertable = false, updatable = false)
	protected UUID id = UUID.randomUUID();

	@CreatedDate
	@Column(nullable = false)
	protected Date createdDate;

	@CreatedBy
	@Column(nullable = false)
	protected String createdBy;

	@LastModifiedDate
	@Column(nullable = false)
	protected Date lastModifiedDate;

	@LastModifiedBy
	@Column(nullable = false)
	protected String lastModifiedBy;

}
