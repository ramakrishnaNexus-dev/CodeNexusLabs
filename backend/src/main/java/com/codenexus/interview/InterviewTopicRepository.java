package com.codenexus.interview;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InterviewTopicRepository extends JpaRepository<InterviewTopic, Long> {
    List<InterviewTopic> findByInterviewCourseIdOrderByOrderIndexAsc(Long interviewCourseId);
    void deleteByInterviewCourseId(Long interviewCourseId);
}