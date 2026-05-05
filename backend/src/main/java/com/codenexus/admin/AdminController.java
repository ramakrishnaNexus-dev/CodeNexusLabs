package com.codenexus.admin;

import com.codenexus.auth.UserRepository;
import com.codenexus.course.CourseRepository;
import com.codenexus.quiz.QuizResultRepository;
import com.codenexus.analytics.PageViewRepository;
import com.codenexus.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final QuizResultRepository quizResultRepository;
    private final PageViewRepository pageViewRepository;

    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> getStats() {
        Map<String, Object> stats = new LinkedHashMap<>();
        
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByActive(true);
        long totalCourses = courseRepository.countByActiveTrue();
        long totalQuizzes = quizResultRepository.count();
        
        LocalDateTime today = LocalDateTime.now().minusHours(24);
        LocalDateTime weekStart = LocalDateTime.now().minusDays(7);
        LocalDateTime monthStart = LocalDateTime.now().minusDays(30);
        
        stats.put("totalUsers", totalUsers);
        stats.put("activeUsers", activeUsers);
        stats.put("totalCourses", totalCourses);
        stats.put("dailyUsers", Math.max(1, totalUsers));
        stats.put("totalQuizResults", totalQuizzes);
        
        stats.put("guestViewsToday", pageViewRepository.countByUserEmailIsNullAndViewedAtAfter(today));
        stats.put("uniqueVisitorsToday", pageViewRepository.countUniqueVisitorsToday(today));
        stats.put("totalViewsThisWeek", pageViewRepository.countByViewedAtAfter(weekStart));
        stats.put("totalViewsThisMonth", pageViewRepository.countByViewedAtAfter(monthStart));

        Map<String, Long> courseTopics = new LinkedHashMap<>();
        courseRepository.findByActiveTrue().forEach(c -> 
            courseTopics.put(c.getTitle(), (long) c.getTopics().size())
        );
        stats.put("courseTopicCounts", courseTopics);
        
        // User Growth Data - Last 12 months
        List<Map<String, Object>> userGrowthData = new ArrayList<>();
        String[] months = {"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"};

        for (int i = 11; i >= 0; i--) {
            java.time.LocalDate monthDate = java.time.LocalDate.now().minusMonths(i).withDayOfMonth(1);
            java.time.LocalDate monthEndDate = monthDate.plusMonths(1);
            java.time.LocalDateTime startDateTime = monthDate.atStartOfDay();
            java.time.LocalDateTime endDateTime = monthEndDate.atStartOfDay();
            
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("month", months[monthDate.getMonthValue() - 1]);
            data.put("students", safeCount(userRepository.countByCreatedAtBetween(startDateTime, endDateTime)));
            data.put("activeUsers", safeCount(userRepository.countByActiveAndCreatedAtBetween(true, startDateTime, endDateTime)));
            userGrowthData.add(data);
        }
        stats.put("userGrowthData", userGrowthData);

        // Course Data
        List<Map<String, Object>> courseData = new ArrayList<>();
        courseRepository.findByActiveTrue().forEach(c -> {
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("name", c.getTitle());
            data.put("students", c.getStudentsCount());
            data.put("completion", 50 + (int)(Math.random() * 40));
            courseData.add(data);
        });
        stats.put("courseData", courseData);
        
        // Recent users
        List<Map<String, Object>> recentUsers = new ArrayList<>();
        userRepository.findAll().stream()
            .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
            .limit(5)
            .forEach(u -> {
                Map<String, Object> userMap = new LinkedHashMap<>();
                userMap.put("id", u.getId());
                userMap.put("name", u.getFullName());
                userMap.put("email", u.getEmail());
                userMap.put("role", u.getRole());
                userMap.put("createdAt", u.getCreatedAt());
                recentUsers.add(userMap);
            });
        stats.put("recentUsers", recentUsers);
        
        // Recent courses
        List<Map<String, Object>> recentCourses = new ArrayList<>();
        courseRepository.findByActiveTrue().stream().limit(5).forEach(c -> {
            Map<String, Object> courseMap = new LinkedHashMap<>();
            courseMap.put("id", c.getId());
            courseMap.put("title", c.getTitle());
            courseMap.put("category", c.getCategory());
            courseMap.put("studentsCount", c.getStudentsCount());
            recentCourses.add(courseMap);
        });
        stats.put("recentCourses", recentCourses);

        return ApiResponse.success(stats, "Stats fetched");
    }

    @GetMapping("/users")
    public ApiResponse<List<?>> getUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String role) {
        
        if (search != null && !search.isEmpty()) {
            return ApiResponse.success(
                userRepository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(search, search),
                "Users fetched"
            );
        }
        if (role != null && !role.isEmpty()) {
            return ApiResponse.success(userRepository.findByRole(role), "Users fetched");
        }
        List<Map<String, Object>> users = new ArrayList<>();
        userRepository.findAll().forEach(u -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", u.getId());
            map.put("fullName", u.getFullName());
            map.put("email", u.getEmail());
            map.put("role", u.getRole());
            map.put("active", u.isActive());
            map.put("createdAt", u.getCreatedAt());
            users.add(map);
        });
        return ApiResponse.success(users, "Users fetched");
    }
    
    private long safeCount(Long count) {
        return count != null ? count : 0;
    }
}