package com.codenexus.resume;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    
    List<Resume> findByUserIdAndIsActiveTrue(Long userId);
    
    List<Resume> findByUserIdOrderByUpdatedAtDesc(Long userId);
    
    @Query("SELECT r FROM Resume r WHERE r.user.id = :userId AND r.id = :resumeId AND r.isActive = true")
    Resume findActiveByUserIdAndResumeId(@Param("userId") Long userId, @Param("resumeId") Long resumeId);
    
    @Query("UPDATE Resume r SET r.isActive = false WHERE r.id = :resumeId AND r.user.id = :userId")
    void softDelete(@Param("resumeId") Long resumeId, @Param("userId") Long userId);
    
    Long countByUserId(Long userId);
}