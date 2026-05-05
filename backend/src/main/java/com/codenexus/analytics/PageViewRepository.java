package com.codenexus.analytics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface PageViewRepository extends JpaRepository<PageView, Long> {
    
    long countByViewedAtAfter(LocalDateTime date);
    
    long countByUserEmailIsNullAndViewedAtAfter(LocalDateTime date);
    
    long countByUserEmailIsNotNullAndViewedAtAfter(LocalDateTime date);
    
    @Query("SELECT COUNT(DISTINCT p.sessionId) FROM PageView p WHERE p.viewedAt > ?1")
    long countUniqueVisitorsToday(LocalDateTime date);
    
    List<PageView> findByViewedAtAfter(LocalDateTime date);
}