package com.codenexus.analytics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface PageViewRepository extends JpaRepository<PageView, Long> {
    
    // Count ALL page loads after a date (total activity)
    long countByViewedAtAfter(LocalDateTime date);
    
    // Count guest page loads (no email)
    long countByUserEmailIsNullAndViewedAtAfter(LocalDateTime date);
    
    // Count registered user page loads
    long countByUserEmailIsNotNullAndViewedAtAfter(LocalDateTime date);
    
    // ✅ FIXED: Count UNIQUE PEOPLE by IP address (native SQL for PostgreSQL)
    @Query(value = "SELECT COUNT(DISTINCT ip_address) FROM page_views WHERE viewed_at > :date", nativeQuery = true)
    long countUniqueVisitorsToday(@Param("date") LocalDateTime date);
    
    // ✅ FIXED: Count unique guest IPs today
    @Query(value = "SELECT COUNT(DISTINCT ip_address) FROM page_views WHERE viewed_at > :date AND user_email IS NULL", nativeQuery = true)
    long countUniqueGuestIPsToday(@Param("date") LocalDateTime date);
    
    // ✅ FIXED: Count unique registered IPs today
    @Query(value = "SELECT COUNT(DISTINCT ip_address) FROM page_views WHERE viewed_at > :date AND user_email IS NOT NULL", nativeQuery = true)
    long countUniqueRegisteredIPsToday(@Param("date") LocalDateTime date);
    
    // Find views after a date
    List<PageView> findByViewedAtAfter(LocalDateTime date);
    
    // Location stats
    @Query(value = "SELECT COALESCE(country, 'Unknown') as country, COUNT(*) as count FROM page_views WHERE viewed_at > :since AND country IS NOT NULL GROUP BY country ORDER BY COUNT(*) DESC LIMIT 10", nativeQuery = true)
    List<Map<String, Object>> getLocationStats(@Param("since") LocalDateTime since);
    
    // Hourly views
    @Query(value = "SELECT EXTRACT(HOUR FROM viewed_at) as hour, COUNT(*) as count FROM page_views WHERE viewed_at > :since GROUP BY EXTRACT(HOUR FROM viewed_at) ORDER BY EXTRACT(HOUR FROM viewed_at)", nativeQuery = true)
    List<Map<String, Object>> getHourlyViews(@Param("since") LocalDateTime since);
    
    // Daily views
    @Query(value = "SELECT DATE(viewed_at) as date, COUNT(*) as count FROM page_views WHERE viewed_at > :since GROUP BY DATE(viewed_at) ORDER BY DATE(viewed_at)", nativeQuery = true)
    List<Map<String, Object>> getDailyViews(@Param("since") LocalDateTime since);
    
    // Top pages
    @Query("SELECT p.pageUrl as pageUrl, COUNT(p) as count FROM PageView p WHERE p.viewedAt > :since GROUP BY p.pageUrl ORDER BY COUNT(p) DESC")
    List<Map<String, Object>> getTopPages(@Param("since") LocalDateTime since);
}