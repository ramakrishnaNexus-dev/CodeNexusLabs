package com.codenexus.resume;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResumeTemplateRepository extends JpaRepository<ResumeTemplate, Long> {
    
    List<ResumeTemplate> findByIsActiveTrueOrderByDisplayOrderAsc();
    
    ResumeTemplate findByIdAndIsActiveTrue(Long id);
}