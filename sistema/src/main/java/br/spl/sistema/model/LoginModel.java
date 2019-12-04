package br.spl.sistema.model;

import java.util.Set;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class LoginModel {
	
	private String username;
	private Set<String> forms;
	
}
