package com.syntaxsensai.backendservice.repository;

import com.syntaxsensai.backendservice.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.characterCredits = FUNCTION('GREATEST', u.characterCredits + :amount, 0) WHERE u.userId = :userId")
    void addWordCredit(UUID userId, int amount);
}
