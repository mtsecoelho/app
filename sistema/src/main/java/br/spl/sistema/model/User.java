package br.spl.sistema.model;

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

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper=false)
public class User extends Person {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	
	@NotEmpty(message="Senha Obrigatória")
	@Column(nullable=false)
	private String password;

	@Column(nullable=false)
	private Boolean active = true;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "users_profiles", joinColumns = { @JoinColumn(name="user_id", nullable = false, updatable = false) }, inverseJoinColumns = { @JoinColumn(name="profile_id", nullable = false, updatable = false) })
	private Set<Profile> profiles;
	
}	
