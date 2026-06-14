package com.codenexus.interview;

import com.codenexus.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewCourseService {

    private final InterviewCourseRepository courseRepository;
    private final InterviewTopicRepository topicRepository;

    public List<InterviewCourse> getAllCourses() {
        return courseRepository.findAll();
    }

    public InterviewCourse getCourse(Long id) {
        InterviewCourse course = courseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Interview course not found"));
        // Load topics
        List<InterviewTopic> topics = topicRepository.findByInterviewCourseIdOrderByOrderIndexAsc(id);
        course.setTopics(topics);
        return course;
    }

    public List<InterviewCourse> getCoursesByCategory(String category) {
        return courseRepository.findByCategory(category);
    }

    @Transactional
    public InterviewCourse createCourse(InterviewCourse course) {
        return courseRepository.save(course);
    }

    @Transactional
    public InterviewCourse updateCourse(Long id, InterviewCourse updated) {
        InterviewCourse existing = courseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Interview course not found"));
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setCategory(updated.getCategory());
        existing.setDifficulty(updated.getDifficulty());
        existing.setDuration(updated.getDuration());
        existing.setLogoUrl(updated.getLogoUrl());
        existing.setActive(updated.isActive());
        return courseRepository.save(existing);
    }

    @Transactional
    public void deleteCourse(Long id) {
        // Delete topics first
        List<InterviewTopic> topics = topicRepository.findByInterviewCourseIdOrderByOrderIndexAsc(id);
        topicRepository.deleteAll(topics);
        courseRepository.deleteById(id);
    }

    // Topic management
    @Transactional
    public InterviewTopic addTopic(Long courseId, InterviewTopic topic) {
        InterviewCourse course = courseRepository.findById(courseId)
            .orElseThrow(() -> new RuntimeException("Interview course not found"));
        topic.setInterviewCourseId(courseId);
        if (topic.getType() == null) topic.setType("TEXT");
        return topicRepository.save(topic);
    }

    @Transactional
    public InterviewTopic updateTopic(Long topicId, InterviewTopic updated) {
        InterviewTopic existing = topicRepository.findById(topicId)
            .orElseThrow(() -> new RuntimeException("Topic not found"));
        existing.setTitle(updated.getTitle());
        existing.setContent(updated.getContent());
        existing.setSection(updated.getSection());
        existing.setOrderIndex(updated.getOrderIndex());
        return topicRepository.save(existing);
    }

    @Transactional
    public void deleteTopic(Long topicId) {
        topicRepository.deleteById(topicId);
    }
}