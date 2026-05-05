package com.codenexus.course;

import com.codenexus.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/catalog")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CatalogController {

    private final TopicRepository topicRepository;
    private final CourseRepository courseRepository;

    @PostMapping("/admin/courses/{courseId}/topics")
    public ApiResponse<Topic> addTopic(@PathVariable Long courseId, @RequestBody Topic topic) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        topic.setCourse(course);
        return ApiResponse.success(topicRepository.save(topic), "Topic added");
    }

    @DeleteMapping("/admin/topics/{topicId}")
    public ApiResponse<String> deleteTopic(@PathVariable Long topicId) {
        topicRepository.deleteById(topicId);
        return ApiResponse.success("Deleted", "Topic deleted");
    }

    @PutMapping("/admin/topics/{topicId}")
    public ApiResponse<Topic> updateTopic(@PathVariable Long topicId, @RequestBody Map<String, Object> updates) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new RuntimeException("Topic not found"));
        if (updates.containsKey("title")) topic.setTitle(updates.get("title").toString());
        if (updates.containsKey("content")) topic.setContent(updates.get("content").toString());
        return ApiResponse.success(topicRepository.save(topic), "Topic updated");
    }
}