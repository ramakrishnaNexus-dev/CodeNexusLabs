package com.codenexus.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    
    // Auth
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findByResetToken(String token);
    
    // Admin Dashboard
    long countByActive(boolean active);
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    long countByActiveAndCreatedAtBetween(boolean active, LocalDateTime start, LocalDateTime end);
    
    // Analytics — Active Users
    long countByLastActiveAtAfter(LocalDateTime date);
    
    // User Management — Search & Filter
    List<User> findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String name, String email);
    List<User> findByRole(String role);
}