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
public class Discipline extends BaseEntity {	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer discipline_id;
	
	@NotEmpty(message="Nome Obrigatório")
	@Column(nullable=false)
	private String name;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name="disciplines_teachers", joinColumns={ @JoinColumn(name="discipline_id", nullable = false, updatable = false) }, inverseJoinColumns = { @JoinColumn(name="teacher_id", nullable = false, updatable = false) } )
	private Set<Teacher> teachers;
	
}
