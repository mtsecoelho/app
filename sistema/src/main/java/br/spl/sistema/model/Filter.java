package br.spl.sistema.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.data.domain.Sort.Direction;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Filter {
	
	@NotNull(message="Página é obrigatória")
	private Integer page;
	
	@NotNull(message="Tamanho é obrigatório")
	private Integer size;
	
	private Direction direction = Direction.ASC;
	
	@NotEmpty(message="Campo é obrigatório")
	private String property;
	
	private String value;

}
