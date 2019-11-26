package br.spl.sistema.utils;

import java.util.HashMap;

import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
public class Authorizeds {
	
	private HashMap<String, Authorized> authorizeds;

}
