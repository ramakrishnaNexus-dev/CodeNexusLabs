package com.codenexus.admin;

import com.codenexus.auth.UserRepository;
import com.codenexus.auth.UserService;
import com.codenexus.course.CourseRepository;
import com.codenexus.course.CourseService;
import com.codenexus.course.EnrollmentRepository;
import com.codenexus.quiz.QuizResultRepository;
import com.codenexus.analytics.PageViewRepository;
import com.codenexus.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    private final EnrollmentRepository enrollmentRepository;
    private final CourseService courseService;
    private final UserService userService; // ← ADD THIS

    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> getStats() {
        Map<String, Object> stats = new LinkedHashMap<>();
        
        // ===== TIME THRESHOLDS =====
        LocalDateTime today = LocalDateTime.now().minusHours(24);
        LocalDateTime weekStart = LocalDateTime.now().minusDays(7);
        LocalDateTime monthStart = LocalDateTime.now().minusDays(30);
        LocalDateTime activeThreshold = LocalDateTime.now().minusMinutes(5);
        
        // ===== CORE COUNTS =====
        stats.put("totalUsers", userRepository.count());
        stats.put("activeUsersNow", userRepository.countByLastActiveAtAfter(activeThreshold));
        stats.put("totalCourses", courseRepository.countByActiveTrue());
        stats.put("totalQuizResults", quizResultRepository.count());
        
        // ===== REAL UNIQUE PEOPLE COUNTS (BY IP) =====
        stats.put("totalViewsToday", pageViewRepository.countUniqueVisitorsToday(today));
        stats.put("guestViewsToday", pageViewRepository.countUniqueGuestIPsToday(today));
        stats.put("registeredViewsToday", pageViewRepository.countUniqueRegisteredIPsToday(today));
        stats.put("uniqueVisitorsToday", pageViewRepository.countUniqueVisitorsToday(today));
        
        stats.put("totalPageLoadsToday", pageViewRepository.countByViewedAtAfter(today));
        stats.put("totalPageLoadsThisWeek", pageViewRepository.countByViewedAtAfter(weekStart));
        stats.put("totalPageLoadsThisMonth", pageViewRepository.countByViewedAtAfter(monthStart));
        
        stats.put("totalViewsThisWeek", pageViewRepository.countUniqueVisitorsToday(weekStart));
        stats.put("totalViewsThisMonth", pageViewRepository.countUniqueVisitorsToday(monthStart));
        
        stats.put("dailyActiveUsers", userRepository.countByLastActiveAtAfter(today));
        
        // ===== LOCATION & HOURLY STATS =====
        stats.put("locationStats", pageViewRepository.getLocationStats(today));
        stats.put("hourlyViews", pageViewRepository.getHourlyViews(today));
        
        // ===== USER GROWTH =====
        List<Map<String, Object>> userGrowthData = new ArrayList<>();
        String[] months = {"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"};
        for (int i = 11; i >= 0; i--) {
            java.time.LocalDate monthDate = java.time.LocalDate.now().minusMonths(i).withDayOfMonth(1);
            java.time.LocalDate monthEndDate = monthDate.plusMonths(1);
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("month", months[monthDate.getMonthValue() - 1]);
            data.put("students", userRepository.countByCreatedAtBetween(monthDate.atStartOfDay(), monthEndDate.atStartOfDay()));
            data.put("activeUsers", userRepository.countByActiveAndCreatedAtBetween(true, monthDate.atStartOfDay(), monthEndDate.atStartOfDay()));
            userGrowthData.add(data);
        }
        stats.put("userGrowthData", userGrowthData);

        // ===== COURSE DATA =====
        List<Map<String, Object>> courseData = new ArrayList<>();
        courseRepository.findByActiveTrue().forEach(c -> {
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("name", c.getTitle());
            data.put("students", enrollmentRepository.countByCourseId(c.getId()));
            long completedQuizzes = quizResultRepository.countByCourseId(c.getId());
            long totalTopics = c.getTopics() != null && !c.getTopics().isEmpty() ? c.getTopics().size() : 1;
            int completionRate = (int)((completedQuizzes * 100) / Math.max(totalTopics, 1));
            data.put("completion", Math.min(completionRate, 100));
            courseData.add(data);
        });
        stats.put("courseData", courseData);
        
        // ===== RECENT USERS =====
        List<Map<String, Object>> recentUsers = new ArrayList<>();
        userRepository.findAll().stream()
            .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
            .limit(5)
            .forEach(u -> {
                Map<String, Object> userMap = new LinkedHashMap<>();
                userMap.put("id", u.getId());
                userMap.put("name", u.getFullName());
                userMap.put("fullName", u.getFullName());
                userMap.put("email", u.getEmail());
                userMap.put("role", u.getRole());
                userMap.put("active", u.isActive());
                userMap.put("createdAt", u.getCreatedAt());
                userMap.put("lastActiveAt", u.getLastActiveAt());
                recentUsers.add(userMap);
            });
        stats.put("recentUsers", recentUsers);

        return ApiResponse.success(stats, "Stats fetched");
    }

    @GetMapping("/users")
    public ApiResponse<List<?>> getUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String role) {
        
        if (search != null && !search.isEmpty()) {
            return ApiResponse.success(
                userRepository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(search, search), "Users fetched");
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
            map.put("lastActiveAt", u.getLastActiveAt());
            users.add(map);
        });
        return ApiResponse.success(users, "Users fetched");
    }

    // ===== EXCEL EXPORT ENDPOINTS =====

    @GetMapping("/export/courses")
    public ResponseEntity<byte[]> exportCourses() {
        try {
            byte[] excelData = courseService.exportCoursesToExcel();
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "courses-backup.xlsx");
            headers.setContentLength(excelData.length);
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(excelData);
        } catch (IOException e) {
            throw new RuntimeException("Failed to export courses: " + e.getMessage());
        }
    }

    @PostMapping("/import/courses")
    public ApiResponse<String> importCourses(@RequestParam("file") MultipartFile file) {
        try {
            int importedCount = courseService.importCoursesFromExcel(file);
            return ApiResponse.success(null, "Successfully imported " + importedCount + " courses");
        } catch (IOException e) {
            return ApiResponse.error("Failed to import courses: " + e.getMessage());
        } catch (Exception e) {
            return ApiResponse.error("Invalid file format. Please upload a valid Excel file.");
        }
    }

    // ===== USER EXCEL EXPORT ENDPOINTS =====

    @GetMapping("/export/users")
    public ResponseEntity<byte[]> exportUsers() {
        try {
            byte[] excelData = userService.exportUsersToExcel();
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "users-backup.xlsx");
            headers.setContentLength(excelData.length);
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(excelData);
        } catch (IOException e) {
            throw new RuntimeException("Failed to export users: " + e.getMessage());
        }
    }

    @PostMapping("/import/users")
    public ApiResponse<String> importUsers(@RequestParam("file") MultipartFile file) {
        try {
            int importedCount = userService.importUsersFromExcel(file);
            return ApiResponse.success(null, "Successfully imported " + importedCount + " users");
        } catch (IOException e) {
            return ApiResponse.error("Failed to import users: " + e.getMessage());
        } catch (Exception e) {
            return ApiResponse.error("Invalid file format. Please upload a valid Excel file.");
        }
    }
}