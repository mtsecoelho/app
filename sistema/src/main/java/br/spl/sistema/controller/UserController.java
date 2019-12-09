package br.spl.sistema.controller;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.spl.sistema.model.Filter;
import br.spl.sistema.model.LoginModel;
import br.spl.sistema.model.Profile;
import br.spl.sistema.model.ResponseModel;
import br.spl.sistema.model.Uri;
import br.spl.sistema.model.User;
import br.spl.sistema.repository.UserRepository;
import br.spl.sistema.utils.Authorized;
import br.spl.sistema.utils.Authorizeds;
import br.spl.sistema.utils.Errors;
import br.spl.sistema.utils.GetCookie;
import br.spl.sistema.utils.Validations;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private Authorizeds authorizeds;
	
	@Autowired
	private UserRepository userRepository;
	
	@RequestMapping(method = RequestMethod.POST, value = "list")
	public ResponseModel list(@RequestBody @Valid Filter filter, BindingResult result) {
		if (result.hasErrors()) return new ResponseModel(null, HttpStatus.BAD_REQUEST.value(), Errors.getErrors(result.getAllErrors()));
		
		Pageable pageable = PageRequest.of(filter.getPage(), filter.getSize(), filter.getDirection(), filter.getProperty());
		
		if (filter.getProperty().equals("name"))	 return new ResponseModel(userRepository.findByNameContainingIgnoreCase(filter.getValue(), pageable), HttpStatus.OK.value(), null);
		if (filter.getProperty().equals("username")) return new ResponseModel(userRepository.findByUsernameContainingIgnoreCase(filter.getValue(), pageable), HttpStatus.OK.value(), null);
		
		return new ResponseModel(userRepository.findAll(pageable), HttpStatus.OK.value(), null);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "save")
	public ResponseModel saveUser(@RequestBody @Valid User user, BindingResult result) {
		if (result.hasErrors()) return new ResponseModel(null, HttpStatus.BAD_REQUEST.value(), Errors.getErrors(result.getAllErrors()));
		
		User u = null;
		
		if (!Validations.isCPF(user.getCpf())) return new ResponseModel(null, HttpStatus.BAD_REQUEST.value(), Arrays.asList("CPF inválido"));
		
		if (user.getUserId() == null) {
			u = userRepository.findByCpf(user.getCpf());
			if (u != null) return new ResponseModel(null, HttpStatus.BAD_REQUEST.value(), Arrays.asList("CPF em uso"));
			
			u = userRepository.findByEmail(user.getEmail());
			if (u != null) return new ResponseModel(null, HttpStatus.BAD_REQUEST.value(), Arrays.asList("Email em uso"));
		}
				
		try {
			u = userRepository.save(user);
		} catch (Exception e) { 
			return new ResponseModel(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), Arrays.asList(e.getMessage()));
		}
		
		return new ResponseModel(u, HttpStatus.OK.value(), Arrays.asList("Usuário salvo com sucesso"));
	}

	@RequestMapping(method = RequestMethod.POST, value = "login")
	public ResponseModel login(@RequestBody User user, HttpServletRequest request, HttpServletResponse response) {
		User u = userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
		
		if (u == null || u.getActive() == false) return new ResponseModel(null, HttpStatus.BAD_REQUEST.value(), Arrays.asList("Dados de login inválidos"));
		
		String token = DigestUtils.sha1Hex(u.getUserId() + " - Florian - " + new Date());
		String env = System.getenv("environment");
		
		authorizeds.getAuthorizeds().put(token, new Authorized(request.getRemoteAddr(), u, new Date()));
		
		Cookie tokenCookie = new Cookie("api-token", token);
		tokenCookie.setHttpOnly(true);
		
		if (env != null && env.equals("production")) tokenCookie.setSecure(true);
		
		response.addCookie(tokenCookie);
		
		return new ResponseModel(this.getLoginModel(u), HttpStatus.OK.value(), Arrays.asList("Login efetuado"));
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "logout")
	public ResponseModel logout(HttpServletRequest request) {
		String token = GetCookie.getCookieByName(request.getCookies(), "api-token").getValue();
		
		authorizeds.getAuthorizeds().remove(token);
		
		return new ResponseModel(null, HttpStatus.OK.value(), Arrays.asList("Logout efetuado"));
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "login")
	public ResponseModel testLogin(HttpServletRequest request) {	
		String token = GetCookie.getCookieByName(request.getCookies(), "api-token").getValue();
		Authorized au = authorizeds.getAuthorizeds().get(token);
		
		if (au != null) return new ResponseModel(this.getLoginModel(au.getUser()), HttpStatus.OK.value(), Arrays.asList("Usuario logado"));
		return new ResponseModel(null, HttpStatus.UNAUTHORIZED.value(), Arrays.asList("Usuario não está localizado"));
	}
	
	private LoginModel getLoginModel(User u) {
		LoginModel lm = new LoginModel();
		
		lm.setUsername(u.getUsername());
		lm.setForms(new HashMap<String,String>());
		
		Iterator<Profile> profilesIterator = u.getProfiles().iterator();
		Iterator<Uri> urisIterator;
		
		Profile profile;
		Uri uri;
		String permission, form, sUri;
		
		while (profilesIterator.hasNext()) {
			permission = ""; 
			sUri = "";
			
			profile = profilesIterator.next();
			
			urisIterator = profile.getUris().iterator(); 
			
			while (urisIterator.hasNext()) {
				uri = urisIterator.next();
				form = uri.getForm();
				sUri = uri.getUri();
				
				permission = lm.getForms().get(form);
						
				if (permission == null) permission = "";
				if (sUri.contains("list") && !permission.contains("l")) permission += "l";
				if (sUri.contains("save") && !permission.contains("s")) permission += "s";
				if (sUri.contains("delete") && !permission.contains("d")) permission += "d";
				
				if (lm.getForms().containsKey(form)) {
					lm.getForms().replace(form, permission);
				} else {
					lm.getForms().put(form, permission);
				}
			}
		}
		
		return lm;
	}
}
