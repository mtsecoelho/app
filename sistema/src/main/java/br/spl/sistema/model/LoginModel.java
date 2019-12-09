package br.spl.sistema.model;

import java.util.HashMap;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class LoginModel {
	
	private String username;
	private HashMap<String, String> forms;
	
}
