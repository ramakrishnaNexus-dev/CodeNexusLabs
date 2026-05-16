package com.codenexus.analytics;

import com.codenexus.auth.User;
import com.codenexus.auth.UserRepository;
import com.codenexus.common.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Value;
import java.util.*;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final PageViewRepository pageViewRepository;
    private final UserRepository userRepository;

    @PostMapping("/track")
    public ApiResponse<String> trackPageView(@RequestBody Map<String, String> data, HttpServletRequest request) {
        String ip = getClientIp(request);
        String[] location = getLocationFromIp(ip);
        
        PageView pv = PageView.builder()
                .pageUrl(data.get("pageUrl"))
                .sessionId(data.get("sessionId"))
                .userEmail(data.get("userEmail"))
                .ipAddress(ip)
                .country(location[0])
                .city(location[1])
                .region(location[2])
                .userAgent(request.getHeader("User-Agent"))
                .build();
        pageViewRepository.save(pv);
        
        // Update user's last active time if logged in
        if (data.get("userEmail") != null && !data.get("userEmail").isEmpty()) {
            userRepository.findByEmail(data.get("userEmail")).ifPresent(user -> {
                user.setLastActiveAt(LocalDateTime.now());
                userRepository.save(user);
            });
        }
        
        return ApiResponse.success("Tracked", "Page view recorded");
    }

    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> getStats() {
        LocalDateTime today = LocalDateTime.now().minusHours(24);
        LocalDateTime week = LocalDateTime.now().minusDays(7);
        LocalDateTime month = LocalDateTime.now().minusDays(30);
        LocalDateTime activeThreshold = LocalDateTime.now().minusMinutes(5);

        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalViewsToday", pageViewRepository.countByViewedAtAfter(today));
        stats.put("guestViewsToday", pageViewRepository.countByUserEmailIsNullAndViewedAtAfter(today));
        stats.put("userViewsToday", pageViewRepository.countByUserEmailIsNotNullAndViewedAtAfter(today));
        stats.put("uniqueVisitorsToday", pageViewRepository.countUniqueVisitorsToday(today));
        stats.put("totalViewsThisWeek", pageViewRepository.countByViewedAtAfter(week));
        stats.put("totalViewsThisMonth", pageViewRepository.countByViewedAtAfter(month));
        stats.put("activeUsersNow", userRepository.countByLastActiveAtAfter(activeThreshold));

        // Location data
        stats.put("locations", pageViewRepository.getLocationStats(today));
        
        // Hourly views today
        stats.put("hourlyViews", pageViewRepository.getHourlyViews(today));

        return ApiResponse.success(stats, "Analytics fetched");
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip;
    }

    private String[] getLocationFromIp(String ip) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://ipinfo.io/" + ip + "/json?token=ed7ba5c91ede35";
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response != null) {
                return new String[]{
                    response.getOrDefault("country", "Unknown").toString(),
                    response.getOrDefault("city", "Unknown").toString(),
                    response.getOrDefault("region", "Unknown").toString()
                };
            }
        } catch (Exception e) {
            // Fallback if API fails
        }
        return new String[]{"Unknown", "Unknown", "Unknown"};
    }
}