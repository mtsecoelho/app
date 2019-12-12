package br.spl.sistema.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.EqualsAndHashCode;

@MappedSuperclass
@Data
@EqualsAndHashCode(callSuper=false)
public class BasePerson extends BaseEntity {
	
	@Column(nullable=false)
	@NotNull(message="Data de nascimento é obrigatória")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date birthDate;
	
	@Column(nullable=false)
	@NotEmpty(message="Endereço Obrigatório")
	private String address;
	
	@Column(unique=true, nullable=false)
	@NotEmpty(message="CPF Obrigatório")
	private String cpf;
	
	@Column(unique=true, nullable=false)
	@NotEmpty(message="Email Obrigatório")
	private String email;
	
	@NotEmpty(message="Nome Obrigatório")
	@Column(nullable=false)
	private String name;
	
	@NotEmpty(message="Celular Obrigatório")
	@Column(nullable=false)
	private String celphone;
	
	@Column
	private String telephone;
	
}
