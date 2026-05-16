package com.codenexus.analytics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface PageViewRepository extends JpaRepository<PageView, Long> {
    
    // Count all views after a date
    long countByViewedAtAfter(LocalDateTime date);
    
    // Count guest views (no email)
    long countByUserEmailIsNullAndViewedAtAfter(LocalDateTime date);
    
    // Count registered user views
    long countByUserEmailIsNotNullAndViewedAtAfter(LocalDateTime date);
    
    // Count unique visitors by session ID
    @Query("SELECT COUNT(DISTINCT p.sessionId) FROM PageView p WHERE p.viewedAt > ?1")
    long countUniqueVisitorsToday(LocalDateTime date);
    
    // Find views after a date
    List<PageView> findByViewedAtAfter(LocalDateTime date);
    
    // NEW: Location stats — group by country
    @Query(value = "SELECT COALESCE(country, 'Unknown') as country, COUNT(*) as count FROM page_views WHERE viewed_at > :since AND country IS NOT NULL GROUP BY country ORDER BY COUNT(*) DESC LIMIT 10", nativeQuery = true)
    List<Map<String, Object>> getLocationStats(@Param("since") LocalDateTime since);
    
    // NEW: Hourly views for today
    @Query(value = "SELECT HOUR(viewed_at) as hour, COUNT(*) as count FROM page_views WHERE viewed_at > :since GROUP BY HOUR(viewed_at) ORDER BY HOUR(viewed_at)", nativeQuery = true)
    List<Map<String, Object>> getHourlyViews(@Param("since") LocalDateTime since);
    
    // NEW: Daily views for last N days
    @Query(value = "SELECT DATE(viewed_at) as date, COUNT(*) as count FROM page_views WHERE viewed_at > :since GROUP BY DATE(viewed_at) ORDER BY DATE(viewed_at)", nativeQuery = true)
    List<Map<String, Object>> getDailyViews(@Param("since") LocalDateTime since);
    
    // NEW: Top pages by view count
    @Query("SELECT p.pageUrl as pageUrl, COUNT(p) as count FROM PageView p WHERE p.viewedAt > :since GROUP BY p.pageUrl ORDER BY COUNT(p) DESC")
    List<Map<String, Object>> getTopPages(@Param("since") LocalDateTime since);
}