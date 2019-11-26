package br.spl.sistema.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@MappedSuperclass
public class BaseEntity {

	@CreationTimestamp
	@Column(updatable = false, nullable = false)
	private Date createdAt;
	
	@UpdateTimestamp
	@Column(nullable = false)
	private Date updatedAt;
	
}
