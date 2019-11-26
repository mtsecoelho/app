package br.spl.sistema.utils;

import java.util.Date;

import br.spl.sistema.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Authorized {

	private String origin;
	private User user;
	private Date lastRequest;
	
}
