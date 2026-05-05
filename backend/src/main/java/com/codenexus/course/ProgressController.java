package com.codenexus.course;

import com.codenexus.common.ApiResponse;
import com.codenexus.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/progress")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProgressController {

    private final TopicProgressRepository progressRepository;
    private final JwtUtils jwtUtils;

    @PostMapping("/{topicId}")
    public ApiResponse<Map<String, Object>> markComplete(
            @PathVariable Long topicId,
            @RequestBody Map<String, Long> body,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String email = getEmail(authHeader);
        Long courseId = body.get("courseId");

        Optional<TopicProgress> existing = progressRepository.findByUserEmailAndTopicId(email, topicId);
        
        TopicProgress progress;
        if (existing.isPresent()) {
            progress = existing.get();
            progress.setCompleted(true);
            progress.setCompletedAt(java.time.LocalDateTime.now());
        } else {
            progress = TopicProgress.builder()
                    .userEmail(email)
                    .courseId(courseId)
                    .topicId(topicId)
                    .completed(true)
                    .build();
        }
        progressRepository.save(progress);

        long completedCount = progressRepository.countByUserEmailAndCourseIdAndCompleted(email, courseId, true);
        
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("completed", true);
        result.put("completedCount", completedCount);
        return ApiResponse.success(result, "Progress saved");
    }

    @GetMapping("/course/{courseId}")
    public ApiResponse<Map<String, Object>> getProgress(
            @PathVariable Long courseId,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String email = getEmail(authHeader);
        List<TopicProgress> progress = progressRepository.findByUserEmailAndCourseId(email, courseId);
        
        List<Long> completedTopicIds = progress.stream()
                .filter(TopicProgress::isCompleted)
                .map(TopicProgress::getTopicId)
                .toList();

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("completedTopicIds", completedTopicIds);
        result.put("completedCount", completedTopicIds.size());
        return ApiResponse.success(result, "Progress loaded");
    }

    private String getEmail(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return jwtUtils.getEmailFromToken(authHeader.substring(7));
        }
        return "unknown";
    }
}