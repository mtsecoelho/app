package br.spl.sistema.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.spl.sistema.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	User findByCpf(String cpf);
	User findByEmail(String email);
	User findByUsernameAndPassword(String username, String password);

	Page<User> findByNameContainingIgnoreCase(String name, Pageable pageable);
	Page<User> findByUsernameContainingIgnoreCase(String username, Pageable pageable);
}
