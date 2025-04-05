package com.syntaxsensai.backendservice.repository;

import com.syntaxsensai.backendservice.model.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository {
    Optional<User> findByEmail(String email);
}
