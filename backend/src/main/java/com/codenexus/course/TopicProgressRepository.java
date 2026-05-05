package com.codenexus.course;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TopicProgressRepository extends JpaRepository<TopicProgress, Long> {
    List<TopicProgress> findByUserEmailAndCourseId(String email, Long courseId);
    Optional<TopicProgress> findByUserEmailAndTopicId(String email, Long topicId);
    long countByUserEmailAndCourseIdAndCompleted(String email, Long courseId, boolean completed);
}