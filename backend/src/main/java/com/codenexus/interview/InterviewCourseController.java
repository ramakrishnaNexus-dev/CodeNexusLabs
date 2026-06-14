package com.codenexus.interview;

import com.codenexus.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/interview")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InterviewCourseController {

    private final InterviewCourseRepository courseRepository;
    private final InterviewTopicRepository topicRepository;

    @GetMapping("/courses")
    public ApiResponse<List<InterviewCourse>> getAllCourses() {
        List<InterviewCourse> courses = courseRepository.findAll();
        for (InterviewCourse course : courses) {
            List<InterviewTopic> topics = topicRepository.findByInterviewCourseIdOrderByOrderIndexAsc(course.getId());
            course.setTopics(topics);
        }
        return ApiResponse.success(courses, "Interview courses fetched");
    }

    @GetMapping("/courses/{id}")
    public ApiResponse<InterviewCourse> getCourse(@PathVariable Long id) {
        InterviewCourse course = courseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Course not found"));
        List<InterviewTopic> topics = topicRepository.findByInterviewCourseIdOrderByOrderIndexAsc(id);
        course.setTopics(topics);
        return ApiResponse.success(course, "Course fetched");
    }

    @PostMapping("/courses")
    public ApiResponse<InterviewCourse> createCourse(@RequestBody InterviewCourse course) {
        InterviewCourse saved = courseRepository.save(course);
        return ApiResponse.success(saved, "Interview course created");
    }

    @PutMapping("/courses/{id}")
    public ApiResponse<InterviewCourse> updateCourse(@PathVariable Long id, @RequestBody InterviewCourse course) {
        InterviewCourse existing = courseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Course not found"));
        existing.setTitle(course.getTitle());
        existing.setDescription(course.getDescription());
        existing.setCategory(course.getCategory());
        existing.setDifficulty(course.getDifficulty());
        existing.setDuration(course.getDuration());
        existing.setLogoUrl(course.getLogoUrl());
        InterviewCourse updated = courseRepository.save(existing);
        return ApiResponse.success(updated, "Course updated");
    }

    @DeleteMapping("/courses/{id}")
    public ApiResponse<String> deleteCourse(@PathVariable Long id) {
        topicRepository.deleteByInterviewCourseId(id);
        courseRepository.deleteById(id);
        return ApiResponse.success("Deleted", "Course deleted");
    }

    @PostMapping("/courses/{id}/topics")
    public ApiResponse<InterviewTopic> addTopic(@PathVariable Long id, @RequestBody InterviewTopic topic) {
        InterviewCourse course = courseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Course not found"));
        topic.setInterviewCourseId(id);
        InterviewTopic saved = topicRepository.save(topic);
        return ApiResponse.success(saved, "Topic added");
    }

    @PutMapping("/topics/{topicId}")
    public ApiResponse<InterviewTopic> updateTopic(@PathVariable Long topicId, @RequestBody InterviewTopic topic) {
        InterviewTopic existing = topicRepository.findById(topicId)
            .orElseThrow(() -> new RuntimeException("Topic not found"));
        existing.setTitle(topic.getTitle());
        existing.setContent(topic.getContent());
        existing.setSection(topic.getSection());
        existing.setOrderIndex(topic.getOrderIndex());
        existing.setType(topic.getType());
        InterviewTopic updated = topicRepository.save(existing);
        return ApiResponse.success(updated, "Topic updated");
    }

    @DeleteMapping("/topics/{topicId}")
    public ApiResponse<String> deleteTopic(@PathVariable Long topicId) {
        topicRepository.deleteById(topicId);
        return ApiResponse.success("Deleted", "Topic deleted");
    }
}