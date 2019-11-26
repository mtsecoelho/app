package br.spl.sistema.utils;

import javax.servlet.http.Cookie;

public class GetCookie {

	public static final Cookie getCookieByName(Cookie[] cs, String name) {
		if (cs == null)
			return null;
		
		for (Cookie c : cs) {
			if (c.getName().equals(name)) {
				return c;
			}
		}
		return null;
	}
	
}
