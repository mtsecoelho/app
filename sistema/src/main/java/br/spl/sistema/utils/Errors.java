package br.spl.sistema.utils;

import java.util.ArrayList;
import java.util.List;

import org.springframework.validation.ObjectError;

public class Errors {
	
	public static List<String> getErrors(List<ObjectError> errors) {
		List<String> errs = new ArrayList<String>();
		
		for (ObjectError error : errors) {
			errs.add(error.getDefaultMessage());
		}
		
		return errs;
	}

}
