package com.codenexus.analytics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface PageViewRepository extends JpaRepository<PageView, Long> {
    
    long countByViewedAtAfter(LocalDateTime date);
    
    long countByUserEmailIsNullAndViewedAtAfter(LocalDateTime date);
    
    long countByUserEmailIsNotNullAndViewedAtAfter(LocalDateTime date);
    
    @Query("SELECT COUNT(DISTINCT p.sessionId) FROM PageView p WHERE p.viewedAt > ?1")
    long countUniqueVisitorsToday(LocalDateTime date);
    
    List<PageView> findByViewedAtAfter(LocalDateTime date);
    
    // NEW: Location stats
    @Query("SELECT p.country as country, COUNT(p) as count FROM PageView p WHERE p.viewedAt > ?1 AND p.country IS NOT NULL GROUP BY p.country ORDER BY COUNT(p) DESC")
    List<Map<String, Object>> getLocationStats(LocalDateTime date);
    
    // NEW: Hourly views
    @Query(value = "SELECT HOUR(viewed_at) as hour, COUNT(*) as count FROM page_views WHERE viewed_at > ?1 GROUP BY HOUR(viewed_at) ORDER BY HOUR(viewed_at)", nativeQuery = true)
    List<Map<String, Object>> getHourlyViews(LocalDateTime date);
}