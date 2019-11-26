package br.spl.sistema.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper=false)
public class User extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	
	@Column(nullable=false)
	@NotNull(message="Data de nascimento é obrigatória")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date birthDate;
	
	@Column(nullable=false)
	@NotEmpty(message="Username Obrigatório")
	private String address;
	
	@Column(unique=true, nullable=false)
	@NotEmpty(message="Username Obrigatório")
	private String username;
	
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
	
	private String telephone;
	
	@NotEmpty(message="Senha Obrigatória")
	@Column(nullable=false)
	private String password;

	@Column(nullable=false)
	private Boolean active = true;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "users_profiles", joinColumns = { @JoinColumn(name="user_id", nullable = false, updatable = false) }, inverseJoinColumns = { @JoinColumn(name="profile_id", nullable = false, updatable = false) })
	private Set<Profile> profiles;
	
}	
