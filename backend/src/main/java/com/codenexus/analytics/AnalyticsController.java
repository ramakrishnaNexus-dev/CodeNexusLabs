package com.codenexus.analytics;

import com.codenexus.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final PageViewRepository pageViewRepository;

    @PostMapping("/track")
    public ApiResponse<String> trackPageView(@RequestBody Map<String, String> data) {
        PageView pv = PageView.builder()
                .pageUrl(data.get("pageUrl"))
                .sessionId(data.get("sessionId"))
                .userEmail(data.get("userEmail"))
                .build();
        pageViewRepository.save(pv);
        return ApiResponse.success("Tracked", "Page view recorded");
    }

    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> getStats() {
        LocalDateTime today = LocalDateTime.now().minusHours(24);
        LocalDateTime week = LocalDateTime.now().minusDays(7);
        LocalDateTime month = LocalDateTime.now().minusDays(30);

        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalViewsToday", pageViewRepository.countByViewedAtAfter(today));
        stats.put("guestViewsToday", pageViewRepository.countByUserEmailIsNullAndViewedAtAfter(today));
        stats.put("userViewsToday", pageViewRepository.countByUserEmailIsNotNullAndViewedAtAfter(today));
        stats.put("uniqueVisitorsToday", pageViewRepository.countUniqueVisitorsToday(today));
        stats.put("totalViewsThisWeek", pageViewRepository.countByViewedAtAfter(week));
        stats.put("totalViewsThisMonth", pageViewRepository.countByViewedAtAfter(month));

        return ApiResponse.success(stats, "Analytics fetched");
    }
}