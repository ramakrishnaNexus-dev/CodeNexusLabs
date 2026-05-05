package com.codenexus.course;

import com.codenexus.common.ApiResponse;
import com.codenexus.security.JwtUtils;
import com.codenexus.auth.UserRepository;
import com.codenexus.quiz.QuizResultRepository;
import com.codenexus.quiz.QuizResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/enroll")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EnrollmentController {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final QuizResultRepository quizResultRepository;
    private final JwtUtils jwtUtils;

    @PostMapping("/{courseId}")
    public ApiResponse<Map<String, Object>> enroll(
            @PathVariable Long courseId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String email = getEmail(authHeader);
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (enrollmentRepository.existsByUserEmailAndCourseId(email, courseId)) {
            return ApiResponse.error("Already enrolled");
        }

        Long userId = null;
        try {
            var user = userRepository.findByEmail(email).orElse(null);
            if (user != null) userId = user.getId();
        } catch (Exception ignored) {}

        Enrollment enrollment = Enrollment.builder()
                .userId(userId).courseId(courseId)
                .userEmail(email).courseTitle(course.getTitle()).build();
        enrollmentRepository.save(enrollment);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("message", "Enrolled successfully");
        result.put("courseTitle", course.getTitle());
        return ApiResponse.success(result, "Enrolled");
    }

    @GetMapping("/my")
    public ApiResponse<List<Enrollment>> myCourses(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        String email = getEmail(authHeader);
        return ApiResponse.success(enrollmentRepository.findByUserEmail(email), "Your courses");
    }

    @GetMapping("/check/{courseId}")
    public ApiResponse<Boolean> isEnrolled(
            @PathVariable Long courseId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        String email = getEmail(authHeader);
        return ApiResponse.success(
            enrollmentRepository.existsByUserEmailAndCourseId(email, courseId), "Check enrollment");
    }

    @GetMapping("/certificate/{courseId}")
    public ApiResponse<Map<String, Object>> getCertificate(
            @PathVariable Long courseId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String email = getEmail(authHeader);
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        
        if (!enrollmentRepository.existsByUserEmailAndCourseId(email, courseId)) {
            return ApiResponse.error("Not enrolled in this course");
        }

        String userName = email.split("@")[0];
        try {
            var user = userRepository.findByEmail(email).orElse(null);
            if (user != null) userName = user.getFullName();
        } catch (Exception ignored) {}

        List<QuizResult> results = quizResultRepository.findByUserEmail(email);
        boolean hasPassed = results.size() > 0 && results.stream().anyMatch(QuizResult::isPassed);
        int bestScore = results.stream().mapToInt(QuizResult::getScore).max().orElse(0);

        Map<String, Object> certificate = new LinkedHashMap<>();
        certificate.put("studentName", userName);
        certificate.put("courseTitle", course.getTitle());
        certificate.put("completionDate", java.time.LocalDate.now().toString());
        certificate.put("score", bestScore);
        certificate.put("passed", hasPassed);
        certificate.put("certificateId", "CNL-" + System.currentTimeMillis());
        certificate.put("topicsCompleted", course.getTopics().size());

        return ApiResponse.success(certificate, "Certificate data");
    }

    private String getEmail(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return jwtUtils.getEmailFromToken(authHeader.substring(7));
        }
        return "unknown";
    }
}