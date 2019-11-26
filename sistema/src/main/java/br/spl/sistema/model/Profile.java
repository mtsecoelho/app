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
public class Profile extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer profile_id;
	
	@NotEmpty
	@Column(nullable=false)
	private String name;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "profiles_uris", joinColumns = { @JoinColumn(name="profile_id", nullable = false, updatable = false) }, inverseJoinColumns = { @JoinColumn(name="uri_id", nullable = false, updatable = false) })
	private Set<Uri> uris;

}
