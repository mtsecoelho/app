package br.spl.sistema.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseModel {

	private Object data;
	private Integer status;
	private List<String> message;
	
}
