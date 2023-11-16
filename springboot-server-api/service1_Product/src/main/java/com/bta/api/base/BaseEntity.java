package com.bta.api.base;

import jakarta.persistence.*;
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
public class BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@UuidGenerator(style = UuidGenerator.Style.AUTO)
	@Column(nullable = false, updatable = false)
	protected UUID id;

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
