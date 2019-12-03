package br.spl.sistema.utils;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FilterSecurity extends HttpFilter {

	private static final long serialVersionUID = 4537799762768480238L;
	
	@Autowired
	private Authorizeds authorizeds;
	
	private Set<String> freeUris;

	@Override
	protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");		
		response.setHeader("Access-Control-Max-Age", "3600");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With");
		response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
		
		if ("OPTIONS".equals(request.getMethod())) {
			response.setStatus(HttpServletResponse.SC_OK);
		} else {
			int code = this.validRequest(GetCookie.getCookieByName(request.getCookies(), "api-token"), request.getRemoteAddr(), request.getRequestURI());
			
			if (code == 200) {
				super.doFilter(request, response, chain);
			} else {
				response.sendError(code);
			}
		}
	}

	@Override
	public void init() throws ServletException {
		authorizeds.setAuthorizeds(new HashMap<>());
		
		freeUris = new HashSet<String>();
		freeUris.add("/sistema/api/user/login");
		freeUris.add("/sistema/api/user/logout");
		
		super.init();
	}
	
	private int validRequest(Cookie token, String origin, String uri) {
		if (freeUris.contains(uri)) return 200;
		
		if (token == null) return 403;
		
		Authorized au = authorizeds.getAuthorizeds().get(token.getValue());
		
		if (au == null) return 403;
		
		au.setLastRequest(new Date());
				
		if (au.getOrigin().equals(origin) && au.getUser().getProfiles().stream().filter( item -> item.getUris().stream().filter( u -> uri.matches(u.getUri()) ).findFirst().isPresent() ).findFirst().isPresent()) return 200;
			
		//futuramente criar um cache aqui...
		
		return 401;
	}
	
}
