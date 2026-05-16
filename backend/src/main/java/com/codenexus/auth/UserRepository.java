package com.codenexus.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    List<User> findByRole(String role);
    
    List<User> findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String fullName, String email);
    
    long countByActive(boolean active);
    
    // ===== EXISTING METHODS — DO NOT REMOVE =====
    boolean existsByEmail(String email);
    
    Optional<User> findByResetToken(String token);
    
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    
    long countByActiveAndCreatedAtBetween(boolean active, LocalDateTime start, LocalDateTime end);
    
    // ===== NEW METHODS FOR DASHBOARD =====
    @Query("SELECT COUNT(u) FROM User u WHERE u.lastActiveAt > :threshold")
    long countByLastActiveAtAfter(@Param("threshold") LocalDateTime threshold);
    
    @Query("SELECT u FROM User u WHERE u.lastActiveAt > :threshold ORDER BY u.lastActiveAt DESC")
    List<User> findRecentlyActive(@Param("threshold") LocalDateTime threshold);
    
    @Query("SELECT FUNCTION('DATE', u.createdAt) as date, COUNT(u) as count FROM User u WHERE u.createdAt > :since GROUP BY FUNCTION('DATE', u.createdAt) ORDER BY FUNCTION('DATE', u.createdAt)")
    List<Object[]> countRegistrationsPerDay(@Param("since") LocalDateTime since);
}